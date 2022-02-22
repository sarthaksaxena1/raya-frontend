import { config } from "../appRedux/constants";
import { authHeader, getSortFilterAPIBody } from "../helpers/utils";
import { handleResponse } from "./handleResponse";

export const getLocationList = (paginationData) => {
  let apiUrl =
    !paginationData.page && !paginationData.limit
      ? "vaccines/vaccination_center/list"
      : `vaccines/vaccination_center/list?page=${paginationData.page}&limit=${paginationData.limit}`;
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(getSortFilterAPIBody(paginationData)),
  };

  return fetch(`${config.API_URL}/${apiUrl}`, requestOptions).then(
    handleResponse
  );
};

export const getLocationDetails = (id) => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_center/${id}`,
    requestOptions
  ).then(handleResponse);
};

export const editLocation = (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_center/${id}`,
    requestOptions
  ).then(handleResponse);
};

export const addLocation = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_center`,
    requestOptions
  ).then(handleResponse);
};

export const deleteLocation = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_center/${id}`,
    requestOptions
  ).then(handleResponse);
};


export const getVaccineLocationExportList = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_center/list`,
    requestOptions
  ).then(handleResponse);
};