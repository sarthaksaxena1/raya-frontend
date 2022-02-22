import { medicalHistoryConstants } from "../constants";
import { hideLoader, showLoader } from "./Loader";
import {
  downloadMedicalHistory,
  getMedicalHistory,
  getMedicalHistoryQuestions,
  postMedicalHistory,
  updateMedicalHistory,
} from "../../services";
import { showMessage } from "../../helpers/message";
import { saveAs } from "file-saver";

export const getPatientMedicalHistoryQuestions = (
  dose_no,
  paginationData,
  onSuccess
) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: medicalHistoryConstants.GET_MEDICAL_HISTORY_QUESTIONS_REQUEST,
    });
    getMedicalHistoryQuestions(dose_no, paginationData)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: medicalHistoryConstants.GET_MEDICAL_HISTORY_QUESTIONS_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: medicalHistoryConstants.GET_MEDICAL_HISTORY_QUESTIONS_FAILURE,
        });
      });
  };
};

export const getPatientMedicalHistory = (dose_no, id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: medicalHistoryConstants.GET_MEDICAL_HISTORY_REQUEST,
    });
    getMedicalHistory(dose_no, id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: medicalHistoryConstants.GET_MEDICAL_HISTORY_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: medicalHistoryConstants.GET_MEDICAL_HISTORY_FAILURE,
        });
        if (!!error.message) {
          showMessage("error", error.message);
        }
      });
  };
};

export const addPaientMedicalHistory = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: medicalHistoryConstants.POST_MEDICAL_HISTORY_REQUEST,
    });
    postMedicalHistory(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: medicalHistoryConstants.POST_MEDICAL_HISTORY_SUCCESS,
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: medicalHistoryConstants.POST_MEDICAL_HISTORY_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.data.medical_data
            ? error.data.medical_data
            : error.message
            ? error.message
            : "Something went wrong please try again!"
        );
      });
  };
};

export const updatePatientMedicalHistory = (id, data, dose_no, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: medicalHistoryConstants.UPDATE_MEDICAL_HISTORY_REQUEST });
    updateMedicalHistory(id, data, dose_no)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: medicalHistoryConstants.UPDATE_MEDICAL_HISTORY_SUCCESS,
        });
        showMessage("success", "Remarks added succcessfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: medicalHistoryConstants.UPDATE_MEDICAL_HISTORY_FAILURE,
        });
      });
  };
};

export const downloadPatientMedicalHistory = (id, pdfName, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: medicalHistoryConstants.DOWNLOAD_MEDICAL_HISTORY_REQUEST,
    });
    downloadMedicalHistory(id)
      .then((response) => {
        dispatch(hideLoader());
        if (!response) {
          showMessage("error", "Unable to download");
          dispatch({
            type: medicalHistoryConstants.DOWNLOAD_MEDICAL_HISTORY_FAILURE,
          });
        } else {
          saveAs(response, pdfName);
          dispatch({
            type: medicalHistoryConstants.DOWNLOAD_MEDICAL_HISTORY_SUCCESS,
            response,
          });
          if (onSuccess) {
            onSuccess();
          }
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: medicalHistoryConstants.DOWNLOAD_MEDICAL_HISTORY_FAILURE,
        });
        if (!!error.message) {
          showMessage("error", error.message);
        }
      });
  };
};

export const setMedicalFormData = (data) => {
  return (dispatch) => {
    dispatch({
      type: medicalHistoryConstants.SET_MEDICAL_FEILDS_REQUEST_OBJECT,
      data,
    });
  };
};
