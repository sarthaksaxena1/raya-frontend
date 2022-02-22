import { vaccineLocationConstants } from "../constants";
import { hideLoader, showLoader } from "./Loader";
import {
  getLocationList,
  getVaccineLocationExportList,
  addLocation,
  editLocation,
  deleteLocation,
  getLocationDetails,
} from "../../services";
import { showMessage } from "../../helpers/message";

export const getAdminVaccineLocationList = (paginationData, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineLocationConstants.GET_LOCATION_LIST_REQUEST });
    getLocationList(paginationData)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineLocationConstants.GET_LOCATION_LIST_SUCCESS,
          data: response.data ? response.data : [],
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineLocationConstants.GET_LOCATION_LIST_FAILURE,
        });
        console.log(error);
      });
  };
};

export const adminEditLocation = (id, data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineLocationConstants.EDIT_LOCATION_REQUEST });
    editLocation(id, data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: vaccineLocationConstants.EDIT_LOCATION_SUCCESS });
        showMessage("success", "Vaccination Location Edited Successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: vaccineLocationConstants.EDIT_LOCATION_FAILURE });
        showMessage("error", "Something went wrong!");
      });
  };
};

export const adminAddLocation = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineLocationConstants.ADD_LOCATION_REQUEST });
    addLocation(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({ type: vaccineLocationConstants.ADD_LOCATION_SUCCESS });
        showMessage("success", "Location added successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({ type: vaccineLocationConstants.ADD_LOCATION_FAILURE });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : !!error.data.name
            ? error.data.name[0]
            : !!error.data.cbcr
            ? error.data.cbcr[0]
            : error.message
            ? error.message
            : "Something went wrong!"
        );
      });
  };
};

export const adminDeleteLocation = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineLocationConstants.DELETE_LOCATION_REQUEST });
    deleteLocation(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineLocationConstants.DELETE_LOCATION_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineLocationConstants.DELETE_LOCATION_FAILURE,
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

export const getAdminLocationDetails = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineLocationConstants.GET_LOCATION_DETAILS_REQUEST });
    getLocationDetails(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineLocationConstants.GET_LOCATION_DETAILS_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineLocationConstants.GET_LOCATION_DETAILS_FAILURE,
        });
        console.log(error);
      });
  };
};

export const resetLocation = () => {
  return (dispatch) => {
    dispatch({ type: vaccineLocationConstants.RESET_LOCATION });
  };
};


export const getAdminVaccineLocationExportList = (onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccineLocationConstants.GET_LOCATION_EXPORT_LIST_REQUEST });
    getVaccineLocationExportList()
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineLocationConstants.GET_LOCATION_EXPORT_LIST_SUCCESS
        });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccineLocationConstants.GET_LOCATION_EXPORT_LIST_FAILURE,
        });
      });
  };
};