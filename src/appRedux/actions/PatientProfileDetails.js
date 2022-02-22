import { patientProfileConstants } from "../constants";
import { hideLoader, showLoader } from "./Loader";
import {
  getPatientProfile,
  editProfile,
  getPatientCeir,
  editCeir,
  addCeir,
  getPatientDetailsQr
} from "../../services";
import { showMessage } from "../../helpers/message";

export const getPatientProfileDetails = (onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientProfileConstants.GET_PATIENT_PROFILE_REQUEST });
    getPatientProfile()
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientProfileConstants.GET_PATIENT_PROFILE_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientProfileConstants.GET_PATIENT_PROFILE_FAILURE,
        });
        console.log(error);
      });
  };
};

export const editPatientProfile = (id, data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientProfileConstants.EDIT_PATIENT_DETAILS_REQUEST });
    editProfile(id, data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientProfileConstants.EDIT_PATIENT_DETAILS_SUCCESS,
        });
        showMessage("success", "Profile edited succcessfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientProfileConstants.EDIT_PATIENT_DETAILS_FAILURE,
        });
        showMessage("error", error.toString());
      });
  };
};

export const getPatientCeirDetails = (onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientProfileConstants.GET_PATIENT_CEIR_REQUEST });
    getPatientCeir()
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientProfileConstants.GET_PATIENT_CEIR_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientProfileConstants.GET_PATIENT_CEIR_FAILURE,
        });
        console.log(error);
      });
  };
};

export const patientEditCeir = (id, data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientProfileConstants.EDIT_PATIENT_CEIR_REQUEST });
    editCeir(id, data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: patientProfileConstants.EDIT_PATIENT_CEIR_SUCCESS });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: patientProfileConstants.EDIT_PATIENT_CEIR_FAILURE });
      });
  };
};

export const patientAddCeir = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientProfileConstants.ADD_PATIENT_CEIR_REQUEST });
    addCeir(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: patientProfileConstants.ADD_PATIENT_CEIR_SUCCESS });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: patientProfileConstants.ADD_PATIENT_CEIR_FAILURE });
      });
  };
};

export const resetProfileForm = () => {
  return (dispatch) => {
    dispatch({ type: patientProfileConstants.RESET_PROFILE_FORM });
  };
};

export const getPatientsDetailViaQrScan = (id) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: patientProfileConstants.GET_PATIENT_DETAILS_QRSCAN_REQUEST });
    getPatientDetailsQr(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientProfileConstants.GET_PATIENT_DETAILS_QRSCAN_SUCCESS,
          data: response.data ? response.data : {},
        });
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientProfileConstants.GET_PATIENT_DETAILS_QRSCAN_FAILURE,
        });
        console.log(error);
      });
  };
};



export const setCeirFormData = (data) => {
  return (dispatch) => {
    dispatch({
      type: patientProfileConstants.SET_CEIR_FEILDS_REQUEST_OBJECT,
      data,
    });
  };
};
