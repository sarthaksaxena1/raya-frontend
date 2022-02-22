import { React, useState } from "react";
import { Form, Button, Radio, Select, Input, DatePicker } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPaientMedicalHistory,
  getPatientMedicalHistoryQuestions,
  setMedicalFormData,
} from "../../appRedux/actions/MedicalHistory";
import { showMessage } from "../../helpers/message";
import { Link, useHistory } from "react-router-dom";
import { getPatientProfileDetails } from "../../appRedux/actions/PatientProfileDetails";
import moment from "moment";
import RegisterationLayout from "../../layouts/hybrid/registeration-layout";
import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
import {
  setSignUpFeildsData,
  userRegister,
} from "../../appRedux/actions/Authentication";

const { Option } = Select;

export const AddMedicalHistoryRegistration = ({ match }) => {
  const getSignupFeildsData = useSelector(
    (state) => state.authentication.signupFeildsData
  );
  const getMedicalFeildsData = useSelector(
    (state) => state.medicalHistory.medicalFeildsData
  );
  const isLoaded = useSelector((state) => state.medicalHistory.isLoaded);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { medicalQuestions } = useSelector(
    ({ medicalHistory }) => medicalHistory
  );
  const { patientProfileData } = useSelector(
    ({ patientProfile }) => patientProfile
  );

  useEffect(() => {
    form.setFieldsValue({ ...getMedicalFeildsData });
  }, [isLoaded]);

  useEffect(() => {
    dispatch(
      getPatientMedicalHistoryQuestions(match.params.dose_number, { page: 1, limit: 50 }, () => {
        getPatientProfileDetails();
      })
    );
  }, []);

  const onValuesChange = () => {
    const fieldsData = form.getFieldsValue();
    for (let key in fieldsData) {
      if (key.includes("question") && fieldsData[key] === "No") {
        form.setFieldsValue({
          ["symptoms_" + key.split("_")[1]]: [],
          ["other_symptoms_" + key.split("_")[1]]: null,
          ["date_" + key.split("_")[1]]: null,
          ["remarks_" + key.split("_")[1]]: null,
        });
      }
    }
    dispatch(setMedicalFormData(fieldsData));
  };

  const displayQuestions = () => {
    if (medicalQuestions.data && medicalQuestions.data.length > 0) {
      return medicalQuestions.data
        .filter((value) => value.is_active)
        .map((questions, index) => {
          const { id, name, question_tags, tags_settings } = questions;

          const {
            is_gender_specific,
            tag_type,
            option_type,
            show_tags,
            date_question,
            show_date,
            show_remarks,
            remarks_question,
          } = tags_settings;
          return (
            <div key={index}>
              {
                <div className="mb-4" key={id}>
                  <p className="text-lg">
                    {index + 1}. {name}
                  </p>

                  {question_tags && show_tags ? (
                    <ul className="list-disc ml-8">
                      {question_tags.map((value, index) => (
                        <li key={index} className="text-lg">
                          {value}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <Form.Item
                    name={"question_" + id}
                    initialValue={
                      getSignupFeildsData.gender === "Male" &&
                      is_gender_specific
                        ? "No"
                        : null
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please select either yes or no",
                      },
                    ]}
                    className="mb-0"
                  >
                    <Radio.Group
                      className="mt-2"
                      optionType="button"
                      buttonStyle="solid"
                      disabled={
                        getSignupFeildsData.gender === "Male" &&
                        is_gender_specific
                      }
                    >
                      <Radio.Button value="Yes">Yes</Radio.Button>
                      <Radio.Button value="No">No</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  {question_tags.length > 0 &&
                  getMedicalFeildsData["question_" + id] === "Yes" ? (
                    <Form.Item
                      name={"symptoms_" + id}
                      className="mt-2"
                      label={
                        tag_type === "symptoms"
                          ? "Select your symptoms"
                          : "Select your options"
                      }
                      rules={[
                        {
                          required: true,
                          message:
                            tag_type === "symptoms"
                              ? "Please select your symptoms"
                              : "Please select your options",
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        className="medical-history-selector"
                        mode={option_type === "single" ? "" : "multiple"}
                      >
                        {question_tags.map((value) => (
                          <Option
                            className="medical-history-select"
                            value={value}
                          >
                            {value}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  ) : null}
                  {getMedicalFeildsData["question_" + id] === "Yes" &&
                  show_date ? (
                    <Form.Item
                      name={"date_" + id}
                      className="mt-2"
                      label={date_question}
                      rules={[
                        {
                          required: true,
                          message: { date_question },
                        },
                      ]}
                    >
                      <DatePicker
                        disabledDate={(current) => {
                          return (
                            current > moment().startOf("day") ||
                            current <
                              moment().subtract(30, "days").startOf("day")
                          );
                        }}
                        placeholder="Select Date"
                      />
                    </Form.Item>
                  ) : null}
                  {getMedicalFeildsData["question_" + id] === "Yes" &&
                  show_remarks ? (
                    <Form.Item
                      name={"remarks_" + id}
                      className="mt-2"
                      label={remarks_question}
                      rules={[
                        {
                          required: true,
                          message: { remarks_question },
                        },
                        { max: 200, message: "Maximum 200 characters allowed" },
                      ]}
                    >
                      <Input placeholder={remarks_question} className="h-12" />
                    </Form.Item>
                  ) : null}
                  {getMedicalFeildsData["question_" + id] === "Yes" &&
                  getMedicalFeildsData["symptoms_" + id] === "Others" ? (
                    <Form.Item
                      name={"other_symptoms_" + id}
                      className="mt-2"
                      label="Enter your comorbidity"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your comorbidity",
                        },
                        { max: 30, message: "Maximum 30 characters allowed" },
                      ]}
                    >
                      <Input
                        placeholder="Enter your comorbidity"
                        className="h-12"
                      />
                    </Form.Item>
                  ) : null}
                </div>
              }
            </div>
          );
        });
    }
    return null;
  };

  const onFinish = (values) => {
    

    let medicalHistoryAnswers = [];
    for (let key in values) {
      if (key.includes("question")) {
        medicalHistoryAnswers.push({
          question_id: key.split("_")[1],
          answer: values["question_" + key.split("_")[1]],
          remarks: values["remarks_" + key.split("_")[1]]
            ? values["remarks_" + key.split("_")[1]]
            : "",
          date: values["date_" + key.split("_")[1]]
            ? moment(values["date_" + key.split("_")[1]]).format("DD-MM-YYYY")
            : "",
          symptoms: values["symptoms_" + key.split("_")[1]]
            ? values["symptoms_" + key.split("_")[1]] === "Others"
              ? [values["other_symptoms_" + key.split("_")[1]]]
              : values["symptoms_" + key.split("_")[1]]
            : [],
        });
      }
    }

    const fieldsData = form.getFieldsValue();
    for (let key in fieldsData) {
      if (key.includes("question") && fieldsData[key] === "No") {
        form.setFieldsValue({
          ["symptoms_" + key.split("_")[1]]: [],
          ["other_symptoms_" + key.split("_")[1]]: null,
          ["date_" + key.split("_")[1]]: null,
          ["remarks_" + key.split("_")[1]]: null,
        });
      }
    }
    dispatch(setMedicalFormData(fieldsData));

      // dispatch(setMedicalFormData(medicalHistoryAnswers));
    history.push("/patient/ceir-registration/add");

    

    // dispatch(setSignUpFeildsData({}));
    // dispatch(setMedicalFormData({}));
  };

  const resetFormFeilds = () => {
    dispatch(setSignUpFeildsData({}));
    dispatch(setMedicalFormData({}));
    history.push("/login");
  };

  return (
    <>
      <RegisterationLayout>
        <h3 className="text-center mt-8 mb-4">Fill up Medical history</h3>
        <Form
          name="medical-history"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          onFinishFailed={() =>
            showMessage(
              "error",
              "You may have missed answers for few fields. Please recheck and Submit!"
            )
          }
        >
          {displayQuestions()}
          {medicalQuestions.data && medicalQuestions.data.length > 0 ? (
            <>
              <Form.Item className="mb-4 mt-8">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 text-xl rounded-md"
                >
                  Next
                </Button>
              </Form.Item>
              <Link className="text-lg text-blue-500 " to="/signup">
                Go Back
              </Link>
              <p className="text-lg text-gray-900">
                Have an account?
                <button
                  type="link"
                  className="text-lg text-blue-500 pl-2"
                  to="/login"
                  onClick={() => resetFormFeilds()}
                >
                  Login
                </button>
              </p>
            </>
          ) : null}
        </Form>
      </RegisterationLayout>
    </>
  );
};
