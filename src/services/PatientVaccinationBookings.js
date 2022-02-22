import { config } from "../appRedux/constants";
import { handleResponse } from "./handleResponse";
import { authHeader } from "../helpers/utils";

export const getVaccinationBookingDetails = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/patients/booking_details`,
    requestOptions
  ).then(handleResponse);
};

export const getAllotedVaccinationDetails = (dose_number) => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/patients/vaccination_details/${dose_number}`,
    requestOptions
  ).then(handleResponse);
};

export const getAllotedVaccinationTimeSlotsDetails = (dose_number) => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    `${config.API_URL}/patients/date_slot_details/${dose_number}`,
    requestOptions
  ).then(handleResponse);
};

export const bookVaccinationTimeSlot = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/patients/book_time_slot`,
    requestOptions
  ).then(handleResponse);
};

export const setPreferredVaccinationLocation = (id,data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(
    `${config.API_URL}/patients/${id}`,
    requestOptions
  ).then(handleResponse);
};
