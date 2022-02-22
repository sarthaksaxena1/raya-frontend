import { userListConstants } from "../constants";
import { hideLoader, showLoader } from "./Loader";
import {
  getUserList,
  getUserExportList,
  assignSlots,
  updatePatientVaccinationStatus,
  getPatientVaccinationStatusDetails,
  getVaccinatorList,
  getVaccinatorDetailsList,
  addVaccinator,
  editSingleVaccinator,
  deleteSingleVaccinator,
  getSingleVaccinatorDetails,
} from "../../services";
import { showMessage } from "../../helpers/message";

export const getAdminUserList = (paginationData, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: userListConstants.GET_USER_LIST_REQUEST });
    getUserList(paginationData)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_USER_LIST_SUCCESS,
          data: response.data ? response.data : [],
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_USER_LIST_FAILURE,
        });
        console.log(error);
      });
  };
};

export const assignSlotToUser = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: userListConstants.ASSIGN_SLOTS_REQUEST });
    assignSlots(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: userListConstants.ASSIGN_SLOTS_SUCCESS });
        showMessage("success", "Slots Assigned succcessfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: userListConstants.ASSIGN_SLOTS_FAILURE });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.message
            ? error.message
            : "Slot already assigned to selected users!"
        );
      });
  };
};

export const adminUpdatePatientVaccinatinStatus = (
  id,
  data,
  dose_no,
  onSuccess
) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: userListConstants.UPDATE_PATIENT_VACCINATION_STATUS_REQUEST,
    });
    updatePatientVaccinationStatus(id, data,dose_no)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.UPDATE_PATIENT_VACCINATION_STATUS_SUCCESS,
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.UPDATE_PATIENT_VACCINATION_STATUS_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.message
            ? error.message
            : "Something went wrong, Please try again later!"
        );
      });
  };
};

export const adminGetPatientVaccinatinStatus = (
  id,
  dose_number = 1,
  onSuccess
) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: userListConstants.GET_PATIENT_VACCINATION_STATUS_REQUEST,
    });
    getPatientVaccinationStatusDetails(id, dose_number)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_PATIENT_VACCINATION_STATUS_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_PATIENT_VACCINATION_STATUS_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.message
            ? error.message
            : "Something went wrong, Please try again later!"
        );
      });
  };
};

export const setPatientVaccinationStatusId = (data) => {
  return (dispatch) => {
    dispatch({
      type: userListConstants.SET_PATIENT_VACCINATION_ID,
      data,
    });
  };
};

export const setUserListRequstObj = (data) => {
  return (dispatch) => {
    dispatch({
      type: userListConstants.SET_USER_LIST_REQUEST_OBJECT,
      data,
    });
  };
};

export const getAdminUserExportList = (onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: userListConstants.GET_USER_EXPORT_LIST_REQUEST });
    getUserExportList()
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_USER_EXPORT_LIST_SUCCESS,
        });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_USER_EXPORT_LIST_FAILURE,
        });
      });
  };
};

export const getAllVaccinatorList = (onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: userListConstants.GET_VACCINATOR_LIST_REQUEST });
    getVaccinatorList()
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_VACCINATOR_LIST_SUCCESS,
          data: response.data ? response.data : [],
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_VACCINATOR_LIST_FAILURE,
        });
        console.log(error);
      });
  };
};

export const getAllVaccinatorDetailsList = (paginationData, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: userListConstants.GET_VACCINATOR_DETAILS_LIST_REQUEST });
    getVaccinatorDetailsList(paginationData)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_VACCINATOR_DETAILS_LIST_SUCCESS,
          data: response.data ? response.data : [],
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_VACCINATOR_DETAILS_LIST_FAILURE,
        });
        console.log(error);
      });
  };
};

export const addVaccinatorList = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: userListConstants.ADD_VACCINATOR_REQUEST });
    addVaccinator(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: userListConstants.ADD_VACCINATOR_SUCCESS });
        showMessage("success", "Vaccinator added successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: userListConstants.ADD_VACCINATOR_FAILURE });
        showMessage("error", error.message);
      });
  };
};

export const editVaccinator = (id, data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: userListConstants.EDIT_VACCINATOR_REQUEST });
    editSingleVaccinator(id, data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: userListConstants.EDIT_VACCINATOR_SUCCESS });
        showMessage("success", "Vaccinator Edited Successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: userListConstants.EDIT_VACCINATOR_FAILURE });
        showMessage("error", "Something went wrong!");
      });
  };
};

export const deleteVaccinator = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: userListConstants.DELETE_VACCINATOR_REQUEST });
    deleteSingleVaccinator(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.DELETE_VACCINATOR_SUCCESS,
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.DELETE_VACCINATOR_FAILURE,
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

export const getVaccinatorDetails = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: userListConstants.GET_VACCINATOR_DETAILS_REQUEST });
    getSingleVaccinatorDetails(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_VACCINATOR_DETAILS_SUCCESS,
          data: response.data ? response.data : [],
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: userListConstants.GET_VACCINATOR_DETAILS_FAILURE,
        });
        console.log(error);
      });
  };
};
