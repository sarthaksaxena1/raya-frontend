import { Table, Input, Space, Button } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetPatientVaccinatinStatus,
  getAdminUserList,
  setPatientVaccinationStatusId,
  setUserListRequstObj,
} from "../../appRedux/actions/UserList";
import { userListConstants } from "../../appRedux/constants";
import {
  getFilterParams,
  getSortOrderParams,
  setTableRowColor,
} from "../../helpers/utils";
import { SearchOutlined } from "@ant-design/icons";
import { find } from "lodash";
import useWindowDimensions from "../../helpers/window-dimensions";
import moment from "moment";

export const StaffUserListTable = () => {
  const { height } = useWindowDimensions();
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const isLoaded = useSelector((state) => state.userList.isLoaded);
  const userList = useSelector((state) => state.userList.userListData);
  const userListRequestObj = useSelector(
    (state) => state.userList.userListRequestObj
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAdminUserList(userListRequestObj, () => {
        setselectedRowKeys([]);
      })
    );
  }, [userListRequestObj]);

  useEffect(() => {
    dispatch(
      setPatientVaccinationStatusId(
        !!selectedRowKeys[0] ? selectedRowKeys[0] : null
      )
    );
    if (
      !!selectedRowKeys[0] &&
      !find(data, { key: selectedRowKeys[0] }).is_reschedule
    ) {
      dispatch(adminGetPatientVaccinatinStatus(selectedRowKeys[0]));
    } else {
      dispatch({
        type: userListConstants.GET_PATIENT_VACCINATION_STATUS_SUCCESS,
        data: {},
      });
    }
  }, [selectedRowKeys]);

  useEffect(() => {
    if (!!userList.data) {
      let finalUserListData = userList.data.map((value) => ({
        id: value.id,
        key: value.id,
        email: value.email,
        mobile: value.mobile,
        gender: value.gender,
        user_type: value.user_type,
        first_name: value.first_name,
        middle_name: value.middle_name ? value.middle_name : "NA",
        last_name: value.last_name,
        suffix: value.ceir_details && value.ceir_details.suffix && value.ceir_details.suffix != 'undefined' ? value.ceir_details.suffix : "-",
        is_reschedule: value.is_reschedule,
        vaccination_slot_date: value.vaccinaion_date_slot && value.vaccinaion_date_slot.slot_date
          ? value.vaccinaion_date_slot.slot_date
          : "",
        vaccination_location:
          value.vaccinaion_date_slot &&
          value.vaccinaion_date_slot.vaccination_location
            ? value.vaccinaion_date_slot.vaccination_location.name
            : "-",
        vaccination_slot_date_dose2: value.vaccinaion_date_slot_dose2 && value.vaccinaion_date_slot_dose2.slot_date
          ? value.vaccinaion_date_slot_dose2.slot_date
          : "",
        vaccination_location_dose2:
          value.vaccinaion_date_slot_dose2 &&
          value.vaccinaion_date_slot_dose2.vaccination_location
            ? value.vaccinaion_date_slot_dose2.vaccination_location.name
            : "-",
      }));
      setData(finalUserListData);
      setTotal(userList.total);
    } else {
      setData([]);
    }
  }, [isLoaded]);

  const handleTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    let paginationData = {
      page: current,
      limit: pageSize,
    };
    if (!!getSortOrderParams(sorter.order, sorter.field))
      paginationData["order"] = getSortOrderParams(sorter.order, sorter.field);
    if (!!getFilterParams(filters))
      paginationData["filter"] = getFilterParams(
        filters,
        userListRequestObj.filter ? userListRequestObj.filter : {}
      );
    dispatch(setUserListRequstObj(paginationData));
  };

  const onSelectChange = (selectedRowKeys) => {
    setselectedRowKeys(selectedRowKeys);
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

  const columns = [
    {
      title: "User Id",
      dataIndex: "id",
      key: "id",
      width: 75,
      sorter: true,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      width: 100,
      ...getColumnSearchProps("first_name"),
      sorter: true,
    },
    {
      title: "Middle Name",
      dataIndex: "middle_name",
      key: "middle_name",
      width: 100,
      ...getColumnSearchProps("middle_name"),
      sorter: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      width: 100,
      ...getColumnSearchProps("last_name"),
      sorter: true,
    },
    {
      title: "Suffix",
      dataIndex: "suffix",
      key: "suffix",
      width: 100,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Contact",
      dataIndex: "mobile",
      key: "mobile",
      width: 100,
      ...getColumnSearchProps("mobile"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 100,
    },
    {
      title: "Vaccination Date - Dose 1",
      dataIndex: "vaccination_slot_date",
      key: "vaccination_slot_date",
      render: (value) => value ? (moment(value, "YYYY-MM-DD").format("DD MMMM, YYYY")) : '-',
      width: 175,
    },
    {
      title: "Vaccination Location - Dose 1",
      dataIndex: "vaccination_location",
      key: "vaccination_location",
      width: 150,
    },
    {
      title: "Vaccination Date - Dose 2",
      dataIndex: "vaccination_slot_date_dose2",
      key: "vaccination_slot_date_dose2",
      render: (value) => value ? (moment(value, "YYYY-MM-DD").format("DD MMMM, YYYY")) : '-',
      width: 175,
    },
    {
      title: "Vaccination Location - Dose 2",
      dataIndex: "vaccination_location_dose2",
      key: "vaccination_location_dose2",
      width: 150,
    },
    {
      title: "Is Patient Deferred?",
      dataIndex: "is_reschedule",
      key: "is_reschedule",
      render: (value) => (value ? "Yes" : "No"),
      width: 100,
    },
  ];

  return (
    <Table
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
        type: "radio",
      }}
      size="small"
      scroll={{ y: height - 300 }}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: userListRequestObj.limit,
        current: userListRequestObj.page,
        total,
      }}
      onChange={handleTableChange}
      rowClassName={setTableRowColor}
    />
  );
};
