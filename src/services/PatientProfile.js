import { config } from "../appRedux/constants";
import { authHeader } from "../helpers/utils";
import { handleResponse } from "./handleResponse";

export const getPatientProfile = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${config.API_URL}/patients/get`, requestOptions).then(
    handleResponse
  );
};

export const editProfile = (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.API_URL}/patients/${id}`, requestOptions).then(
    handleResponse
  );
};

export const getPatientCeir = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${config.API_URL}/patients/ceir`, requestOptions).then(
    handleResponse
  );
};

export const editCeir = (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader() },
    body: data,
    redirect: "follow",
  };

  return fetch(`${config.API_URL}/patients/ceir/${id}`, requestOptions).then(
    handleResponse
  );
};

export const addCeir = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader() },
    body: data,
    redirect: "follow",
  };

  return fetch(`${config.API_URL}/patients/ceir`, requestOptions).then(
    handleResponse
  );
};

export const getPatientDetailsQr = (id) => {
  const requestOptions = {
    method: "GET",
    headers: {"Content-Type": "application/json" },
  };

  return fetch(`${config.API_URL}/patients/details/${id}`, requestOptions).then(
    handleResponse
  );
};

