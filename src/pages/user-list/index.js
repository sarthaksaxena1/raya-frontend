import {
  Table,
  Button,
  Modal,
  Input,
  Space,
  Steps,
  Divider,
  Select,
} from "antd";
import { useEffect, useState, useRef } from "react";
import { TableScreenLayout } from "../../layouts/screens/table-screen";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminUserList,
  getAdminUserExportList,
  assignSlotToUser,
  setUserListRequstObj,
} from "../../appRedux/actions/UserList";
import {
  getPatientMedicalHistoryQuestions,
  getPatientMedicalHistory,
} from "../../appRedux/actions/MedicalHistory";
import { VaccinationSlotTable } from "../vaccination-slot-list/vaccination-slot-table";
import {
  getFilterParams,
  getSortOrderParams,
  setTableRowColor,
} from "../../helpers/utils";
import {
  roleConstants,
  vaccinationSlotConstants,
} from "../../appRedux/constants";
import { setSideBarMenuItem } from "../../appRedux/actions/Settings";
import { SearchOutlined } from "@ant-design/icons";
import { MedicalHistoryDetails } from "./medical-history-details";
import { CSVLink } from "react-csv";
import moment from "moment";
import { isEmpty, has } from "lodash";
import useWindowDimensions from "../../helpers/window-dimensions";
import { TimeSlotSelect } from "./time-slot-select";
import { ceirFormFeildsData } from "../../helpers/ceir-form-feilds-data";
import { SurveyDetails } from "./survey-details";
import {
  getPatientSurveyData,
  getPatientSurveyQuestions,
} from "../../appRedux/actions/SurveyForm";

