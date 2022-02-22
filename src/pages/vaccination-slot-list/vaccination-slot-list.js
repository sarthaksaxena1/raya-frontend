import { useState, useEffect, useRef } from "react";
import { Card, Tooltip, Row, Col, Empty, Modal } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { EditVaccinationSlotForm } from "../../components/forms/edit-vaccination-slot-form";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminVaccinationSlot,
  deleteAdminVaccinationTimeSlot,
  getAdminVaccinationSlot,
  getAdminVaccinationSlotList,
  getAdminVaccinationTimeSlotList,
} from "../../appRedux/actions/VaccinationSlot";
import { isEmpty } from "lodash";
import { vaccinationSlotConstants } from "../../appRedux/constants";
import { AddVaccinationTimeSlotForm } from "../../components/forms/add-vaccination-time-slot-form";

const TimeSlotTile = ({
  from_time,
  to_time,
  max_allowed_patients,
  available_slots,
  id,
  deleteVaccinationTimeSlot,
  selectedDateSlotId,
  dateSlotPaginationData,
  setVaccinationTimeSlotDetails,
  patientIds,
}) => {
  const editVaccinationTimeSlotFormRef = useRef();
  const [
    showEditVaccinationTimeSlotModal,
    setShowEditVaccinationTimeSlotModal,
  ] = useState(false);

  const setVaccinationDetails = () => {
    setVaccinationTimeSlotDetails();
  };

  const showTimeSlotDeleteConfirm = (id) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: "Do you want to delete this timeslot ?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk() {
        deleteVaccinationTimeSlot(id);
      },
    });
  };

  const handleEditVaccinationTimeSlots = () => {
    editVaccinationTimeSlotFormRef.current.submitForm();
  };

  return (
    <>
      <Card
        type="inner"
        className="rounded-xl mb-4 raya-list-card time-slot-card"
      >
        <Row>
          <Col xs={24}>
            <div className="flex justify-end mb-4">
              <Tooltip title="Edit Time Slot" className="mr-4">
                <EditOutlined
                  className="text-base"
                  onClick={() => setShowEditVaccinationTimeSlotModal(true)}
                />
              </Tooltip>
              <Tooltip title="Delete Time slot">
                {!patientIds ? (
                  <DeleteOutlined
                    onClick={() => showTimeSlotDeleteConfirm(id)}
                    className="text-base"
                  />
                ) : null}
              </Tooltip>
            </div>
          </Col>
          <Col xs={12} className="mb-2">
            <h6 className="text-xs font-medium text-gray-500 mb-0">
              From Time
            </h6>
            <p className="text-base font-medium mb-0">
              {moment(from_time, "HH:mm:ss").format("h:mm a")}
            </p>
          </Col>
          <Col xs={12} className="mb-2">
            <h6 className="text-xs font-medium text-gray-500 mb-0">To Time</h6>
            <p className="text-base font-medium mb-0">
              {moment(to_time, "HH:mm:ss").format("h:mm a")}
            </p>
          </Col>
          <Col xs={12} className="mb-2">
            <h6 className="text-xs font-medium text-gray-500 mb-0">
              Slot Capacity
            </h6>
            <p className="text-base font-medium mb-0">{max_allowed_patients}</p>
          </Col>
          <Col xs={12} className="mb-2">
            <h6 className="text-xs font-medium text-gray-500 mb-0">
              Available Slots
            </h6>
            <p className="text-base font-medium mb-0">{available_slots}</p>
          </Col>
        </Row>
      </Card>

      {showEditVaccinationTimeSlotModal ? (
        <Modal
          title="Edit Vaccination Time Slot"
          visible={showEditVaccinationTimeSlotModal}
          onOk={handleEditVaccinationTimeSlots}
          onCancel={() => {
            setShowEditVaccinationTimeSlotModal(false);
          }}
        >
          <AddVaccinationTimeSlotForm
            isEditVaccinationForm={true}
            vaccinationDateSlotId={selectedDateSlotId}
            setVaccinationTimeSlotDetails={setVaccinationDetails}
            closeForm={() => {
              setShowEditVaccinationTimeSlotModal(false);
            }}
            dateSlotPaginationData={dateSlotPaginationData}
            ref={editVaccinationTimeSlotFormRef}
            timeSlotDetails={{
              from_time,
              to_time,
              max_allowed_patients,
              id,
              patientIds,
            }}
          />
        </Modal>
      ) : null}
    </>
  );
};

