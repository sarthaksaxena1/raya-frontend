import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Divider } from "antd";
import useWindowDimensions from "../../helpers/window-dimensions";
import { find } from "lodash";

export const SurveyDetails = () => {
  const { height, width } = useWindowDimensions();

  const { surveyQuestions, surveyData } = useSelector(
    ({ surveyQuestions }) => surveyQuestions
  );

  const surveyAnswersData = surveyData.survey_data
    ? surveyData.survey_data.map((value) => ({
        question: find(surveyQuestions.data, {
          id: Number(value.question_id),
        })?.name,
        question_group: find(surveyQuestions.data, {
          id: Number(value.question_id),
        })?.tags_settings.question_group,
        answer: value.answer,
      }))
    : [];

  const finalQuestionData = [];
  surveyAnswersData.map((question) => {
    if (question.question_group != "") {
      if (
        finalQuestionData[question.question_group] == undefined ||
        finalQuestionData[question.question_group] == null
      ) {
        finalQuestionData[question.question_group] = [];
      }
      finalQuestionData[question.question_group].push(question);
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

  console.log(finalQuestionData);

  const displaySurveyData = () => {
    return Object.entries(finalQuestionData).map((questions) => {
      return (
        <>
          <p className="font-bold text-lg mb-4">
            {questions[0] != "Overall Experience" ? questions[0] : ""}
          </p>
          {questions[1].map((question) => {
            return (
              <>
                {questions[0] === "Overall Experience" ? <Divider /> : null}
                <Row className="mb-4">
                  <Col xs={16}>
                    <span className=" text-lg font-semi-bold break-all">
                      {question.question}
                    </span>
                  </Col>
                  <Col xs={4}></Col>
                  <Col xs={4}>
                    <span className=" text-lg font-semi-bold ">
                      {question.answer === 5 ? (
                        <span>Highly agree</span>
                      ) : question.answer === 4 ? (
                        <span>Agree</span>
                      ) : question.answer === 3 ? (
                        <span>Neutral</span>
                      ) : question.answer === 2 ? (
                        <span> Disagree</span>
                      ) : question.answer === 1 ? (
                        <span>Highly Disagree</span>
                      ) : (
                        <span>{question.answer}</span>
                      )}
                    </span>
                  </Col>
                </Row>
                <Divider />
              </>
            );
          })}
        </>
      );
    });
  };

  return (
    <>
      <div style={{ height: height - 200, overflowY: "auto" }}>
        {displaySurveyData()}
      </div>
    </>
  );
};
