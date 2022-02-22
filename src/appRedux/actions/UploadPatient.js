import { uploadPatientConstants } from "../constants";
import { hideLoader, showLoader } from "./Loader";
import { getUploadedPatientData, uploadPatient } from "../../services";
import { showMessage } from "../../helpers/message";

export const adminUploadPatient = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: uploadPatientConstants.UPLOAD_PATIENT_REQUEST });
    uploadPatient(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: uploadPatientConstants.UPLOAD_PATIENT_SUCCESS });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: uploadPatientConstants.UPLOAD_PATIENT_FAILURE });
        showMessage("error", error.message || "Invalid Request");
      });
  };
};

export const getAdminUploadedPatientData = (onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: uploadPatientConstants.GET_UPLOAD_PATIENT_DATA_REQUEST });
    getUploadedPatientData()
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: uploadPatientConstants.GET_UPLOAD_PATIENT_DATA_SUCCESS,
        });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: uploadPatientConstants.GET_UPLOAD_PATIENT_DATA_FAILURE,
        });
        showMessage("error", error.message || "Something went wrong!");
      });
  };
};
