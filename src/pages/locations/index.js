import { Table, Button, Modal, Input, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { UiConfig } from "../../appRedux/constants";
import { TableScreenLayout } from "../../layouts/screens/table-screen";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminVaccineLocationList,
  getAdminVaccineLocationExportList,
  adminDeleteLocation,
  adminEditLocation,
  resetLocation,
} from "../../appRedux/actions/VaccineLocation";
import { useHistory } from "react-router-dom";
import {
  getFilterParams,
  getSortOrderParams,
  setTableRowColor,
} from "../../helpers/utils";
import { setSideBarMenuItem } from "../../appRedux/actions/Settings";
import { SearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";

export const LocationList = (props) => {
  const { confirm } = Modal;
  const csvLink = useRef()

  const [requestObj, setRequestObj] = useState({
    page_number: 1,
    page_size: 10,
  });
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [exportData, setExporData] = useState("");

  const { isLoaded, vaccineLocationList } = useSelector(
    ({ vaccineLocations }) => vaccineLocations
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSideBarMenuItem("locations"));
  }, []);

  useEffect(() => {
    let paginationData = {
      page: requestObj.page_number,
      limit: requestObj.page_size,
    };
    if (!!requestObj.order) paginationData["order"] = requestObj.order;
    if (!!requestObj.filter) paginationData["filter"] = requestObj.filter;
    dispatch(getAdminVaccineLocationList(paginationData));
  }, [requestObj]);

  useEffect(() => {
    if (!!vaccineLocationList.data) {
      let finalLocationData = vaccineLocationList.data.map((value) => ({
        id: value.id,
        name: value.name,
        address: value.address,
        city: value.city,
        postal_code: value.postal_code,
        cbcr: value.cbcr,
        status: value.status === 1 ? "Active" : "Inactive",
      }));
      setData(finalLocationData);
      setTotal(vaccineLocationList.total);
    } else {
      setData([]);
    }
  }, [isLoaded]);

  const navigateToAddLocation = () => {
    history.push("/admin/add-location");
  };

  const navigateToEditLocation = (item) => {
    history.push("/admin/edit-location/" + item.id);
  };

  const showConfirmDelete = (item) => {
    confirm({
      title: "Do you want to delete " + item.name + "?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(
          adminDeleteLocation(item.id, () => {
            dispatch(getAdminVaccineLocationList({}));
          })
        );
      },
    });
  };

  const showConfirmVerify = (item) => {
    confirm({
      title: "Do you want to activate this " + item.name + "?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(
          adminEditLocation(item.id, { status: 1 }, () => {
            dispatch(resetLocation());
            dispatch(getAdminVaccineLocationList({}));
          })
        );
      },
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    setRequestObj({
      page_size: pageSize,
      page_number: current,
      order: getSortOrderParams(sorter.order, sorter.field),
      filter: getFilterParams(filters),
    });
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

  const downloadLocationData = () => {
    dispatch(
      getAdminVaccineLocationExportList((exportData) => {
    
        const csvReport = {
          data: exportData.data.data,
          headers: exportData.data.headers,
          filename: "vaccination_location_list.csv",
        };

        setExporData(csvReport);

        csvLink.current.link.click()
        

      })
    );
  };

  const columns = [
    {
      title: "CBCR Code",
      dataIndex: "cbcr",
      key: "cbcr",
      width: 100,
      sorter: true,
      ...getColumnSearchProps("cbcr"),
    },
    {
      title: "Site Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Postal Code",
      dataIndex: "postal_code",
      key: "postal_code",
      width: 100,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 70,
    },

    {
      title: "Action",
      key: "operation",
      width: 100,
      align: "center",
      render: (item) => (
        <div>
          <Button
            type="link"
            onClick={() => navigateToEditLocation(item)}
            id={"edit-location" + item.key}
          >
            Edit
          </Button>
          {item.status === "Active" ? (
            <Button type="link" onClick={() => showConfirmDelete(item)}>
              Delete
            </Button>
          ) : (
            <Button type="link" onClick={() => showConfirmVerify(item)}>
              Activate
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between pl-2">
        <h2>Locations</h2>
        <div>
          <Button type="primary" onClick={navigateToAddLocation}>
            Add Location
          </Button>
          { data.length > 0 && <Button
            type="primary"
            className="ml-2"
            onClick={downloadLocationData}
          >
            Download
          </Button>}
          { exportData && <CSVLink className="hidden" ref={csvLink} target='_blank' {...exportData}>Export Data</CSVLink>}
        </div>
      </div>
      <TableScreenLayout>
        <Table
          size="small"
          scroll={{ y: UiConfig.tableLength }}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: requestObj.page_size,
            current: requestObj.page_number,
            total,
          }}
          onChange={handleTableChange}
          rowClassName={setTableRowColor}
        />
      </TableScreenLayout>
    </div>
  );
};
