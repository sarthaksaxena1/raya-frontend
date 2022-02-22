import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
import { Col, Row, Divider, Select, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";
import {
  bookPatientVaccinationTimeSlot,
  getPatientAllotedVaccinationDetails,
  getPatientAllotedVaccinationTimeSlotDetails,
  getPatientVaccinationBookingDetails,
} from "../../appRedux/actions/PatientVaccinationBookings";
import moment from "moment";
import { showMessage } from "../../helpers/message";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { confirm } = Modal;

const PatientVaccinationDetails = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [vaccineDetails, setVaccineDetails] = useState([]);
  const [patientDetails, setPatientDetails] = useState([]);
  const [vaccineBookingDetails, setVaccineBookingDetails] = useState([]);
  const [vaccineBookingDetailsDose2, setVaccineBookingDetailsDose2] = useState(
    []
  );
  const [viewVaccinationDetails, setViewVaccinationDetails] = useState(false);
  const [timeSlot, setTimeSlot] = useState(null);

  const {
    vaccinationDetails,
    vaccinationBookingDetails,
    vaccinationTimeSlotDetails,
  } = useSelector(
    ({ patientVaccinationBookings }) => patientVaccinationBookings
  );

  useEffect(() => {
    setViewVaccinationDetails(match.params.action === "view");
    if (match.params.action === "view") {
      dispatch(getPatientVaccinationBookingDetails());
    } else {
      dispatch(
        getPatientAllotedVaccinationDetails(match.params.dose_number, () => {
          dispatch(
            getPatientAllotedVaccinationTimeSlotDetails(
              match.params.dose_number
            )
          );
        })
      );
    }
  }, []);

  useEffect(() => {
    setPatientVaccinationDetails();
  }, [vaccinationDetails]);

  useEffect(() => {
    setPatientVaccinationBookingDetails();
  }, [vaccinationBookingDetails]);

  const setPatientVaccinationDetails = () => {
    const { dose_number, slot_date, vaccination_location, vaccine } =
      vaccinationDetails;
    if (!isEmpty(vaccinationDetails)) {
      setVaccineDetails([
        { label: "Vaccine Name", value: vaccine.name },
        { label: "Dose", value: dose_number },
        { label: "Location Name", value: vaccination_location.name },
        { label: "Address", value: vaccination_location.address },
        { label: "Cbcr code", value: vaccination_location.cbcr },

        {
          label: "Vaccination Date",
          value: moment(slot_date, "YYYY-MM-DD").format("Do MMMM, YYYY"),
        },
      ]);
    }
  };

  const setPatientVaccinationBookingDetails = () => {
    const { dose1_details, dose2_details } = vaccinationBookingDetails;
    if (!isEmpty(vaccinationBookingDetails)) {
      setVaccineBookingDetails([
        {
          label: "Vaccine Name",
          value: dose1_details.vaccination_details.vaccine.name,
        },
        {
          label: "Vaccine Manufacturer",
          value: dose1_details.vaccination_details.vaccine.vaccine_manufacturer,
        },
        { label: "Dose", value: dose1_details.vaccination_details.dose_number },
        {
          label: "Location Name",
          value: dose1_details.vaccination_details.vaccination_location.name,
        },
        {
          label: "Address",
          value: dose1_details.vaccination_details.vaccination_location.address,
        },
        {
          label: "Cbcr code",
          value: dose1_details.vaccination_details.vaccination_location.cbcr,
        },

        {
          label: "Vaccination Date",
          value: dose1_details && dose1_details.booking_details && dose1_details.booking_details.date ? (moment(
            dose1_details.booking_details.date,
            "YYYY-MM-DD"
          ).format("Do MMMM, YYYY")) : null,
        },
        {
          label: "Time Slot",
          value:
          dose1_details.booking_details.from_time ?
            (moment(dose1_details.booking_details.from_time, "H:mm:ss").format(
              "h:mm A"
            ) +
            " to " +
            moment(dose1_details.booking_details.to_time, "H:mm:ss").format(
              "h:mm A"
            )) : null,
        },
      ]);
      setVaccineBookingDetailsDose2([
        {
          label: "Vaccine Name",
          value: dose2_details.vaccination_details.vaccine.name,
        },
        {
          label: "Vaccine Manufacturer",
          value: dose2_details.vaccination_details.vaccine.vaccine_manufacturer,
        },
        { label: "Dose", value: dose2_details.vaccination_details.dose_number },
        {
          label: "Location Name",
          value: dose2_details.vaccination_details.vaccination_location.name,
        },
        {
          label: "Address",
          value: dose2_details.vaccination_details.vaccination_location.address,
        },
        {
          label: "Cbcr code",
          value: dose2_details.vaccination_details.vaccination_location.cbcr,
        },

        {
          label: "Vaccination Date",
          value: dose2_details.booking_details.date
            ? moment(dose2_details.booking_details.date, "YYYY-MM-DD").format(
                "Do MMMM, YYYY"
              )
            : "",
        },
        {
          label: "Time Slot",
          value:dose2_details.booking_details.from_time?
            moment(dose2_details.booking_details.from_time, "H:mm:ss").format(
              "h:mm A"
            ) +
            " to " +
            moment(dose2_details.booking_details.to_time, "H:mm:ss").format(
              "h:mm A"
            ):" "
        },
      ]);
      setPatientDetails([
        { label: "First Name", value: dose1_details.user_details.firstname },
        {
          label: "Middle Name",
          value: dose1_details.user_details.middlename
            ? dose1_details.user_details.middlename
            : "NA",
        },
        { label: "Last Name", value: dose1_details.user_details.lastname },
        {
          label: "Date of Birth",
          value: moment(
            dose1_details.user_details.date_of_birth,
            "YYYY-MM-DD"
          ).format("Do MMMM, YYYY"),
        },
        { label: "Gender", value: dose1_details.user_details.gender },
        { label: "Contact Number", value: dose1_details.user_details.mobile },
      ]);
    }
  };

  const handleTimeSlotSubmit = () => {
    confirm({
      title: "Do you want to select this time slot ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(
          bookPatientVaccinationTimeSlot(
            {
              vaccination_time_slot: Number(timeSlot),
              dose_number: match.params.dose_number
            },
            () => {
              setTimeSlot(null);
              showMessage(
                "success",
                "Vaccination time slot selected successfully!"
              );
              history.push("/patient/dashboard");
            }
          )
        );
      },
    });
  };

  return (
    <MobilePagesScreenLayout
      pageTitle={
        match.params.action === "view"
          ? "Vaccination Slot Details"
          : "Select Time Slot"
      }
      userIcon={false}
      showRayaLogo={false}
    >
      <div className="min-w-full mb-4">
        {!viewVaccinationDetails ? (
          <>
            <span className="flex align center font-semibold text-xl mb-4">
              Vaccination Details
            </span>
            {vaccineDetails.map((value, index) => (
              <>
                <Row key={index}>
                  <Col xs={12} sm={8}>
                    <span className=" text-lg font-semi-bold">
                      {value.label}:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className=" text-lg font-light break-words">
                      {value.value}
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </>
            ))}
            <span className="flex align center font-semibold text-xl mb-4 mt-8">
              Select Vaccination Time Slot
            </span>
            <div className="raya-signup-form">
              <Select
                className="w-full"
                placeholder="Please select time slot"
                size="large"
                onChange={(value) => setTimeSlot(value)}
              >
                {vaccinationTimeSlotDetails &&
                vaccinationTimeSlotDetails.time_slots
                  ? vaccinationTimeSlotDetails.time_slots.map((value) => (
                      <Option key={value.id} value={value.id}>
                        {moment(value.from_time, "H:mm:ss").format("h:mm A") +
                          " to " +
                          moment(value.to_time, "H:mm:ss").format("h:mm A")}
                      </Option>
                    ))
                  : null}
              </Select>
            </div>
            <Button
              type="primary"
              className="w-full h-12 text-xl rounded-md mt-4"
              disabled={!timeSlot}
              onClick={handleTimeSlotSubmit}
            >
              Submit
            </Button>
          </>
        ) : null}

        {!!viewVaccinationDetails ? (
          <>
            <span className="flex align center font-semibold text-xl mb-4">
              Patient Details
            </span>
            {patientDetails.map((value, index) => (
              <>
                <Row key={index}>
                  <Col xs={12} sm={8}>
                    <span className=" text-lg font-semi-bold">
                      {value.label}:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className=" text-lg font-light break-words">
                      {value.value}
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </>
            ))}
            <span className="flex align center font-semibold text-xl mb-4 mt-8">
              Vaccination Details
            </span>

            <span className="flex align center font-semibold text-xl mb-4 mt-8">
              DOSE 1
            </span>
            {vaccineBookingDetails.map((value, index) => (
              <>
                <Row key={index}>
                  <Col xs={12} sm={8}>
                    <span className=" text-lg font-semi-bold">
                      {value.label}:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className=" text-lg font-light break-words">
                      {value.value}
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </>
            ))}

            {vaccinationBookingDetails.dose1_details &&
            vaccinationBookingDetails.dose1_details.vaccination_details &&
            vaccinationBookingDetails.dose1_details.vaccination_details
              .injected_arm ? (
              <>
                <Row className="mb-1">
                  <Col xs={12} sm={8}>
                    <span className="text-lg font-semi-bold">
                      Injected Arm:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className="text-lg font-light break-words">
                      {vaccinationBookingDetails.dose1_details
                        .vaccination_details.injected_arm === "L-ARM"
                        ? "Left"
                        : "Right"}
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </>
            ) : (
              <>
                <Row className="mb-1">
                  <Col xs={12} sm={8}>
                    <span className="text-lg font-semi-bold">
                      Vaccination Status:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className="text-lg font-light break-words">
                      Not Vaccinated
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </>
            )}

            {vaccinationBookingDetails.dose1_details &&
            vaccinationBookingDetails.dose1_details.vaccination_details &&
            vaccinationBookingDetails.dose1_details.vaccination_details
              .vaccinator_details.name ? (
              <div>
                <Row>
                  <Col xs={12} sm={8}>
                    <span className=" text-lg font-semi-bold break-words">
                      Vaccinator<br></br>Name:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className="text-lg font-light break-words">
                      {
                        vaccinationBookingDetails.dose1_details
                          .vaccination_details.vaccinator_details.name
                      }
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </div>
            ) : null}

            {vaccinationBookingDetails.dose1_details &&
            vaccinationBookingDetails.dose1_details.vaccination_details &&
            vaccinationBookingDetails.dose1_details.vaccination_details
              .vaccinator_details.code ? (
              <div>
                <Row>
                  <Col xs={12} sm={8}>
                    <span className=" text-lg font-semi-bold break-words">
                      PRC License<br></br>Number:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className="text-lg font-light break-words">
                      {
                        vaccinationBookingDetails.dose1_details
                          .vaccination_details.vaccinator_details.code
                      }
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </div>
            ) : null}

            <span className="flex align center font-semibold text-xl mb-4 mt-8">
              DOSE 2
            </span>
            {vaccineBookingDetailsDose2.map((value, index) => (
              <>
                <Row key={index}>
                  <Col xs={12} sm={8}>
                    <span className=" text-lg font-semi-bold">
                      {value.label}:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className=" text-lg font-light break-words">
                      {value.value}
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </>
            ))}

            {vaccinationBookingDetails.dose2_details &&
            vaccinationBookingDetails.dose2_details.vaccination_details &&
            vaccinationBookingDetails.dose2_details.vaccination_details
              .injected_arm ? (
              <>
                <Row className="mb-1">
                  <Col xs={12} sm={8}>
                    <span className="text-lg font-semi-bold">
                      Injected Arm:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className="text-lg font-light break-words">
                      {vaccinationBookingDetails.dose2_details
                        .vaccination_details.injected_arm === "L-ARM"
                        ? "Left"
                        : "Right"}
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </>
            ) : (
              <>
                <Row className="mb-1">
                  <Col xs={12} sm={8}>
                    <span className="text-lg font-semi-bold">
                      Vaccination Status:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className="text-lg font-light break-words">
                      Not Vaccinated
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </>
            )}

            {vaccinationBookingDetails.dose2_details &&
            vaccinationBookingDetails.dose2_details.vaccination_details &&
            vaccinationBookingDetails.dose2_details?.vaccination_details?.vaccinator_details?.name ? (
              <div>
                <Row>
                  <Col xs={12} sm={8}>
                    <span className=" text-lg font-semi-bold break-words">
                      Vaccinator<br></br>Name:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className="text-lg font-light break-words">
                      {
                        vaccinationBookingDetails.dose2_details
                          .vaccination_details.vaccinator_details.name
                      }
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </div>
            ) : null}

            {vaccinationBookingDetails.dose2_details &&
            vaccinationBookingDetails.dose2_details?.vaccination_details &&
            vaccinationBookingDetails.dose2_details?.vaccination_details?.vaccinator_details?.code ? (
              <div>
                <Row>
                  <Col xs={12} sm={8}>
                    <span className=" text-lg font-semi-bold break-words">
                      PRC License<br></br>Number:
                    </span>
                  </Col>
                  <Col xs={12} sm={16} className="text-right">
                    <span className="text-lg font-light break-words">
                      {
                        vaccinationBookingDetails.dose2_details
                          .vaccination_details.vaccinator_details.code
                      }
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </div>
            ) : null}

            {vaccinationBookingDetails &&
            vaccinationBookingDetails.user_details &&
            vaccinationBookingDetails.user_details.qr_code_link ? (
              <div className="w-10/12 max-w-md mx-auto mt-4 mb-8">
                <img
                  className="w-44 h-44 ml-auto mr-auto"
                  src={vaccinationBookingDetails.user_details.qr_code_link}
                  alt="qr-code"
                />
              </div>
            ) : (
              <div className="mb-8"></div>
            )}
          </>
        ) : null}
      </div>
    </MobilePagesScreenLayout>
  );
};

export default PatientVaccinationDetails;