export const VaccinationSlotDetailsList = ({ dateSlotPaginationData }) => {
  useEffect(() => {}, []);
  const editVaccinationSlotFormRef = useRef();
  const addVaccinationTimeSlotFormRef = useRef();
  const dispatch = useDispatch();
  const {
    selectedDateSlotId,
    vaccinationSlotDetails,
    vaccinationSlotTimeList,
  } = useSelector(({ vaccinationSlots }) => vaccinationSlots);
  const [showEditVaccinationModal, setShowEditVaccinationModal] =
    useState(false);
  const [showAddVaccinationTimeSlotModal, setShowAddVaccinationTimeSlotModal] =
    useState(false);

  useEffect(() => {
    if (!!selectedDateSlotId) {
      setVaccinationTimeSlotDetails();
    } else {
      dispatch({
        type: vaccinationSlotConstants.GET_VACCINATION_SLOT_SUCCESS,
        data: {},
      });
    }
  }, [selectedDateSlotId]);

  const handleEditVaccination = () => {
    editVaccinationSlotFormRef.current.submitForm();
  };

  const handleAddVaccinationTimeSlots = () => {
    addVaccinationTimeSlotFormRef.current.submitForm();
  };

  const showDateSlotDeleteConfirm = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: "Do you want to delete " + vaccinationSlotDetails.name + " ?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk() {
        dispatch(
          deleteAdminVaccinationSlot(vaccinationSlotDetails.id, () => {
            dispatch(
              getAdminVaccinationSlotList(dateSlotPaginationData, {}, () => {
                dispatch({
                  type: vaccinationSlotConstants.GET_VACCINATION_TIME_SLOT_LIST_SUCCESS,
                  data: {},
                });
                dispatch({
                  type: vaccinationSlotConstants.GET_VACCINATION_SLOT_SUCCESS,
                  data: {},
                });
              })
            );
          })
        );
      },
    });
  };

  const setVaccinationTimeSlotDetails = () => {
    dispatch(
      getAdminVaccinationSlot(selectedDateSlotId, () => {
        dispatch(getAdminVaccinationTimeSlotList(selectedDateSlotId, () => {}));
      })
    );
  };

  const deleteVaccinationTimeSlot = (id) => {
    dispatch(
      deleteAdminVaccinationTimeSlot(selectedDateSlotId, id, () => {
        dispatch(
          getAdminVaccinationTimeSlotList(selectedDateSlotId, () => {
            dispatch(
              getAdminVaccinationSlotList(dateSlotPaginationData, {}, () => {})
            );
          })
        );
      })
    );
  };

  return (
    <>
      <Card
        title={
          !!selectedDateSlotId && !isEmpty(vaccinationSlotDetails)
            ? vaccinationSlotDetails.name
            : null
        }
        extra={
          !!selectedDateSlotId && !isEmpty(vaccinationSlotDetails) ? (
            <div className="flex">
              <Tooltip title="Edit Slot" className="mr-4 text-xl">
                {!vaccinationSlotDetails.assigned_patient_ids ? (
                  <EditOutlined
                    onClick={() => {
                      setShowEditVaccinationModal(true);
                    }}
                  />
                ) : (
                  ""
                )}
              </Tooltip>
              <Tooltip className="text-xl mr-4" title="Add Time slot">
                <PlusCircleOutlined
                  onClick={() => {
                    setShowAddVaccinationTimeSlotModal(true);
                  }}
                />
              </Tooltip>
              <Tooltip className="text-xl" title="Delete Slot">
                <DeleteOutlined onClick={showDateSlotDeleteConfirm} />
              </Tooltip>
            </div>
          ) : null
        }
        className="rounded-xl mt-4 shadow-md raya-list-card"
      >
        {!!selectedDateSlotId && vaccinationSlotTimeList.data?.length ? (
          vaccinationSlotTimeList.data?.map((value) => (
            <TimeSlotTile
              key={value.id + value.from_time}
              deleteVaccinationTimeSlot={deleteVaccinationTimeSlot}
              selectedDateSlotId={selectedDateSlotId}
              dateSlotPaginationData={dateSlotPaginationData}
              setVaccinationTimeSlotDetails={setVaccinationTimeSlotDetails}
              patientIds={value.patient_ids}
              {...value}
            />
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>

      {showEditVaccinationModal ? (
        <Modal
          title="Edit Vaccination Slot"
          visible={showEditVaccinationModal}
          onOk={handleEditVaccination}
          onCancel={() => {
            setShowEditVaccinationModal(false);
          }}
        >
          <EditVaccinationSlotForm
            slotDetails={vaccinationSlotDetails}
            setVaccinationTimeSlotDetails={setVaccinationTimeSlotDetails}
            closeForm={() => {
              setShowEditVaccinationModal(false);
            }}
            dateSlotPaginationData={dateSlotPaginationData}
            ref={editVaccinationSlotFormRef}
          />
        </Modal>
      ) : null}

      {showAddVaccinationTimeSlotModal ? (
        <Modal
          title="Add Vaccination Time Slot"
          visible={showAddVaccinationTimeSlotModal}
          onOk={handleAddVaccinationTimeSlots}
          onCancel={() => {
            setShowAddVaccinationTimeSlotModal(false);
          }}
        >
          <AddVaccinationTimeSlotForm
            vaccinationDateSlotId={selectedDateSlotId}
            setVaccinationTimeSlotDetails={setVaccinationTimeSlotDetails}
            closeForm={() => {
              setShowAddVaccinationTimeSlotModal(false);
            }}
            dateSlotPaginationData={dateSlotPaginationData}
            ref={addVaccinationTimeSlotFormRef}
          />
        </Modal>
      ) : null}
    </>
  );
};
