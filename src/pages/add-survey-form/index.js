import { React, useState } from "react";
import { Form, Button, Rate, Slider, Divider } from "antd";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../helpers/message";
import {
  getPatientSurveyQuestions,
  addPatientSurvey,
} from "../../appRedux/actions/SurveyForm";
import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
export const SurveyForm = ({ match }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { surveyQuestions } = useSelector(
    ({ surveyQuestions }) => surveyQuestions
  );
  useEffect(() => {
    dispatch(
      getPatientSurveyQuestions(match.params.dose_number, {
        page: 1,
        limit: 50,
      })
    );
  }, []);

  const finalQuestionData = [];
  surveyQuestions.data?.map((question) => {
    if (question.tags_settings.question_group != "") {
      if (
        finalQuestionData[question.tags_settings.question_group] == undefined ||
        finalQuestionData[question.tags_settings.question_group] == null
      ) {
        finalQuestionData[question.tags_settings.question_group] = [];
      }
      finalQuestionData[question.tags_settings.question_group].push(question);
    } else {
      if (
        finalQuestionData["Overall Experience"] == undefined ||
        finalQuestionData["Overall Experience"] == null
      ) {
        finalQuestionData["Overall Experience"] = [];
      }
      finalQuestionData["Overall Experience"].push(question);
    }
  });

  const displaySurveyQuestions = () => {
    return Object.entries(finalQuestionData).map((questions) => {
      return (
        <>
          {questions[0] != "Vaccination Site" ? (
            <>
              <Divider />
              <p className="font-bold text-lg mb-4 mt-8">
                {questions[0] != "Overall Experience" ? questions[0] : ""}
              </p>
            </>
          ) : (
            <p className="font-bold text-lg mb-4">
              {questions[0] != "Overall Experience" ? questions[0] : ""}
            </p>
          )}
          {/* {questions[0] != "Overall Experience" ? questions[0] : ""} */}

          {questions[1].map((question) => {
            return (
              <>
                {/* {questions[0] === "Overall Experience" ? <Divider /> : null} */}
                <div className="mb-4" key={question.id}>
                  <p className="text-lg">{question.name}</p>
                  <Form.Item
                    name={"question_" + question.id}
                    rules={[
                      { required: true, message: "Please rate this question" },
                    ]}
                    className="mb-0"
                  >
                    {questions[0] != "Overall Experience" ? (
                      <Rate />
                    ) : (
                      <Slider
                        tooltipVisible={false}
                        step={10}
                        marks={{
                          0: "0",
                          10: "1",
                          20: "2",
                          30: "3",
                          40: "4",
                          50: "5",
                          60: "6",
                          70: "7",
                          80: "8",
                          90: "9",
                          100: "10",
                        }}
                      />
                    )}
                  </Form.Item>
                </div>
              </>
            );
          })}
        </>
      );
    });
  };
  const onFinish = (values) => {
    const last_key = Object.keys(values)[Object.keys(values).length - 1];
    values[last_key] = values[last_key] / 10;

    let surveyQuestionAnswers = [];
    for (let key in values) {
      surveyQuestionAnswers.push({
        question_id: key.split("_")[1],
        answer: values[key],
      });
    }
    const postData = {
      survey_data: surveyQuestionAnswers,
      dose_number: match.params.dose_number,
    };
    dispatch(
      addPatientSurvey(postData, () => {
        form.resetFields();
        showMessage("success", "Survey recorded!");
        history.push("/patient/dashboard");
      })
    );
  };
  return (
    <MobilePagesScreenLayout
      pageTitle="Survey Form"
      userIcon={false}
      showRayaLogo={false}
    >
      <Form
        className="pt-8"
        name="medical-history"
        form={form}
        onFinish={onFinish}
      >
        {displaySurveyQuestions()}
        {surveyQuestions.data && surveyQuestions.data.length > 0 ? (
          <Form.Item className="mb-4 mt-8">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 text-xl rounded-md"
            >
              Submit
            </Button>
          </Form.Item>
        ) : null}
      </Form>
      <Divider />
      <p className="text-lg mb-4 mt-8">
        Adverse effects are expected from any vaccination.
      </p>
      <p className="text-lg mb-4 mt-8">
        Mild side effects are:
        1. Redness, swelling and pain on the vaccinated arm
        2. fever and chills
        3. fatigue and body pain
        4. headache and nausea
      </p>
      <p className="text-lg mb-4 mt-8">
        This usually lasts for 3-7 days. Please rest, hydrate and take 500 mg of paracetamol every 4 hours to address the symptoms.
      </p>
      <p className="text-lg mb-4 mt-8">
        Please email aefi@rayapreventive.com to report mild side effects.
      </p>
      <p className="text-lg mb-4 mt-8">
        Severe adverse effects usually occur within 30 minutes of exposure to any allergen, not just to vaccines. May sometimes appear up to <strong>4 hours post vaccination</strong>. Adverse effects are
        1.	swelling of the face
        2.	wheezing
        3.	difficulty in breathing and hives. 
      </p>
      <p className="text-lg mb-4 mt-8">
        If this occurs, please proceed to the nearest hospital. In case of Serious Adverse Effects from Immunization, patient has the right to health benefit packages under the Philippine Health Insurance Corporation
      </p>
    </MobilePagesScreenLayout>
  );
};
