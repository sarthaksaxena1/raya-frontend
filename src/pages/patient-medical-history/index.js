import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
import { Col, Row, Divider } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientMedicalHistory,
  getPatientMedicalHistoryQuestions,
} from "../../appRedux/actions/MedicalHistory";
import { find } from "lodash";

const PatientMedicalHistory = ({match}) => {
  const { medicalHistoryData, medicalQuestions } = useSelector(
    ({ medicalHistory }) => medicalHistory
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPatientMedicalHistoryQuestions(match.params.dose_number, { page: 1, limit: 50 }, () => {
        dispatch(getPatientMedicalHistory(match.params.dose_number));
      })
    );
  }, []);

  const setMedicalHistoryData = () => {
    return medicalHistoryData.medical_data
      ? medicalHistoryData.medical_data.map((value) => ({
          question: find(medicalQuestions.data, {
            id: Number(value.question_id),
          }).name,
          questionTags: find(medicalQuestions.data, {
            id: Number(value.question_id),
          }).question_tags,
          answer: value.answer,
          symptoms: value.symptoms,
          remarks: value.remarks,
          date: value.date,
        }))
      : [];
  };

  return (
    <MobilePagesScreenLayout
      pageTitle="Medical History"
      userIcon={false}
      showRayaLogo={false}
    >
      <div className="min-w-full mb-4">
        {setMedicalHistoryData().map((val, index) => (
          <>
            <Row key={index} className="mb-5">
              <Col xs={18}>
                <p className=" text-xl font-semi-bold">
                  {index + 1}. {val.question}
                </p>
                {val.symptoms && val.symptoms.length > 0 ? (
                  <ul className="list-disc ml-8 mt-2">
                    {Array.isArray(val.symptoms) ? (
                      val.symptoms.map((value, index) => (
                        <li key={index} className="text-lg break-words">
                          {value}
                        </li>
                      ))
                    ) : (
                      <li className="text-lg font-semi-bold">{val.symptoms}</li>
                    )}
                  </ul>
                ) : val.questionTags ? (
                  <ul className="list-disc ml-8 mt-2">
                    {val.questionTags.map((value, index) => (
                      <li key={index} className="text-lg break-words">
                        {value}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {val.date ? (
                  <ul className="list-disc ml-8 mt-2">
                    <li className="text-lg break-words">Date : {val.date}</li>
                  </ul>
                ) : null}
                {val.remarks ? (
                  <ul className="list-disc ml-8 mt-2">
                    <li className="text-lg break-words">Remarks : {val.remarks}</li>
                  </ul>
                ) : null}
              </Col>
              <Col xs={6} className="text-right ">
                <span className="text-xl font-light">{val.answer}</span>
              </Col>
            </Row>
            <Divider />
          </>
        ))}
      </div>
    </MobilePagesScreenLayout>
  );
};

export default PatientMedicalHistory;
