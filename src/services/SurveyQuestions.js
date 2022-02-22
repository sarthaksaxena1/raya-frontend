import { config } from "../appRedux/constants";
import { handleResponse } from "./handleResponse";
import { authHeader } from "../helpers/utils";

export const getSurveyQuestions = (dose_no, paginationData) => {
  let apiUrl =
    !paginationData.page && !paginationData.limit
      ? `patients/questions?type=survey&dose_no=${dose_no}`
      : `patients/questions?type=survey&dose_no=${dose_no}&page=${paginationData.page}&limit=${paginationData.limit}`;
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${config.API_URL}/${apiUrl}`, requestOptions).then(
    handleResponse
  );
};

export const getSurveyData = (dose_no, id) => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    id
      ? `${config.API_URL}/patients/${id}/patient_survey/${dose_no}`
      : `${config.API_URL}/patients/patient_survey`,
    requestOptions
  ).then(handleResponse);
};

export const postSurveyAnswers = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/patients/patient_survey`,
    requestOptions
  ).then(handleResponse);
};
