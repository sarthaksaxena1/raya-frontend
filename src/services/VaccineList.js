import { config } from "../appRedux/constants";
import { handleResponse } from "./handleResponse";
import { authHeader, getSortFilterAPIBody } from "../helpers/utils";

export const getVaccineList = (paginationData) => {
  let apiUrl =
    !paginationData.page && !paginationData.limit
      ? "vaccines/list"
      : `vaccines/list?page=${paginationData.page}&limit=${paginationData.limit}`;
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(getSortFilterAPIBody(paginationData)),
  };

  return fetch(`${config.API_URL}/${apiUrl}`, requestOptions).then(
    handleResponse
  );
};

export const getVaccineDetails = (id) => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${config.API_URL}/vaccines/${id}`, requestOptions).then(
    handleResponse
  );
};

export const editVaccine = (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.API_URL}/vaccines/${id}`, requestOptions).then(
    handleResponse
  );
};

export const deleteVaccine = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${config.API_URL}/vaccines/${id}`, requestOptions).then(
    handleResponse
  );
};

export const addVaccine = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.API_URL}/vaccines/`, requestOptions).then(
    handleResponse
  );
};

export const getVaccineExportList = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/list`,
    requestOptions
  ).then(handleResponse);
};
