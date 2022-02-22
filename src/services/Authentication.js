import { config } from "../appRedux/constants";
import { authHeader } from "../helpers/utils";
import { handleResponse } from "./handleResponse";

export const login = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.API_URL}/login`, requestOptions).then(handleResponse);
};

export const register = (data) => {
  const requestOptions = {
    method: "POST",
    body: data,
    redirect: "follow",
  };

  return fetch(`${config.API_URL}/registration`, requestOptions).then(
    handleResponse
  );
};

export const resetPassord = (data) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.API_URL}/forgot-password`, requestOptions).then(
    handleResponse
  );
};

export const changePassword = (data) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${config.API_URL}/change-password`, requestOptions).then(
    handleResponse
  );
};

export const logout = () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeader() },
  };

  return fetch(`${config.API_URL}/logout`, requestOptions).then(handleResponse);
};

export const getCurrentVersion = () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${config.API_URL}/get_version`, requestOptions).then(
    handleResponse
  );
};
