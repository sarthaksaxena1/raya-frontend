import { config } from "../appRedux/constants";
import { authHeader, getSortFilterAPIBody } from "../helpers/utils";
import { handleResponse } from "./handleResponse";

export const getPatientList = (paginationData) => {
  let apiUrl =
    !paginationData.page && !paginationData.limit
      ? "patients/ceir/all"
      : "patients/ceir/all" +
        `?page=${paginationData.page}&limit=${paginationData.limit}`;

  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(getSortFilterAPIBody(paginationData)),
  };

  return fetch(`${config.API_URL}/` + apiUrl, requestOptions).then(
    handleResponse
  );
};


export const deletePatient = (data) => {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.API_URL}/patients/ceir/delete`, requestOptions).then(
    handleResponse
  );
};


export const verifyPatient = (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.API_URL}/patients/ceir/${id}`, requestOptions).then(
    handleResponse
  );
};


export const verifyAllPatients = (data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.API_URL}/patients/ceir/verify`, requestOptions).then(
    handleResponse
  );
};


export const getPatientExportList = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/patients/ceir/all`,
    requestOptions
  ).then(handleResponse);
};