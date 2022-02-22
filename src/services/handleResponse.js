import { showMessage } from "../helpers/message";

export const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 400) {
        return Promise.reject(data);
      }
      if (response.status === 401) {
        if (response.url && response.url.indexOf("/api/v1/login") > 0) {
          return Promise.reject(data);
        } else {
          // auto logout if 401 response returned from api
          localStorage.removeItem("user");
          window.location.reload();
          showMessage("info", "Session timeout!");
        }
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

export function handleFileResponse(response) {
  return response.blob().then((blob) => {
    const file = blob;
    if (!response.ok) {
      if (response.status === 400) {
        return Promise.reject(file);
      }
      const error = response;
      return Promise.reject(error);
    }
    return file;
  });
}
