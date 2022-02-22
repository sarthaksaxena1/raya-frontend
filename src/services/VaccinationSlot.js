import { isEmpty } from "lodash";
import { config } from "../appRedux/constants";
import { authHeader } from "../helpers/utils";
import { handleResponse } from "./handleResponse";

export const getVaccinationSlotList = (paginationData, filterParams) => {
  let apiUrl = isEmpty(paginationData)
    ? "vaccines/vaccination_slot/get_all"
    : `vaccines/vaccination_slot/get_all?page=${paginationData.page}&limit=${paginationData.limit}`;
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(filterParams),
  };

  return fetch(`${config.API_URL}/${apiUrl}`, requestOptions).then(
    handleResponse
  );
};

export const getVaccinationTimeSlotList = (id) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_slot/${id}/time_slots/all`,
    requestOptions
  ).then(handleResponse);
};

export const addVaccinationSlot = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_slot`,
    requestOptions
  ).then(handleResponse);
};

export const getVaccinationSlot = (id) => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_slot/${id}`,
    requestOptions
  ).then(handleResponse);
};

export const editVaccinationSlot = (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_slot/${id}`,
    requestOptions
  ).then(handleResponse);
};

export const deleteVaccinationSlot = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_slot/${id}`,
    requestOptions
  ).then(handleResponse);
};

export const deleteVaccinationTimeSlot = (dateSlotId, timeSlotId) => {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_slot/${dateSlotId}/time_slots/${timeSlotId}`,
    requestOptions
  ).then(handleResponse);
};

export const addVaccinationTimeSlot = (id, data) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_slot/${id}/time_slots`,
    requestOptions
  ).then(handleResponse);
};

export const editVaccinationTimeSlot = (dateSlotId, timeSlotId, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_slot/${dateSlotId}/time_slots/${timeSlotId}`,
    requestOptions
  ).then(handleResponse);
};

export const getVaccinationSlotExportList = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/vaccines/vaccination_slot/get_all`,
    requestOptions
  ).then(handleResponse);
};
