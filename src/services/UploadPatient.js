import { config } from "../appRedux/constants";
import { authHeader } from "../helpers/utils";
import { handleResponse } from "./handleResponse";

export const uploadPatient = (data) => {
  const requestOptions = {
    method: "POST",
    body: data,
    redirect: "follow",
    headers: { ...authHeader() },
  };

  return fetch(`${config.API_URL}/patients/`, requestOptions).then(
    handleResponse
  );
};

export const getUploadedPatientData = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader() },
  };

  return fetch(`${config.API_URL}/patients/`, requestOptions).then(
    handleResponse
  );
};