const { Step } = Steps;
const allocationSteps = [
  {
    title: "Allocate Date Slot",
  },
  {
    title: "Allocate Time Slot",
  },
];
export const UserList = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const { preferredLocationData } = ceirFormFeildsData();
  const assignSlotsRef = useRef();
  const csvLink = useRef();
  const { height, width } = useWindowDimensions();
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [isAssignSlotModalVisible, setIsAssignSlotModalVisible] =
    useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [patientId, setPatientId] = useState("");
  const [slotAllocationDetails, setSlotAllocationDetails] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isMedicalHistoryModalVisible, setIsMedicalHistoryModalVisible] =
    useState(false);
  const [isSurveyModalVisible, setIsSurveyModalVisible] = useState(false);
  const isLoaded = useSelector((state) => state.userList.isLoaded);
  const userList = useSelector((state) => state.userList.userListData);
  const userListRequestObj = useSelector(
    (state) => state.userList.userListRequestObj
  );
  const dispatch = useDispatch();
  const [exportData, setExporData] = useState("");

  useEffect(() => {
    dispatch(setSideBarMenuItem("userdata-list"));
    return () => {
      dispatch(setUserListRequstObj({ page: 1, limit: 10 }));
    };
  }, []);

  useEffect(() => {
    dispatch(getAdminUserList(userListRequestObj));
  }, [userListRequestObj]);

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
        last_name: value.last_name,
        middle_name: value.middle_name ? value.middle_name : "NA",
        is_allocated: value.is_allocated ? "True" : "False",
        is_allocated_dose2: value.is_allocated_dose2 ? "True" : "False",
        is_verified: value.ceir_details.is_verified ? "Yes" : "No",
        region: value.ceir_details.region ? value.ceir_details.region : "-",
        province: value.ceir_details.province
          ? value.ceir_details.province
          : "-",
        city: value.ceir_details.city ? value.ceir_details.city : "-",
        barangay: value.ceir_details.barangay
          ? value.ceir_details.barangay
          : "-",
        preferred_location: value.preferred_location,
        has_patient_survey: value.has_patient_survey,
        has_patient_survey_dose2: value.has_patient_survey_dose2,
        has_medical_history: value.has_medical_history,
        has_medical_history_dose2: value.has_medical_history_dose2,
        is_medical_history_verified: value.is_medical_history_verified,
        is_medical_history_verified_dose2:
          value.is_medical_history_verified_dose2,
        is_vaccination_card_created: value.is_vaccination_card_created,
        is_consent_signed: value.is_consent_signed,
        is_reschedule: value.is_reschedule,
        vaccination_date: value.vaccinaion_date_slot,
        vaccination_date_dose2: value.vaccinaion_date_slot_dose2,
        time_slot: value.booked_time_slot,
        time_slot_dose2: value.booked_time_slot_dose2,

        date_joined: value.date_joined,
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
      paginationData["filter"] = getFilterParams(filters);
    dispatch(setUserListRequstObj(paginationData));
  };

  const onSelectChange = (selectedRowKeys) => {
    setselectedRowKeys(selectedRowKeys);
  };

  const showAssignSlotModal = () => {
    setIsAssignSlotModalVisible(true);
  };

  const handleAssignSubmit = () => {
    assignSlotsRef.current.submitModal();
    setselectedRowKeys([]);
    setIsAssignSlotModalVisible(false);
  };

  const assignDateSlotToUser = (id) => {
    const postData = {
      vaccination_slot_date: id[0],
      assigned_patient_ids: selectedRowKeys,
    };

    setSlotAllocationDetails(postData);
    setCurrentStep(currentStep + 1);
  };

  const assignTimeSlotToUser = (type, id) => {
    if (type === "skip") {
      dispatch(
        assignSlotToUser(slotAllocationDetails, () => {
          dispatch(
            getAdminUserList(userListRequestObj, () => {
              setCurrentStep(0);
              setIsAssignSlotModalVisible(false);
              setselectedRowKeys([]);
            })
          );
        })
      );
    } else {
      dispatch(
        assignSlotToUser(
          { ...slotAllocationDetails, vaccination_slot_time: id },
          () => {
            dispatch(
              getAdminUserList(userListRequestObj, () => {
                setCurrentStep(0);
                setIsAssignSlotModalVisible(false);
                setselectedRowKeys([]);
              })
            );
          }
        )
      );
    }
  };

  const downloadPaientData = () => {
    dispatch(
      getAdminUserExportList((exportData) => {
        const csvReport = {
          data: exportData.data.data,
          headers: exportData.data.header,
          filename: "registered_users.csv",
        };
        setExporData(csvReport);
        csvLink.current.link.click();
      })
    );
  };

  const handleAssignModalClose = () => {
    setCurrentStep(0);
    setIsAssignSlotModalVisible(false);
    setselectedRowKeys([]);
    dispatch({
      type: vaccinationSlotConstants.GET_VACCINATION_TIME_SLOT_LIST_SUCCESS,
      data: {},
    });
  };

  const showMedicalHistoryModal = (item, dose_number) => {
    setPatientId(item.id);
    dispatch(
      getPatientMedicalHistoryQuestions(
        dose_number,
        { page: 1, limit: 50 },
        () => {
          dispatch(
            getPatientMedicalHistory(dose_number, item.id, () => {
              setIsMedicalHistoryModalVisible(true);
            })
          );
        }
      )
    );
  };

  const handleMedicalModalClose = () => {
    setIsMedicalHistoryModalVisible(false);
  };

  const showSurveyModal = (item, dose_number) => {
    setPatientId(item.id);
    dispatch(
      getPatientSurveyQuestions(dose_number, { page: 1, limit: 50 }, () => {
        dispatch(
          getPatientSurveyData(dose_number, item.id, () => {
            setIsSurveyModalVisible(true);
          })
        );
      })
    );
  };

  const handleSurveyModalClose = () => {
    setIsSurveyModalVisible(false);
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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    // getCheckboxProps: (record) => ({
    //   disabled: record.is_allocated === "True",
    // }),
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
      title: "Registered On",
      dataIndex: "date_joined",
      key: "date_joined",
      width: 150,
      sorter: true,
      render: (date) => <span>{moment(date).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      width: 150,
      ...getColumnSearchProps("first_name"),
      sorter: true,
    },
    {
      title: "Middle Name",
      dataIndex: "middle_name",
      key: "middle_name",
      width: 150,
      ...getColumnSearchProps("middle_name"),
      sorter: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      width: 150,
      ...getColumnSearchProps("last_name"),
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Contact",
      dataIndex: "mobile",
      key: "mobile",
      width: 150,
      ...getColumnSearchProps("mobile"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 100,
    },
    {
      title: "Is CEIR verified?",
      dataIndex: "is_verified",
      key: "is_verified",
      width: 150,
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: 150,
      ...getColumnSearchProps("region"),
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
      width: 150,
      ...getColumnSearchProps("province"),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 150,
      ...getColumnSearchProps("city"),
    },
    {
      title: "Barangay",
      dataIndex: "barangay",
      key: "barangay",
      width: 150,
      ...getColumnSearchProps("barangay"),
    },
    {
      title: "Preferred Location",
      dataIndex: "preferred_location",
      key: "preferred_location",
      width: 150,
      ...getColumnSearchProps("preferred_location"),
    },
    {
      title: "Medical History Dose 1",
      key: "operation",
      width: 100,
      align: "center",
      render: (item) =>
        user.user_type === roleConstants.ADMIN_ROLE ? (
          item.has_medical_history ? (
            <Button
              type="link"
              onClick={() => showMedicalHistoryModal(item, 1)}
            >
              View
            </Button>
          ) : (
            <span>No</span>
          )
        ) : item.is_medical_history_verified ? (
          <Button type="link" onClick={() => showMedicalHistoryModal(item, 1)}>
            View
          </Button>
        ) : (
          <Button type="link" onClick={() => showMedicalHistoryModal(item, 1)}>
            Verify
          </Button>
        ),
    },

    {
      title: "Slot Allocated Dose 1",
      dataIndex: "is_allocated",
      key: "is_allocated",
      render: (is_allocated) => (
        <span>{is_allocated === "True" ? "Yes" : "No"}</span>
      ),
      width: 100,
    },

    {
      title: "Vaccination Date Dose 1",
      dataIndex: "vaccination_date",
      key: "vaccination_date",
      render: (vaccination_date) => (
        <span>
          {!!vaccination_date
            ? moment(vaccination_date.slot_date, "YYYY-MM-DD").format(
                "Do MMMM, YYYY"
              )
            : "-"}
        </span>
      ),
      width: 175,
    },

    {
      title: "Vaccination Time Dose 1",
      dataIndex: "time_slot",
      key: "time_slot",
      render: (time_slot) => (
        <span>
          {!!time_slot && !isEmpty(time_slot)
            ? moment(time_slot.from_time, "hh:mm:ss").format("hh:mm A") +
              " - " +
              moment(time_slot.to_time, "hh:mm:ss").format("hh:mm A")
            : "-"}
        </span>
      ),
      width: 200,
    },
    {
      title: "Survey Dose 1",
      key: "operation",
      width: 100,
      align: "center",
      render: (item) =>
        user.user_type === roleConstants.ADMIN_ROLE ? (
          item.has_patient_survey ? (
            <Button type="link" onClick={() => showSurveyModal(item, 1)}>
              View
            </Button>
          ) : (
            <span>No</span>
          )
        ) : null,
    },
    {
      title: "Medical History Dose 2",
      key: "operation",
      width: 100,
      align: "center",
      render: (item) =>
        user.user_type === roleConstants.ADMIN_ROLE ? (
          item.has_medical_history_dose2 ? (
            <Button
              type="link"
              onClick={() => showMedicalHistoryModal(item, 2)}
            >
              View
            </Button>
          ) : (
            <span>No</span>
          )
        ) : item.is_medical_history_verified_dose2 ? (
          <Button type="link" onClick={() => showMedicalHistoryModal(item, 2)}>
            View
          </Button>
        ) : (
          <Button type="link" onClick={() => showMedicalHistoryModal(item, 2)}>
            Verify
          </Button>
        ),
    },
    {
      title: "Slot Allocated Dose 2",
      dataIndex: "is_allocated_dose2",
      key: "is_allocated_dose2",
      render: (is_allocated_dose2) => (
        <span>{is_allocated_dose2 === "True" ? "Yes" : "No"}</span>
      ),
      width: 100,
    },
    {
      title: "Vaccination Date Dose 2",
      dataIndex: "vaccination_date_dose2",
      key: "vaccination_date_dose2",
      render: (vaccination_date_dose2) => (
        <span>
          {!!vaccination_date_dose2
            ? moment(vaccination_date_dose2.slot_date, "YYYY-MM-DD").format(
                "Do MMMM, YYYY"
              )
            : "-"}
        </span>
      ),
      width: 175,
    },
    {
      title: "Vaccination Time Dose 2",
      dataIndex: "time_slot_dose2",
      key: "time_slot_dose2",
      render: (time_slot_dose2) => (
        <span>
          {!!time_slot_dose2 && !isEmpty(time_slot_dose2)
            ? moment(time_slot_dose2.from_time, "hh:mm:ss").format("hh:mm A") +
              " - " +
              moment(time_slot_dose2.to_time, "hh:mm:ss").format("hh:mm A")
            : "-"}
        </span>
      ),
      width: 200,
    },
    {
      title: "Survey Dose 2",
      key: "operation",
      width: 100,
      align: "center",
      render: (item) =>
        user.user_type === roleConstants.ADMIN_ROLE ? (
          item.has_patient_survey_dose2 ? (
            <Button type="link" onClick={() => showSurveyModal(item, 2)}>
              View
            </Button>
          ) : (
            <span>No</span>
          )
        ) : null,
    },
    {
      title: "Is Patient deferred?",
      dataIndex: "is_reschedule",
      key: "is_reschedule",
      render: (value) => (value ? "Yes" : "No"),
      width: 150,
    },
  ];

  const handleFilterFields = (key, value) => {
    let tempUserListRequestObj = { ...userListRequestObj };
    let tempFilters = userListRequestObj.filter
      ? { ...userListRequestObj.filter }
      : {};
    if (!value && has(tempFilters, key)) {
      delete tempFilters[key];
    }
    if (!!value) {
      tempFilters[key] = value;
    }
    tempUserListRequestObj["filter"] = tempFilters;
    dispatch(setUserListRequstObj(tempUserListRequestObj));
  };

  return (
    <div>
      <h2 className="mb-4">Registered Users</h2>
      <div className="flex items-center justify-between pl-2">
        <div>
          <div className="flex items-center">
            <span className="mr-4">Filter by: </span>
            <div className="flex flex-col">
              <Select
                placeholder="Preferred Location"
                className="w-48"
                allowClear
                showSearch
                onChange={(value) =>
                  handleFilterFields("preferred_location", value)
                }
              >
                {preferredLocationData.map((value) => (
                  <Select.Option key={value.key}>{value.value}</Select.Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col pl-4">
              <Select
                placeholder="Dose Number"
                className="w-48"
                allowClear
                showSearch
                onChange={(value) => handleFilterFields("dose_no", value)}
              >
                <Select.Option key="1">Dose 1</Select.Option>
                <Select.Option key="2">Dose 2</Select.Option>
              </Select>
            </div>
          </div>
        </div>
        {user.user_type === roleConstants.ADMIN_ROLE ? (
          <div>
            <Button
              type="primary"
              onClick={showAssignSlotModal}
              disabled={selectedRowKeys.length <= 0}
            >
              Assign Slots
            </Button>
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
        ) : null}
      </div>

      <TableScreenLayout>
        <Table
          rowSelection={
            user.user_type === roleConstants.ADMIN_ROLE ? rowSelection : null
          }
          size="small"
          scroll={{ x: 550, y: height - 300 }}
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
      </TableScreenLayout>

      {isMedicalHistoryModalVisible ? (
        <Modal
          title="Patient Medical History"
          visible={isMedicalHistoryModalVisible}
          onCancel={handleMedicalModalClose}
          cancelText="Close"
          footer={null}
          width={width - 100}
          style={{ top: 50 }}
        >
          <MedicalHistoryDetails
            handleMedicalModalClose={handleMedicalModalClose}
            patientId={patientId}
          />
        </Modal>
      ) : null}

      {isSurveyModalVisible ? (
        <Modal
          title="Patient Survey"
          visible={isSurveyModalVisible}
          onCancel={handleSurveyModalClose}
          cancelText="Close"
          footer={null}
          width={width - 100}
          style={{ top: 50 }}
        >
          <SurveyDetails
            handleSurveyModalClose={handleSurveyModalClose}
            patientId={patientId}
          />
        </Modal>
      ) : null}

      {isAssignSlotModalVisible ? (
        <Modal
          title="Assign Slot"
          visible={isAssignSlotModalVisible}
          onOk={handleAssignSubmit}
          onCancel={handleAssignModalClose}
          className="w-10/12"
          style={{ top: 20 }}
          footer={null}
        >
          <div className="w-7/12 mx-auto mb-8">
            <Steps current={currentStep}>
              {allocationSteps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
          {currentStep === 0 ? (
            <VaccinationSlotTable
              assignSlotModal={true}
              ref={assignSlotsRef}
              getSlotData={assignDateSlotToUser}
              closeModal={handleAssignModalClose}
              selectDateSlot={assignDateSlotToUser}
            />
          ) : null}

          {currentStep === 1 ? (
            <TimeSlotSelect
              {...slotAllocationDetails}
              closeModal={handleAssignModalClose}
              assignTimeSlotToUser={assignTimeSlotToUser}
            />
          ) : null}
        </Modal>
      ) : null}
    </div>
  );
};
