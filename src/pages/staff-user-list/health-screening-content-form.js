import { Button } from "antd";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignaturePad from "react-signature-canvas";
import moment from "moment";
import {
  adminGetPatientVaccinatinStatus,
  adminUpdatePatientVaccinatinStatus,
} from "../../appRedux/actions/UserList";
import { showMessage } from "../../helpers/message";

export const HealthScreeningConsentForm = ({ handleSignConsentFormCancel,vaccineDoseNumber }) => {
  const sigCanvas = useRef();
  const dispatch = useDispatch();
  const { patientVaccinationStatusId, patientVaccinationStatusDetails } =
    useSelector(({ userList }) => userList);

  const vaccineName =
    patientVaccinationStatusDetails.vaccination_details.vaccine.name;

  const [showError, setShowError] = useState(false);

  const clearCanvas = () => {
    sigCanvas.current.clear();
    setShowError(true);
  };

  const saveCanvas = () => {
    if (sigCanvas.current.isEmpty()) {
      setShowError(true);
    } else {
      setShowError(false);
      let signatureUrl = sigCanvas.current.getTrimmedCanvas().toDataURL();
      dispatch(
        adminUpdatePatientVaccinatinStatus(
          patientVaccinationStatusId,
          {
            consent_date: moment().format("YYYY-MM-DD H:mm:ss"),
            patient_signature: signatureUrl,
          },
          vaccineDoseNumber,
          () => {
            dispatch(
              adminGetPatientVaccinatinStatus(patientVaccinationStatusId,vaccineDoseNumber)
            );
            showMessage("success", "Consent Signed Successfully!");
            handleSignConsentFormCancel();
          }
        )
      );
    }
  };

  return (
    <div className="max-h-80 overflow-y-auto">
      <p className="mb-4">
        I confirm that I have been provided with the adequate information about
        the distributed {vaccineName} COVID-19 vaccine, its Emergency Used
        Authorization from the Philippine Food and Drug Administration with
        advice for healthcare workers directly exposed to COVID-19 patients and
        those with comorbidities, and the recommendations of the Interim
        National Immunization Technical Advisory Group in the absence of any
        other vaccine to provide workers in frontline health services the
        autonomy to decide to be vaccinated with this specific batch of
        distributed {vaccineName} vaccines without prejudice to immediate eligibility
        for the other vaccines. I have received sufficient information on the
        benefits and risks of COVID-19 vaccines, and I understand the possible
        risks if I am not vaccinated.
      </p>
      <p className="mb-4">
        I confirm that I have been screened for health conditions that may merit
        deferment or special precautions during vaccination as indicated in the
        Health Screening Questionnaire.
      </p>
      <p className="mb-4">
        I was provided an opportunity to ask questions, all of which were
        adequately and clearly answered. I, therefore, voluntarily release the
        Government of the Philippines, the vaccine manufacturer, their agents,
        and employees, as well as the hospital, the medical doctors and
        vaccinators, from all claims relating to the results of the use and
        administration of, or the ineffectiveness of the {vaccineName} COVID-19
        vaccine.
      </p>
      <p className="mb-4">
        I understand that while most side effects are minor and resolve on their
        own, there is a small risk of severe adverse reactions, such as, but not
        limited to allergies, and that should prompt medical attention be
        needed, referral to the nearest hospital shall be provided immediately
        by the Government of the Philippines. I have been given contact
        information for follow up for any symptoms I may experience after
        vaccination.
      </p>
      <p className="mb-4">
        I understand that in case I suffer a serious adverse event, which is
        found to be associated with the {vaccineName} COVID-19 vaccine or its
        administration, I have a right to health benefit packages under the
        Philippine Health Insurance Corporation (PhilHealth) program in case I
        experience hospitalization due to sever and/or serious adverse
        reactions.
      </p>
      <p className="mb-4">
        I authorize releasing all information needed for public health purposes
        including reporting to applicable national vaccine registries,
        consistent with personal and health information storage protocols of the
        Data Privacy Act of 2012.
      </p>
      <p className="mb-4">
        I hereby give my consent to be vaccinated with the {vaccineName} COVID-19
        Vaccine.
      </p>
      {patientVaccinationStatusDetails.vaccination_details &&
      patientVaccinationStatusDetails.vaccination_details.is_consent_signed ? (
        <div>
          <h3 className="bold text-xl mb-2">Patient Signature: </h3>
          <div className="border-2 mb-2 w-8/12 h-15">
            <img
              src={
                patientVaccinationStatusDetails.vaccination_details
                  .patient_signature_link
              }
              alt="signature"
            />
          </div>
        </div>
      ) : (
        <div>
          <h3 className="bold text-xl mb-2">
            <span className="text-red-500">*</span>Please sign below to provide
            consent:
          </h3>
          <SignaturePad
            ref={sigCanvas}
            canvasProps={{ className: "border-2 mb-2 w-8/12 h-15" }}
          />
          {showError ? (
            <p className="text-red-500 mb-4">Please sign the consent</p>
          ) : (
            <p className="mb-4"></p>
          )}
          <Button type="primary" className="mr-2" onClick={saveCanvas}>
            Submit
          </Button>
          <Button onClick={clearCanvas}>Clear</Button>
        </div>
      )}
    </div>
  );
};
