import { config } from "../appRedux/constants";
import { handleFileResponse, handleResponse } from "./handleResponse";
import { authHeader } from "../helpers/utils";

export const getMedicalHistoryQuestions = (dose_no, paginationData) => {
  let apiUrl =
    !paginationData.page && !paginationData.limit
      ? `patients/questions?type=medical_history&dose_no=${dose_no}`
      : `patients/questions?type=medical_history&dose_no=${dose_no}&page=${paginationData.page}&limit=${paginationData.limit}`;
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${config.API_URL}/${apiUrl}`, requestOptions).then(
    handleResponse
  );
};

export const getMedicalHistory = (dose_no, id) => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  console.log(id);

  return fetch(
    id
      ? `${config.API_URL}/patients/${id}/medical_history/${dose_no}`
      : `${config.API_URL}/patients/medical_history`,
    requestOptions
  ).then(handleResponse);
};

export const postMedicalHistory = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/patients/medical_history`,
    requestOptions
  ).then(handleResponse);
};

export const updateMedicalHistory = (id, data,dose_no) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/patients/${id}/medical_history/${dose_no}`,
    requestOptions
  ).then(handleResponse);
};

export const downloadMedicalHistory = (id) => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/patients/${id}/download_medical_history`,
    requestOptions
  ).then(handleFileResponse);
};
