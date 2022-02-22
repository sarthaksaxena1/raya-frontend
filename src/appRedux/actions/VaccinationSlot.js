import { vaccinationSlotConstants } from "../constants";
import { hideLoader, showLoader } from "./Loader";
import {
  getVaccinationSlotList,
  getVaccinationTimeSlotList,
  getVaccinationSlotExportList,
  addVaccinationSlot,
  getVaccinationSlot,
  editVaccinationSlot,
  deleteVaccinationSlot,
  deleteVaccinationTimeSlot,
  addVaccinationTimeSlot,
  editVaccinationTimeSlot,
} from "../../services";
import { showMessage } from "../../helpers/message";

export const getAdminVaccinationSlotList = (
  paginationData,
  filterParams,
  onSuccess
) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_LIST_REQUEST,
    });
    getVaccinationSlotList(paginationData, filterParams)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_LIST_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_LIST_FAILURE,
        });
        console.log(error);
      });
  };
};

export const getAdminVaccinationTimeSlotList = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: vaccinationSlotConstants.GET_VACCINATION_TIME_SLOT_LIST_REQUEST,
    });
    getVaccinationTimeSlotList(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.GET_VACCINATION_TIME_SLOT_LIST_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess(response.data.data);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.GET_VACCINATION_TIME_SLOT_LIST_FAILURE,
        });
        console.log(error);
      });
  };
};

export const adminAddVaccinationSlot = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: vaccinationSlotConstants.ADD_VACCINATION_SLOT_REQUEST });
    addVaccinationSlot(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.ADD_VACCINATION_SLOT_SUCCESS,
        });
        showMessage("success", "Vaccination Slot added successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.ADD_VACCINATION_SLOT_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.message
            ? error.message
            : "Vaccination Slot should be unique!"
        );
      });
  };
};

export const resetSlot = () => {
  return (dispatch) => {
    dispatch({ type: vaccinationSlotConstants.RESET_SLOT });
  };
};

export const getAdminVaccinationSlot = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: vaccinationSlotConstants.GET_VACCINATION_SLOT_REQUEST,
    });
    getVaccinationSlot(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.GET_VACCINATION_SLOT_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess(response.data.data);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.GET_VACCINATION_SLOT_FAILURE,
        });
        console.log(error);
      });
  };
};

export const deleteAdminVaccinationSlot = (id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: vaccinationSlotConstants.DELETE_VACCINATION_SLOT_REQUEST,
    });
    deleteVaccinationSlot(id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.DELETE_VACCINATION_SLOT_SUCCESS,
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.DELETE_VACCINATION_SLOT_FAILURE,
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

export const deleteAdminVaccinationTimeSlot = (
  dateSlotId,
  timeSlotId,
  onSuccess
) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: vaccinationSlotConstants.DELETE_VACCINATION_TIME_SLOT_REQUEST,
    });
    deleteVaccinationTimeSlot(dateSlotId, timeSlotId)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.DELETE_VACCINATION_TIME_SLOT_SUCCESS,
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.DELETE_VACCINATION_TIME_SLOT_FAILURE,
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

export const editAdminVaccinationSlot = (id, data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: vaccinationSlotConstants.EDIT_VACCINATION_SLOT_REQUEST,
    });
    editVaccinationSlot(id, data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.EDIT_VACCINATION_SLOT_SUCCESS,
        });
        showMessage("success", "Vaccination Slot edited successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.EDIT_VACCINATION_SLOT_FAILURE,
        });
        showMessage(
          "error",
          error.message ? error.message : "Vaccination Slot should be unique!"
        );
      });
  };
};

export const selectVaccinationDateSlot = (id, onSuccess) => {
  return (dispatch) => {
    dispatch({
      type: vaccinationSlotConstants.SELECT_VACCINATION_DATE_SLOT,
      data: id,
    });
    if (onSuccess) {
      onSuccess();
    }
  };
};

export const addAdminVaccinationTimeSlot = (id, data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: vaccinationSlotConstants.ADD_VACCINATION_TIME_SLOT_REQUEST,
    });
    addVaccinationTimeSlot(id, data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.ADD_VACCINATION_TIME_SLOT_SUCCESS,
        });
        showMessage("success", "Vaccination Time Slot added successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.ADD_VACCINATION_TIME_SLOT_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : !!error.data.from_time
            ? error.data.from_time[0]
            : !!error.data.to_time
            ? error.data.to_time[0]
            : error.message
            ? error.message
            : "Vaccination Time Slot should be unique!"
        );
      });
  };
};

export const editAdminVaccinationTimeSlot = (
  dateSlotId,
  timeSlotId,
  data,
  onSuccess
) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: vaccinationSlotConstants.EDIT_VACCINATION_TIME_SLOT_REQUEST,
    });
    editVaccinationTimeSlot(dateSlotId, timeSlotId, data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.EDIT_VACCINATION_TIME_SLOT_SUCCESS,
        });
        showMessage("success", "Vaccination Time Slot updated successfully!");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.EDIT_VACCINATION_TIME_SLOT_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : !!error.data.from_time
            ? error.data.from_time[0]
            : !!error.data.to_time
            ? error.data.to_time[0]
            : error.message
            ? error.message
            : "Vaccination Time Slot should be unique!"
        );
      });
  };
};

export const getAdminVaccinationSlotExportList = (onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_EXPORT_LIST_REQUEST,
    });
    getVaccinationSlotExportList()
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_EXPORT_LIST_SUCCESS,
        });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_EXPORT_LIST_FAILURE,
        });
      });
  };
};
