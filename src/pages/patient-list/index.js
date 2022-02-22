import { Table, Button, Modal, Input, Space, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { TableScreenLayout } from "../../layouts/screens/table-screen";
import {
  getAdminPatientList,
  getAdminPatientExportList,
  adminDeletePatient,
  adminVerifyAllPatient,
  adminVerifyVaccine,
  setPatientListRequstObj,
} from "../../appRedux/actions/PatientList";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getFilterParams,
  getSortOrderParams,
  setTableRowColor,
} from "../../helpers/utils";
import { setSideBarMenuItem } from "../../appRedux/actions/Settings";
import { SearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import useWindowDimensions from "../../helpers/window-dimensions";

export const PatientList = (props) => {
  const { confirm } = Modal;
  const { height } = useWindowDimensions();

  const history = useHistory();
  const csvLink = useRef();

  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const isLoaded = useSelector((state) => state.patientLists.isLoaded);
  const patientList = useSelector((state) => state.patientLists.patientList);
  const patientListRequestObj = useSelector(
    (state) => state.patientLists.patientListRequestObj
  );
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [exportData, setExporData] = useState("");

  useEffect(() => {
    dispatch(setSideBarMenuItem("patient-list"));
  }, []);

  useEffect(() => {
    dispatch(getAdminPatientList(patientListRequestObj));
  }, [patientListRequestObj]);

  useEffect(() => {
    if (patientList.hasOwnProperty("data")) {
      let patientData = patientList.data.map((value) => ({
        ...value,
        key: value.id,
      }));
      setData(patientData);
      setTotal(patientList.total);
    } else {
      setData([]);
    }
  }, [isLoaded]);

  const navigateToUploadPatient = () => {
    history.push("/admin/upload-patient");
  };

  const onSelectChange = (selectedRowKeys) => {
    setselectedRowKeys(selectedRowKeys);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    let paginationData = {
      page: current,
      limit: pageSize,
    };

    if (!!getSortOrderParams(sorter.order, sorter.field))
      paginationData["order"] = getSortOrderParams(sorter.order, sorter.field);
    if (!!getFilterParams(filters))
      paginationData["filter"] = getFilterParams(filters);

    dispatch(setPatientListRequstObj(paginationData));
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText(null);
  };

  const updatePatient = (patient, data) => {
    let msg = "";

    if (data.hasOwnProperty("is_verified") && data["is_verified"] === true) {
      msg = "verified";
    }
    if (data.hasOwnProperty("is_rejected") && data["is_rejected"] === true) {
      msg = "rejected";
    }

    confirm({
      title: "Do you want to mark " + patient.firstname + " as " + msg + "?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(
          adminVerifyVaccine(patient.id, data, msg, () => {
            dispatch(getAdminPatientList(patientListRequestObj));
          })
        );
      },
    });
  };

  const showConfirmDelete = () => {
    if (selectedRowKeys.length > 0) {
      let requestData = { ceir_ids: selectedRowKeys };

      confirm({
        title: "Are you sure you want to delete selected patient(s)?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          dispatch(
            adminDeletePatient(requestData, () => {
              setselectedRowKeys([]);
              dispatch(getAdminPatientList(patientListRequestObj));
            })
          );
        },
      });
    }
  };


  const showConfirmVerify = () => {
    if (selectedRowKeys.length > 0) {

      let patient_ids = [];
      let patientData = {};

      for( let ceir_id in selectedRowKeys) {
        
        patientData = data.filter((value) => {
          return value.id === selectedRowKeys[ceir_id]
        });

        if(patientData.length > 0) {
          patient_ids.push(patientData[0].patient);
        }

      }

      let requestData = { patient_ids: patient_ids, action: 'verify' };

      confirm({
        title: "Are you sure you want to verify selected patient(s)?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          dispatch(
            adminVerifyAllPatient(requestData, () => {
              setselectedRowKeys([]);
              dispatch(getAdminPatientList(patientListRequestObj));
            })
          );
        },
      });
    }
  };

  const downloadPaientData = () => {
    dispatch(
      getAdminPatientExportList((exportData) => {
        const csvReport = {
          data: exportData.data.data,
          headers: exportData.data.headers,
          filename: "patient_list.csv",
        };

        setExporData(csvReport);

        csvLink.current.link.click();
      })
    );
  };

  const columns = [
    // {
    //   title: "Patient Id",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 100,
    //   sorter: true,
    // },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      width: 200,
      ...getColumnSearchProps("firstname"),
      sorter: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      width: 200,
      sorter: true,
      ...getColumnSearchProps("lastname"),
    },
    {
      title: "Suffix",
      dataIndex: "suffix",
      key: "suffix",
      width: 100,
      render: (suffix) => (
        <span>{!suffix || suffix === "undefined" ? "" : suffix}</span>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority_group",
      key: "priority_group",
      width: 250,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Contact No",
      dataIndex: "contact_no",
      key: "contact_no",
      width: 100,
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: 100,
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
      width: 100,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 100,
    },
    {
      title: "Barangay",
      dataIndex: "barangay",
      key: "barangay",
      width: 100,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 100,
    },
    {
      title: "Date of birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      width: 100,
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
      width: 100,
    },
    {
      title: "Has Allergy",
      dataIndex: "has_allergy",
      key: "has_allergy",
      render: (value) => <span>{value ? "Yes" : "No"}</span>,
      width: 100,
    },
    {
      title: "Has Comorbidity",
      dataIndex: "has_commorbidity",
      key: "has_commorbidity",
      render: (value) => <span>{value ? "Yes" : "No"}</span>,
      width: 150,
    },
    {
      title: "Comorbidity Proof",
      dataIndex: "commorbidity_doc",
      key: "commorbidity_doc",
      width: 150,
      render: (value) =>
        value ? (
          <a
            className="text-base text-blue-500 pl-4"
            href={value}
            target="_blank"
            rel="noreferrer"
          >
            Download
          </a>
        ) : (
          ""
        ),
    },
    {
      title: "Action",
      dataIndex: "",
      align: "center",
      key: "x",
      width: 200,
      render: (patient) =>
        patient.is_verified ? (
          <Tag color="#87d068">verified</Tag>
        ) : patient.is_rejected ? (
          <Tag color="#f50">rejected</Tag>
        ) : (
          <div>
            <Button
              type="link"
              onClick={() => updatePatient(patient, { is_verified: true })}
            >
              Verify
            </Button>
            <Button
              type="link"
              onClick={() =>
                updatePatient(patient, {
                  is_rejected: true,
                  is_submitted: false,
                })
              }
            >
              Reject
            </Button>
          </div>
        ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between pl-2">
        <h2>Patient List</h2>
        <div>
          <Button type="primary" onClick={navigateToUploadPatient}>
            Upload Patient
          </Button>
          {selectedRowKeys.length > 0 ? (
            <Button type="primary" className="ml-2" onClick={showConfirmDelete}>
              Delete
            </Button>
          ) : (
            <Button
              type="primary"
              className="ml-2"
              onClick={showConfirmDelete}
              disabled={true}
            >
              Delete
            </Button>
          )}
          {selectedRowKeys.length > 0 ? (
            <Button type="primary" className="ml-2" onClick={showConfirmVerify}>
              Verify
            </Button>
          ) : (
            <Button
              type="primary"
              className="ml-2"
              onClick={showConfirmVerify}
              disabled={true}
            >
              Verify
            </Button>
          )}
          {data.length > 0 && (
            <Button
              type="primary"
              className="ml-2"
              onClick={downloadPaientData}
            >
              Download
            </Button>
          )}
          
          {exportData && (
            <CSVLink
              className="hidden"
              ref={csvLink}
              target="_blank"
              {...exportData}
            >
              Export Data
            </CSVLink>
          )}
        </div>
      </div>
      <TableScreenLayout>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          size="small"
          scroll={{ y: height - 275 }}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: patientListRequestObj.limit,
            current: patientListRequestObj.page,
            total,
          }}
          onChange={handleTableChange}
          rowClassName={setTableRowColor}
        />
      </TableScreenLayout>
    </div>
  );
};
