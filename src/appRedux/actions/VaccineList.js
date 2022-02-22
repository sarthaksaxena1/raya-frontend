import { vaccineListConstants } from "../constants";
import { hideLoader, showLoader } from "./Loader";
import {
  getVaccineList,
  getVaccineExportList,
  editVaccine,
  addVaccine,
  deleteVaccine,
  getVaccineDetails,
} from "../../services";
import { showMessage } from "../../helpers/message";

export const getAdminVaccineList = (paginationData) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineListConstants.GET_VACCINE_LIST_REQUEST });
    getVaccineList(paginationData)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineListConstants.GET_VACCINE_LIST_SUCCESS,
          data: response.data ? response.data : [],
        });
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineListConstants.GET_VACCINE_LIST_FAILURE,
        });
        console.log(error);
      });
  };
};

export const adminEditVaccine = (id, data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineListConstants.EDIT_VACCINE_REQUEST });
    editVaccine(id, data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: vaccineListConstants.EDIT_VACCINE_SUCCESS });
        showMessage("success", "Vaccine edited successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: vaccineListConstants.EDIT_VACCINE_FAILURE });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : !!error.data.name
            ? error.data.name[0]
            : !!error.data.batch_number
            ? error.data.batch_number[0]
            : error.message
            ? error.message
            : "Something went wrong!"
        );
      });
  };
};

export const adminAddVaccine = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineListConstants.ADD_VACCINE_REQUEST });
    addVaccine(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: vaccineListConstants.ADD_VACCINE_SUCCESS });
        showMessage("success", "Vaccine added successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: vaccineListConstants.ADD_VACCINE_FAILURE });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : !!error.data.name
            ? error.data.name[0]
            : !!error.data.batch_number
            ? error.data.batch_number[0]
            : error.message
            ? error.message
            : "Something went wrong!"
        );
      });
  };
};

export const adminDeleteVaccine = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineListConstants.DELETE_VACCINE_REQUEST });
    deleteVaccine(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineListConstants.DELETE_VACCINE_SUCCESS,
          data: response.data ? response.data : {},
        });
        showMessage("success", "Vaccine deleted successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineListConstants.DELETE_VACCINE_FAILURE,
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

export const getAdminVaccineDetails = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineListConstants.GET_VACCINE_DETAILS_REQUEST });
    getVaccineDetails(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineListConstants.GET_VACCINE_DETAILS_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineListConstants.GET_VACCINE_DETAILS_FAILURE,
        });
        console.log(error);
      });
  };
};

export const resetVaccine = () => {
  return (dispatch) => {
    dispatch({ type: vaccineListConstants.RESET_VACCINE });
  };
};

export const getAdminVaccineExportList = (onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineListConstants.GET_VACCINE_EXPORT_LIST_REQUEST });
    getVaccineExportList()
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineListConstants.GET_VACCINE_EXPORT_LIST_SUCCESS
        });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineListConstants.GET_VACCINE_EXPORT_LIST_FAILURE,
        });
      });
  };
};