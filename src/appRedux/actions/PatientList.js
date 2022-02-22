import { patientListConstants } from "../constants";
import { hideLoader, showLoader } from "./Loader";
import { getPatientList, deletePatient, verifyPatient, verifyAllPatients, getPatientExportList } from "../../services";
import { showMessage } from "../../helpers/message";

export const getAdminPatientList = (paginationData, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientListConstants.GET_PATIENT_LIST_REQUEST });
    getPatientList(paginationData)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientListConstants.GET_PATIENT_LIST_SUCCESS,
          data: response.data ? response.data : [],
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientListConstants.GET_PATIENT_LIST_FAILURE,
        });
        console.log(error);
      });
  };
};

export const adminDeletePatient = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientListConstants.DELETE_PATIENT_REQUEST });
    deletePatient(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientListConstants.DELETE_PATIENT_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientListConstants.DELETE_PATIENT_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.message
            ? error.message
            : "Something went wrong!"
        );
      });
  };
};


export const adminVerifyAllPatient = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientListConstants.VERIFY_ALL_PATIENT_REQUEST });
    verifyAllPatients(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientListConstants.VERIFY_ALL_PATIENT_SUCCESS
        });
        showMessage("success", "Patient(s) verified successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientListConstants.VERIFY_ALL_PATIENT_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.message
            ? error.message
            : "Something went wrong!"
        );
      });
  };
};

export const adminVerifyVaccine = (id, data, msg, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientListConstants.VERIFY_PATIENT_REQUEST });
    verifyPatient(id, data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: patientListConstants.VERIFY_PATIENT_SUCCESS });
        if (msg === "verified") {
          showMessage("success", "Patient verified successfully!");
        } else {
          showMessage("success", "Patient rejected successfully!");
        }
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientListConstants.VERIFY_PATIENT_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.message
            ? error.message
            : "Something went wrong!"
        );
      });
  };
};

export const setPatientListRequstObj = (data) => {
  return (dispatch) => {
    dispatch({
      type: patientListConstants.SET_PATIENT_LIST_REQUEST_OBJECT,
      data,
    });
  };
};


export const getAdminPatientExportList = (onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientListConstants.GET_PATIENT_EXPORT_LIST_REQUEST });
    getPatientExportList()
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientListConstants.GET_PATIENT_EXPORT_LIST_SUCCESS
        });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientListConstants.GET_PATIENT_EXPORT_LIST_FAILURE,
        });
      });
  };
};