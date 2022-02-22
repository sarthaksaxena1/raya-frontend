import { config } from "../appRedux/constants";
import { handleResponse } from "./handleResponse";
import { authHeader, getSortFilterAPIBody } from "../helpers/utils";

export const getUserList = (paginationData) => {
  let apiUrl =
    !paginationData.page && !paginationData.limit
      ? "patients/list"
      : `patients/list?page=${paginationData.page}&limit=${paginationData.limit}`;
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(getSortFilterAPIBody(paginationData)),
  };

  return fetch(`${config.API_URL}/${apiUrl}`, requestOptions).then(
    handleResponse
  );
};

export const assignSlots = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/vaccines/assigned_vaccination_slot`,
    requestOptions
  ).then(handleResponse);
};

export const updatePatientVaccinationStatus = (id, data,dose_no) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/patients/${id}/vaccination_details/${dose_no}`,
    requestOptions
  ).then(handleResponse);
};

export const getPatientVaccinationStatusDetails = (id, dose_number) => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/patients/${id}/vaccination_details/${dose_number}`,
    requestOptions
  ).then(handleResponse);
};

export const getUserExportList = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${config.API_URL}/patients/list`, requestOptions).then(
    handleResponse
  );
};

export const getVaccinatorList = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${config.API_URL}/vaccines/vaccinator`, requestOptions).then(
    handleResponse
  );
};

export const getVaccinatorDetailsList = (paginationData) => {
  let apiUrl =
    !paginationData.page && !paginationData.limit
      ? "vaccines/vaccinator/list"
      : `vaccines/vaccinator/list?page=${paginationData.page}&limit=${paginationData.limit}`;
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(getSortFilterAPIBody(paginationData)),
  };

  return fetch(`${config.API_URL}/${apiUrl}`, requestOptions).then(
    handleResponse
  );
};

export const addVaccinator = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${config.API_URL}/vaccines/vaccinator`, requestOptions).then(
    handleResponse
  );
};

export const editSingleVaccinator = (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccinator/${id}`,
    requestOptions
  ).then(handleResponse);
};

export const getSingleVaccinatorDetails = (id) => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccinator/${id}`,
    requestOptions
  ).then(handleResponse);
};

export const deleteSingleVaccinator = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccinator/${id}`,
    requestOptions
  ).then(handleResponse);
};
