import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientProfileDetails } from "../../appRedux/actions/PatientProfileDetails";
import { CtaTile } from "../../components/tiles/cta-tile";
import {
  faBookMedical,
  faFileAlt,
  faSyringe,
  faUpload,
  faMapMarkerAlt,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const PatientDashboard = () => {
  const { patientProfileData } = useSelector(
    ({ patientProfile }) => patientProfile
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPatientProfileDetails());
  }, []);

  return (
    <MobilePagesScreenLayout
      pageTitle="Dashboard"
      userIcon={true}
      showRayaLogo={true}
    >
      <div className="">
        <h2 className="text-2xl font-semibold mt-4">
          {" "}
          Hello{" "}
          {patientProfileData.first_name ? patientProfileData.first_name : ""},
        </h2>
        <p className="text-xl">Welcome to Raya Health</p>
      </div>
      {patientProfileData.has_ceir_details === false ? (
        <div className="mt-8">
          <CtaTile
            headerText="COVID-19 Electronic Immunization Registration"
            icon={faFileAlt}
            subText="Please click here to fill CEIR Details form!"
            onClickHandle={() => {
              history.push("/patient/ceir/add");
            }}
          />
        </div>
      ) : null}
      {patientProfileData.preferred_location === null &&
      patientProfileData.is_allocated_vaccine === false ? (
        <div className="mt-8">
          <CtaTile
            headerText="Select your preferred location"
            icon={faMapMarkerAlt}
            subText="Please click here to select your preferred vaccination location"
            onClickHandle={() => {
              history.push("/patient/preferred-location");
            }}
          />
        </div>
      ) : null}

      {patientProfileData.has_ceir_details === true &&
      patientProfileData.has_to_upload_comorbidity_doc === true &&
      patientProfileData.is_ceir_rejected === false ? (
        <div className="mt-8">
          <CtaTile
            headerText="Upload Comorbidity Proof"
            icon={faUpload}
            subText="Please click here to upload your comorbidity proof!"
            onClickHandle={() => {
              history.push("/patient/upload-comorbidity");
            }}
          />
        </div>
      ) : null}

      {patientProfileData.is_ceir_rejected === true &&
      patientProfileData.is_ceir_submitted === false ? (
        <div className="mt-8">
          <CtaTile
            bgColor="bg-red-100"
            headerText="COVID-19 Electronic Immunization Registration"
            icon={faFileAlt}
            subText="Please re-check and submit the CEIR form!"
            onClickHandle={() => {
              history.push("/patient/ceir/edit");
            }}
          />
        </div>
      ) : null}

      {patientProfileData.is_medical_history_submitted === false ? (
        <div className="mt-8">
          <CtaTile
            headerText="Medical History"
            icon={faBookMedical}
            subText="Please click here to fill medical history form!"
            onClickHandle={() => {
              history.push("/patient/add-medical-history/1");
            }}
          />
        </div>
      ) : null}

      {patientProfileData.is_medical_history_submitted_dose2 === false &&
      patientProfileData.dose2_allocated === true ? (
        <div className="mt-8">
          <CtaTile
            headerText="Medical History - Dose 2"
            icon={faBookMedical}
            subText="Please click here to fill medical history form!"
            onClickHandle={() => {
              history.push("/patient/add-medical-history/2");
            }}
          />
        </div>
      ) : null}
      {patientProfileData.is_patient_survey_submitted === false &&
      patientProfileData.is_vaccination_card_created === true ? (
      <div className="mt-8">
        <CtaTile
          headerText="Survey Form - Dose 1"
          icon={faFileSignature}
          subText="Please click here to fill survey form!"
          onClickHandle={() => {
            history.push("/patient/add-survey-form/1");
          }}
        />
      </div>
      ) : null}
      {patientProfileData.is_patient_survey_submitted_dose2 === false &&
      patientProfileData.is_vaccination_card_created_dose2 === true ? (
        <div className="mt-8">
          <CtaTile
            headerText="Survey Form - Dose 2"
            icon={faFileSignature}
            subText="Please click here to fill survey form!"
            onClickHandle={() => {
              history.push("/patient/add-survey-form/2");
            }}
          />
        </div>
      ) : null}

      {patientProfileData.dose1_allocated &&
      !patientProfileData.has_selected_vaccine &&
      patientProfileData.is_medical_history_submitted === true ? (
        <div className="mt-8">
          <CtaTile
            headerText="Select Vaccination Slot - Dose 1"
            icon={faSyringe}
            subText="Please click here to select vaccination slot!"
            onClickHandle={() => {
              history.push("/patient/vaccination-details/select/1");
            }}
          />
        </div>
      ) : null}

      {patientProfileData.dose2_allocated &&
      !patientProfileData.has_selected_vaccine_dose2 &&
      patientProfileData.is_medical_history_submitted_dose2 === true ? (
        <div className="mt-8">
          <CtaTile
            headerText="Select Vaccination Slot - Dose 2"
            icon={faSyringe}
            subText="Please click here to select vaccination slot!"
            onClickHandle={() => {
              history.push("/patient/vaccination-details/select/2");
            }}
          />
        </div>
      ) : null}

      {patientProfileData.is_reschedule ? (
        <div className="mt-8">
          <CtaTile
            bgColor="bg-red-100"
            headerText="Vaccination Update"
            icon={faSyringe}
            subText="You have been rescheduled by the Raya Health staff. You will be informed about the vaccination details soon!"
            onClickHandle={() => {}}
            hideArrow={true}
          />
        </div>
      ) : patientProfileData.is_vaccination_card_created ? (
        <div className="mt-8">
          <CtaTile
            bgColor="bg-green-200"
            headerText="Vaccination Update"
            icon={faSyringe}
            subText="Congratulations on getting vaccinated. Please click here to view Details."
            onClickHandle={() => {
              history.push("/patient/vaccination-details/view/1");
            }}
          />
        </div>
      ) : patientProfileData.is_allocated_vaccine &&
        patientProfileData.has_selected_vaccine ? (
        <div className="mt-8">
          <CtaTile
            headerText="Vaccination Slot Details"
            icon={faSyringe}
            subText="Please click here to view vaccination details!"
            onClickHandle={() => {
              history.push("/patient/vaccination-details/view/1");
            }}
          />
        </div>
      ) : null}

      <div className="pb-4"></div>
    </MobilePagesScreenLayout>
  );
};

export default PatientDashboard;
