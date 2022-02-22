import { Button, Card, Empty, Modal, Tag, Row, Col, Select } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadPatientMedicalHistory,
  getPatientMedicalHistory,
  getPatientMedicalHistoryQuestions,
} from "../../appRedux/actions/MedicalHistory";
import {
  adminGetPatientVaccinatinStatus,
  adminUpdatePatientVaccinatinStatus,
  getAdminUserList,
} from "../../appRedux/actions/UserList";
import { userListConstants } from "../../appRedux/constants";
import { showMessage } from "../../helpers/message";
import { CreateVaccinationCard } from "./create-vaccination-card";
import { HealthScreeningConsentForm } from "./health-screening-content-form";
import { MedicalHistoryDetails } from "./medical-history-details";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useWindowDimensions from "../../helpers/window-dimensions";
import { BloodPressureRecord } from "./blood-pressure";

const { confirm } = Modal;

export const StaffUserListVaccinationDetails = () => {
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const {
    patientVaccinationStatusId,
    patientVaccinationStatusDetails,
    userListRequestObj,
  } = useSelector(({ userList }) => userList);
  const [showSignConsentForm, setShowSignConsentForm] = useState(false);
  const [showBloodPressureModal, setShowBloodPressureModal] = useState(false);
  const [vaccineDoseNumber, setVaccineDoseNumber] = useState(1);
  const [showCreateVaccination, setShowCreateVaccination] = useState(false);
  const [patientVaccinationDetailsList, setPatientVaccinationDetailsList] =
    useState([]);
  const [isMedicalHistoryModalVisible, setIsMedicalHistoryModalVisible] =
    useState(false);

  useEffect(() => {
    if (!isEmpty(patientVaccinationStatusDetails)) {
      setPatientVaccinationDetailsList([
        {
          label: "Vaccine Name",
          value:
            patientVaccinationStatusDetails.vaccination_details.vaccine.name,
        },
        {
          label: "Dose",
          value:
            patientVaccinationStatusDetails.vaccination_details.dose_number,
        },
        {
          label: "Location Name",
          value:
            patientVaccinationStatusDetails.vaccination_details
              .vaccination_location.name,
        },
        {
          label: "Date",
          value: patientVaccinationStatusDetails.booking_details.date
            ? moment(
                patientVaccinationStatusDetails.booking_details.date,
                "YYYY-MM-DD"
              ).format("Do MMMM, YYYY")
            : " ",
        },
        {
          label: "Time Slot",
          value: patientVaccinationStatusDetails.booking_details.from_time
            ? moment(
                patientVaccinationStatusDetails.booking_details.from_time,
                "HH:mm:ss"
              ).format("hh:mm A") +
              " - " +
              moment(
                patientVaccinationStatusDetails.booking_details.to_time,
                "HH:mm:ss"
              ).format("hh:mm A")
            : "",
        },
      ]);
    }
  }, [patientVaccinationStatusDetails]);

  const showSignConsentFormModal = () => {
    setShowSignConsentForm(true);
  };

  const showBloodPressureRecordModal = () => {
    setShowBloodPressureModal(true);
  };

  const handleBloodPressureRecordCancel = () => {
    setShowBloodPressureModal(false);
  };

  const handleSignConsentFormCancel = () => {
    setShowSignConsentForm(false);
  };

  const showCreateVaccinationModal = () => {
    setShowCreateVaccination(true);
  };

  const handleCreateVaccinationCancel = () => {
    setShowCreateVaccination(false);
  };

  const showMedicalHistoryModal = () => {
    dispatch(
      getPatientMedicalHistoryQuestions(
        vaccineDoseNumber,
        { page: 1, limit: 50 },
        () => {
          dispatch(
            getPatientMedicalHistory(
              vaccineDoseNumber,
              patientVaccinationStatusId,
              () => {
                setIsMedicalHistoryModalVisible(true);
              }
            )
          );
        }
      )
    );
  };

  const handleMedicalModalClose = () => {
    setIsMedicalHistoryModalVisible(false);
  };

  const adminDefferPatient = () => {
    confirm({
      title: "Do you want to defer this patient?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(
          adminUpdatePatientVaccinatinStatus(
            patientVaccinationStatusId,
            {
              is_reschedule: true,
            },
            () => {
              dispatch({
                type: userListConstants.GET_PATIENT_VACCINATION_STATUS_SUCCESS,
                data: {},
              });
              showMessage("success", "Patient deffered successfully!");
              dispatch(getAdminUserList(userListRequestObj));
            }
          )
        );
      },
    });
  };

  const setDoseNumber = (dose_no) => {
    setVaccineDoseNumber(dose_no);
    dispatch(
      adminGetPatientVaccinatinStatus(
        patientVaccinationStatusDetails.user_details.user_id,
        dose_no
      )
    );
  };

  return (
    <>
      <Card
        className="rounded-xl mt-4 shadow-md overflow-y-auto"
        style={{ maxHeight: height - 150 }}
      >
        {!isEmpty(patientVaccinationStatusDetails) ? (
          <Select
            allowClear
            placeholder="Select Dose"
            className="w-full mb-2 mt-0"
            showSearch
            defaultValue={1}
            onChange={(value) => setDoseNumber(value)}
          >
            <Select.Option key={"Dose 1"} value={1}>
              {"Dose 1"}
            </Select.Option>
            <Select.Option key={"Dose 2"} value={2}>
              {"Dose 2"}
            </Select.Option>
          </Select>
        ) : (
          ""
        )}
        {!isEmpty(patientVaccinationStatusDetails) ? (
          <div>
            <Card
              type="inner"
              title="Vaccination Details"
              className="mb-4 rounded-xl shadow-md"
            >
              {patientVaccinationDetailsList.map((value, index) => (
                <Row key={index} className="mb-1">
                  <Col xs={12}>
                    <span className="font-semi-bold">{value.label}:</span>
                  </Col>
                  <Col xs={12} className="text-right">
                    <span className="font-light break-words">
                      {value.value}
                    </span>
                  </Col>
                </Row>
              ))}

              {patientVaccinationStatusDetails.vaccination_details &&
              patientVaccinationStatusDetails.vaccination_details
                .injected_arm ? (
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="font-semi-bold">Injected Arm:</span>
                  </Col>
                  <Col xs={12} className="text-right">
                    <span className="font-light break-words">
                      {patientVaccinationStatusDetails.vaccination_details
                        .injected_arm === "L-ARM"
                        ? "Left"
                        : "Right"}
                    </span>
                  </Col>
                </Row>
              ) : (
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="font-semi-bold">Vaccination Status:</span>
                  </Col>
                  <Col xs={12} className="text-right">
                    <span className="font-light break-words">
                      Not Vaccinated
                    </span>
                  </Col>
                </Row>
              )}

              {!!patientVaccinationStatusDetails.vaccination_details
                .vaccinator_details.name ? (
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="font-semi-bold">Vaccinator Name:</span>
                  </Col>
                  <Col xs={12} className="text-right ">
                    <span className="font-light break-words">
                      {
                        patientVaccinationStatusDetails.vaccination_details
                          .vaccinator_details.name
                      }
                    </span>
                  </Col>
                </Row>
              ) : null}

              {!!patientVaccinationStatusDetails.vaccination_details
                .vaccinator_details.code ? (
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="font-semi-bold">PRC License Number:</span>
                  </Col>
                  <Col xs={12} className="text-right ">
                    <span className="font-light break-words">
                      {
                        patientVaccinationStatusDetails.vaccination_details
                          .vaccinator_details.code
                      }
                    </span>
                  </Col>
                </Row>
              ) : null}
            </Card>

            <Card
              type="inner"
              title="Medical History"
              className="mb-4 rounded-xl shadow-md"
            >
              <div>
                <span className="text-base font-semibold mr-2">Status :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details
                  .is_medical_history_verified ? (
                  <Tag color="#87d068">Verified</Tag>
                ) : (
                  <Tag color="#f50">Pending</Tag>
                )}
              </div>
              <div>
                <span className="text-base font-semibold">Action :</span>
                <Button onClick={() => showMedicalHistoryModal(1)} type="link">
                  {patientVaccinationStatusDetails.vaccination_details &&
                  patientVaccinationStatusDetails.vaccination_details
                    .is_medical_history_verified
                    ? "View"
                    : "Verify"}
                </Button>
              </div>
              <div>
                <span className="text-base font-semibold mr-2">Date :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details
                  .medical_history_verified_date
                  ? moment(
                      patientVaccinationStatusDetails.vaccination_details
                        .medical_history_verified_date
                    ).format("Do MMMM, YYYY")
                  : "-"}
              </div>
              <div>
                <span className="text-base font-semibold mr-2">Time :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details
                  .medical_history_verified_date
                  ? moment(
                      patientVaccinationStatusDetails.vaccination_details
                        .medical_history_verified_date
                    ).format("h:mm A")
                  : "-"}
              </div>
            </Card>

            <Card
              type="inner"
              title="Consent Form"
              className="mb-4 rounded-xl shadow-md"
            >
              <div>
                <span className="text-base font-semibold mr-2">Status :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details
                  .is_consent_signed ? (
                  <Tag color="#87d068">Signed</Tag>
                ) : (
                  <Tag color="#f50">Pending</Tag>
                )}
              </div>
              <div>
                <span className="text-base font-semibold">Action :</span>
                <Button onClick={() => showSignConsentFormModal()} type="link">
                  {patientVaccinationStatusDetails.vaccination_details &&
                  patientVaccinationStatusDetails.vaccination_details
                    .is_consent_signed
                    ? "View"
                    : "Get Sign"}
                </Button>
              </div>
              <div>
                <span className="text-base font-semibold mr-2">Date :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details.consent_date
                  ? moment(
                      patientVaccinationStatusDetails.vaccination_details
                        .consent_date
                    ).format("Do MMMM, YYYY")
                  : "-"}
              </div>
              <div>
                <span className="text-base font-semibold mr-2">Time :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details.consent_date
                  ? moment(
                      patientVaccinationStatusDetails.vaccination_details
                        .consent_date
                    ).format("h:mm A")
                  : "-"}
              </div>
            </Card>
            <Card
              type="inner"
              title="Vaccination Card"
              className="mb-4 rounded-xl shadow-md"
            >
              <div>
                <span className="text-base font-semibold mr-2">Status :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details
                  .is_vaccination_card_created ? (
                  <Tag color="#87d068">Created</Tag>
                ) : (
                  <Tag color="#f50">Pending</Tag>
                )}
              </div>
              <div>
                <span className="text-base font-semibold">Action :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details
                  .is_vaccination_card_created ? (
                  <span className="ml-4">-</span>
                ) : (
                  <Button
                    onClick={() => showCreateVaccinationModal()}
                    type="link"
                  >
                    Create
                  </Button>
                )}
              </div>
              <div>
                <span className="text-base font-semibold mr-2">Date :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details
                  .vaccination_card_creation_date
                  ? moment(
                      patientVaccinationStatusDetails.vaccination_details
                        .vaccination_card_creation_date
                    ).format("Do MMMM, YYYY")
                  : "-"}
              </div>
              <div>
                <span className="text-base font-semibold mr-2">Time :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details
                  .vaccination_card_creation_date
                  ? moment(
                      patientVaccinationStatusDetails.vaccination_details
                        .vaccination_card_creation_date
                    ).format("h:mm A")
                  : "-"}
              </div>
            </Card>

            <Card
              type="inner"
              title="Monitoring"
              className="mb-4 rounded-xl shadow-md"
            >
              <div>
                <span className="text-base font-semibold mr-2">Status :</span>
                {patientVaccinationStatusDetails.vaccination_details &&
                patientVaccinationStatusDetails.vaccination_details
                  .monitoring_remarks ? (
                  <Tag color="#87d068">Recorded</Tag>
                ) : (
                  <Tag color="#f50">Pending</Tag>
                )}
              </div>
              <div>
                <span className="text-base font-semibold">Action :</span>
                <Button
                  onClick={() => showBloodPressureRecordModal()}
                  type="link"
                >
                  {patientVaccinationStatusDetails.vaccination_details &&
                  patientVaccinationStatusDetails.vaccination_details
                    .monitoring_remarks
                    ? "-"
                    : "Record"}
                </Button>
              </div>
              <div className="mt-1">
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="text-base font-semibold mr-2">
                      Medical History Remarks :
                    </span>
                  </Col>
                  <Col xs={12} className="text-right break-words">
                    {patientVaccinationStatusDetails.vaccination_details &&
                    patientVaccinationStatusDetails.vaccination_details
                      .medical_history_remarks
                      ? patientVaccinationStatusDetails.vaccination_details
                          .medical_history_remarks
                      : "-"}
                  </Col>
                </Row>
              </div>
              <div className="mt-1">
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="text-base font-semibold mr-2">
                      Waiting
                      <br />
                      Period :
                    </span>
                  </Col>
                  <Col xs={12} className="text-right break-words">
                    {patientVaccinationStatusDetails.vaccination_details &&
                    patientVaccinationStatusDetails.vaccination_details
                      .medical_hisory_waiting_period
                      ? patientVaccinationStatusDetails.vaccination_details
                          .medical_hisory_waiting_period === "15 MINS"
                        ? "15 Minutes"
                        : "30 Minutes"
                      : "-"}
                  </Col>
                </Row>
              </div>
              <div className="mt-1 mb-1">
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="text-base font-semibold mr-2 mt-2">
                      Blood Pressure :
                    </span>
                  </Col>
                  <Col xs={12} className="text-right break-words mb-2">
                    {patientVaccinationStatusDetails.vaccination_details &&
                    patientVaccinationStatusDetails.vaccination_details
                      .blood_pressure
                      ? patientVaccinationStatusDetails.vaccination_details
                          .blood_pressure
                      : "-"}
                  </Col>
                </Row>
              </div>
              <div className="mt-1 mb-1">
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="text-base font-semibold mr-2 mt-2">
                      Oxygen <br /> Saturation :
                    </span>
                  </Col>
                  <Col xs={12} className="text-right break-words mb-2">
                    {patientVaccinationStatusDetails.vaccination_details &&
                    patientVaccinationStatusDetails.vaccination_details
                      .oxygen_saturation
                      ? patientVaccinationStatusDetails.vaccination_details
                          .oxygen_saturation
                      : "-"}
                  </Col>
                </Row>
              </div>

              <div className="mt-1 mb-1">
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="text-base font-semibold mr-2 mt-2">
                      Monitoring
                      <br />
                      Remarks :
                    </span>
                  </Col>
                  <Col xs={12} className="text-right break-words mb-2">
                    {patientVaccinationStatusDetails.vaccination_details &&
                    patientVaccinationStatusDetails.vaccination_details
                      .monitoring_remarks
                      ? patientVaccinationStatusDetails.vaccination_details
                          .monitoring_remarks
                      : "-"}
                  </Col>
                </Row>
              </div>
              <div className="mt-1">
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="text-base font-semibold mr-2">Date :</span>
                  </Col>
                  <Col xs={12} className="text-right break-words">
                    {patientVaccinationStatusDetails.vaccination_details &&
                    patientVaccinationStatusDetails.vaccination_details
                      .blood_pressure_date
                      ? moment(
                          patientVaccinationStatusDetails.vaccination_details
                            .blood_pressure_date
                        ).format("Do MMMM, YYYY")
                      : "-"}
                  </Col>
                </Row>
              </div>
              <div className="mt-1">
                <Row className="mb-1">
                  <Col xs={12}>
                    <span className="text-base font-semibold mr-2">Time :</span>
                  </Col>
                  <Col xs={12} className="text-right break-words">
                    {patientVaccinationStatusDetails.vaccination_details &&
                    patientVaccinationStatusDetails.vaccination_details
                      .blood_pressure_date
                      ? moment(
                          patientVaccinationStatusDetails.vaccination_details
                            .blood_pressure_date
                        ).format("h:mm A")
                      : "-"}
                  </Col>
                </Row>
              </div>
            </Card>

            <Button
              onClick={() => adminDefferPatient()}
              className="w-full"
              type="primary"
              danger
              disabled={
                !!patientVaccinationStatusDetails.vaccination_details
                  .is_vaccination_card_created
              }
            >
              Defer Patient
            </Button>
            <Button
              onClick={() =>
                dispatch(
                  downloadPatientMedicalHistory(
                    patientVaccinationStatusId,
                    patientVaccinationStatusDetails &&
                      patientVaccinationStatusDetails.user_details
                      ? patientVaccinationStatusDetails.user_details.firstname +
                          "_" +
                          patientVaccinationStatusDetails.user_details
                            .lastname +
                          ".pdf"
                      : "patient_form.pdf"
                  )
                )
              }
              type="primary"
              className="w-full mt-4"
            >
              Download Details Form
            </Button>
          </div>
        ) : (
          <Empty />
        )}
      </Card>

      {isMedicalHistoryModalVisible ? (
        <Modal
          title="Patient Medical History"
          visible={isMedicalHistoryModalVisible}
          onCancel={handleMedicalModalClose}
          cancelText="Close"
          footer={null}
          // className="w-7/12"
          width={width - 100}
          style={{ top: 50 }}
        >
          <MedicalHistoryDetails
            handleMedicalModalClose={handleMedicalModalClose}
            vaccineDoseNumber={vaccineDoseNumber}
          />
        </Modal>
      ) : null}

      {showSignConsentForm ? (
        <Modal
          title="Health Screening Consent Form"
          visible={showSignConsentForm}
          onCancel={handleSignConsentFormCancel}
          className="w-7/12"
          footer={null}
        >
          <HealthScreeningConsentForm
            handleSignConsentFormCancel={handleSignConsentFormCancel}
            vaccineDoseNumber={vaccineDoseNumber}
          />
        </Modal>
      ) : null}

      {showCreateVaccination ? (
        <Modal
          title="Create Vaccination Card"
          visible={showCreateVaccination}
          onCancel={handleCreateVaccinationCancel}
          className="w-7/12"
          footer={null}
        >
          <CreateVaccinationCard
            handleCreateVaccinationCancel={handleCreateVaccinationCancel}
            vaccineDoseNumber={vaccineDoseNumber}
          />
        </Modal>
      ) : null}

      {showBloodPressureModal ? (
        <Modal
          title="Monitoring"
          visible={showBloodPressureModal}
          onCancel={handleBloodPressureRecordCancel}
          className="w-7/12"
          footer={null}
        >
          <BloodPressureRecord
            handleBloodPressureRecordCancel={handleBloodPressureRecordCancel}
            vaccineDoseNumber={vaccineDoseNumber}
          />
        </Modal>
      ) : null}
    </>
  );
};
