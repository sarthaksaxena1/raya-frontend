import { patientVaccinationBookingConstants } from "../constants";
import { hideLoader, showLoader } from "./Loader";
import { showMessage } from "../../helpers/message";
import {
  bookVaccinationTimeSlot,
  getAllotedVaccinationDetails,
  getAllotedVaccinationTimeSlotsDetails,
  getVaccinationBookingDetails,
  setPreferredVaccinationLocation,
} from "../../services";

export const getPatientVaccinationBookingDetails = (onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: patientVaccinationBookingConstants.GET_VACCINATION_BOOKING_DETAILS_REQUEST,
    });
    getVaccinationBookingDetails()
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientVaccinationBookingConstants.GET_VACCINATION_BOOKING_DETAILS_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientVaccinationBookingConstants.GET_VACCINATION_BOOKING_DETAILS_FAILURE,
        });
      });
  };
};

export const getPatientAllotedVaccinationDetails = (dose_number, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_DETAILS_REQUEST,
    });
    getAllotedVaccinationDetails(dose_number)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_DETAILS_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_DETAILS_FAILURE,
        });
      });
  };
};

export const getPatientAllotedVaccinationTimeSlotDetails = (dose_number, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_TIME_SLOT_REQUEST,
    });
    getAllotedVaccinationTimeSlotsDetails(dose_number)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_TIME_SLOT_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_TIME_SLOT_FAILURE,
        });
      });
  };
};

export const bookPatientVaccinationTimeSlot = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: patientVaccinationBookingConstants.SELECT_PATIENT_VACCINATION_TIME_SLOT_REQUEST,
    });
    bookVaccinationTimeSlot(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientVaccinationBookingConstants.SELECT_PATIENT_VACCINATION_TIME_SLOT_SUCCESS,
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientVaccinationBookingConstants.SELECT_PATIENT_VACCINATION_TIME_SLOT_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.data.vaccination_time_slot
            ? error.data.vaccination_time_slot
            : error.message
            ? error.message
            : "Something went wrong please try again!"
        );
      });
  };
};

export const patientPreferredVaccinationLocation = (id, data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: patientVaccinationBookingConstants.SET_PATIENT_VACCINATION_LOCATION_REQUEST,
    });
    setPreferredVaccinationLocation(id, data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: patientVaccinationBookingConstants.SET_PATIENT_VACCINATION_LOCATION_SUCCESS,
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: patientVaccinationBookingConstants.SET_PATIENT_VACCINATION_LOCATION_FAILURE,
        });
        showMessage("Error,Something went wrong");
      });
  };
};
