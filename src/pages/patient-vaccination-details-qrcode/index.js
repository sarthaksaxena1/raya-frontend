import { Row, Col, Divider } from "antd";
import RegisterationLayout from "../../layouts/hybrid/registeration-layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPatientsDetailViaQrScan } from "../../appRedux/actions/PatientProfileDetails";
import moment from "moment";

const DisplayPatientVaccinationDetails = (props) => {
  const dispatch = useDispatch();
  const { qrid } = props.match.params;
  const [patientProfileData, setPatientProfileData] = useState({});
  const [patientProfileDataDose2, setPatientProfileDataDose2] = useState({});
  const [patientVaccinationData, setPatientVaccinationData] = useState({});
  const [patientVaccinationBookingData, setPatientVaccinationBookingData] =
    useState({});
    const [patientVaccinationDataDose2, setPatientVaccinationDataDose2] = useState({});
    const [patientVaccinationBookingDataDose2, setPatientVaccinationBookingDataDose2] =
      useState({});
  const isLoaded = useSelector((state) => state.patientProfile.isLoaded);
  const patientProfileDetails = useSelector(
    (state) => state.patientProfile.patientDetailsViaQr
  );

  useEffect(() => {
    if (qrid) {
      dispatch(getPatientsDetailViaQrScan(qrid));
    }
  }, []);

  useEffect(() => {

    setPatientProfileData(patientProfileDetails?.dose1_details?.user_details);
    setPatientProfileDataDose2(patientProfileDetails?.dose2_details?.user_details);
    setPatientVaccinationData(patientProfileDetails?.dose1_details?.vaccination_details);
    setPatientVaccinationBookingData(patientProfileDetails?.dose1_details?.booking_details);
    setPatientVaccinationDataDose2(patientProfileDetails?.dose2_details?.vaccination_details);
    setPatientVaccinationBookingDataDose2(patientProfileDetails?.dose2_details?.booking_details);
  }, [isLoaded]);

  const patientDetailsData = [
    { label: "First Name", value: patientProfileData?.firstname },
    {
      label: "Middle Name",
      value: patientProfileData?.middlename
        ? patientProfileData.middlename
        : "NA",
    },
    { label: "Last Name", value: patientProfileData?.lastname },
    {
      label: "Date of Birth",
      value: patientProfileData?.date_of_birth
        ? moment(patientProfileData.date_of_birth, "YYYY-MM-DD").format(
            "Do MMMM, YYYY"
          )
        : null,
    },
    { label: "Gender", value: patientProfileData?.gender },
    { label: "Contact Number", value: patientProfileData?.mobile },
  ];

  const patientVaccinationDetails = [
    { label: "Vaccine Name", value: patientVaccinationData?.vaccine?.name },
    {
      label: "Vaccine Manufacturer",
      value: patientVaccinationData?.vaccine?.vaccine_manufacturer,
    },
    { label: "Dose", value: patientVaccinationData?.dose_number },
    {
      label: "Location Name",
      value: patientVaccinationData?.vaccination_location?.name,
    },
    {
      label: "Address",
      value: patientVaccinationData?.vaccination_location?.address,
    },
    {
      label: "Cbcr code",
      value: patientVaccinationData?.vaccination_location?.cbcr,
    },
    {
      label: "Vaccination Date",
      value: patientVaccinationData?.vaccination_date
        ? moment(patientVaccinationData.vaccination_date, "YYYY-MM-DD").format(
            "Do MMMM, YYYY"
          )
        : null,
    },
    {
      label: "Time Slot",
      value:
        patientVaccinationBookingData?.from_time &&
        patientVaccinationBookingData?.to_time
          ? moment(patientVaccinationBookingData.from_time, "H:mm:ss").format(
              "h:mm A"
            ) +
            " to " +
            moment(patientVaccinationBookingData.to_time, "H:mm:ss").format(
              "h:mm A"
            )
          : "-",
    },
  ];


  const patientVaccinationDetailsDose2 = [
    { label: "Vaccine Name", value: patientVaccinationDataDose2?.vaccine?.name },
    {
      label: "Vaccine Manufacturer",
      value: patientVaccinationDataDose2?.vaccine?.vaccine_manufacturer,
    },
    { label: "Dose", value: patientVaccinationDataDose2?.dose_number },
    {
      label: "Location Name",
      value: patientVaccinationDataDose2?.vaccination_location?.name,
    },
    {
      label: "Address",
      value: patientVaccinationDataDose2?.vaccination_location?.address,
    },
    {
      label: "Cbcr code",
      value: patientVaccinationDataDose2?.vaccination_location?.cbcr,
    },
    {
      label: "Vaccination Date",
      value: patientVaccinationDataDose2?.vaccination_date
        ? moment(patientVaccinationDataDose2.vaccination_date, "YYYY-MM-DD").format(
            "Do MMMM, YYYY"
          )
        : null,
    },
    {
      label: "Time Slot",
      value:
        patientVaccinationBookingDataDose2?.from_time &&
        patientVaccinationBookingDataDose2?.to_time
          ? moment(patientVaccinationBookingDataDose2.from_time, "H:mm:ss").format(
              "h:mm A"
            ) +
            " to " +
            moment(patientVaccinationBookingDataDose2.to_time, "H:mm:ss").format(
              "h:mm A"
            )
          : "-",
    },
  ];
  return (
    <RegisterationLayout>
      <div className="mt-8">
        <span className="flex align center font-semibold text-xl mb-4">
          Patient Details
        </span>
        {patientDetailsData.map((value, index) => (
          <>
            <Row key={index}>
              <Col xs={12} sm={10}>
                <span className=" text-lg font-semi-bold">{value.label}:</span>
              </Col>
              <Col xs={12} sm={14} className="text-right">
                <span className=" text-lg font-light break-words">
                  {value.value}
                </span>
              </Col>
            </Row>
            <Divider className="my-2" />
          </>
        ))}
        
        
        {patientProfileDetails?.dose1_details?.vaccination_details ? (
          <>
            <span className="flex align center font-semibold text-xl mb-4 mt-8">
              Vaccination Details
            </span>
            <span className="flex align center font-semibold text-xl mb-4 mt-8">
              Dose 1
            </span>
            {patientVaccinationDetails.map((value, index) => (
              <>
                <Row key={index}>
                  <Col xs={12} sm={10}>
                    <span className=" text-lg font-semi-bold">
                      {value.label}:
                    </span>
                  </Col>
                  <Col xs={12} sm={14} className="text-right">
                    <span className=" text-lg font-light break-words">
                      {value.value}
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </>
            ))}
          </>
        ) : null}
        {patientVaccinationData?.injected_arm ? (
          <>
            <Row className="mb-1">
              <Col xs={12} sm={10}>
                <span className="text-lg font-semi-bold">Injected Arm:</span>
              </Col>
              <Col xs={12} sm={14} className="text-right">
                <span className="text-lg font-light break-words">
                  {patientVaccinationData.injected_arm === "L-ARM"
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
        {patientVaccinationData?.vaccinator_details?.name ? (
          <Row className="mb-1">
            <Col xs={12} sm={10}>
              <span className="text-lg font-semi-bold">
                Vaccinator <br></br>Name:
              </span>
            </Col>
            <Col xs={12} sm={14} className="text-right">
              <span className="text-lg font-light break-words">
                {patientVaccinationData.vaccinator_details.name}
              </span>
            </Col>
          </Row>
        ) : null}
        {patientVaccinationData?.vaccinator_details?.code ? (
          <Row className="mb-1">
            <Col xs={12} sm={10}>
              <span className="text-lg font-semi-bold">
                PRC License<br></br>Number:
              </span>
            </Col>
            <Col xs={12} sm={14} className="text-right">
              <span className="text-lg font-light break-words">
                {patientVaccinationData.vaccinator_details.code}
              </span>
            </Col>
          </Row>
        ) : null}


          {patientProfileDetails?.dose2_details?.vaccination_details ? (
          <>
            <span className="flex align center font-semibold text-xl mb-4 mt-8">
              Vaccination Details
            </span>
            <span className="flex align center font-semibold text-xl mb-4 mt-8">
              Dose 2
            </span>
            {patientVaccinationDetailsDose2.map((value, index) => (
              <>
                <Row key={index}>
                  <Col xs={12} sm={10}>
                    <span className=" text-lg font-semi-bold">
                      {value.label}:
                    </span>
                  </Col>
                  <Col xs={12} sm={14} className="text-right">
                    <span className=" text-lg font-light break-words">
                      {value.value}
                    </span>
                  </Col>
                </Row>
                <Divider className="my-2" />
              </>
            ))}
          </>
        ) : null}
        {patientVaccinationDataDose2?.injected_arm ? (
          <>
            <Row className="mb-1">
              <Col xs={12} sm={10}>
                <span className="text-lg font-semi-bold">Injected Arm:</span>
              </Col>
              <Col xs={12} sm={14} className="text-right">
                <span className="text-lg font-light break-words">
                  {patientVaccinationDataDose2.injected_arm === "L-ARM"
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
        {patientVaccinationDataDose2?.vaccinator_details?.name ? (
          <Row className="mb-1">
            <Col xs={12} sm={10}>
              <span className="text-lg font-semi-bold">
                Vaccinator <br></br>Name:
              </span>
            </Col>
            <Col xs={12} sm={14} className="text-right">
              <span className="text-lg font-light break-words">
                {patientVaccinationDataDose2.vaccinator_details.name}
              </span>
            </Col>
          </Row>
        ) : null}
        {patientVaccinationDataDose2?.vaccinator_details?.code ? (
          <Row className="mb-1">
            <Col xs={12} sm={10}>
              <span className="text-lg font-semi-bold">
                PRC License<br></br>Number:
              </span>
            </Col>
            <Col xs={12} sm={14} className="text-right">
              <span className="text-lg font-light break-words">
                {patientVaccinationDataDose2.vaccinator_details.code}
              </span>
            </Col>
          </Row>
        ) : null}


        
      </div>
    </RegisterationLayout>
  );
};

export default DisplayPatientVaccinationDetails;
