import { patientVaccinationBookingConstants } from "../constants";

const initialSettings = {
  vaccinationDetails: {},
  vaccinationBookingDetails: {},
  vaccinationTimeSlotDetails: {},
};

const PatientVaccinationBookings = (state = initialSettings, action) => {
  switch (action.type) {
    case patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_DETAILS_REQUEST:
      return {
        ...state,
      };
    case patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_DETAILS_SUCCESS:
      return {
        ...state,
        vaccinationDetails: action.data,
      };
    case patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_DETAILS_FAILURE:
      return {
        ...state,
      };

    case patientVaccinationBookingConstants.GET_VACCINATION_BOOKING_DETAILS_REQUEST:
      return {
        ...state,
      };
    case patientVaccinationBookingConstants.GET_VACCINATION_BOOKING_DETAILS_SUCCESS:
      return {
        ...state,
        vaccinationBookingDetails: action.data,
      };
    case patientVaccinationBookingConstants.GET_VACCINATION_BOOKING_DETAILS_FAILURE:
      return {
        ...state,
      };

    case patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_TIME_SLOT_REQUEST:
      return {
        ...state,
      };
    case patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_TIME_SLOT_SUCCESS:
      return {
        ...state,
        vaccinationTimeSlotDetails: action.data,
      };
    case patientVaccinationBookingConstants.GET_PATIENT_VACCINATION_TIME_SLOT_FAILURE:
      return {
        ...state,
      };

    case patientVaccinationBookingConstants.SELECT_PATIENT_VACCINATION_TIME_SLOT_REQUEST:
      return {
        ...state,
      };
    case patientVaccinationBookingConstants.SELECT_PATIENT_VACCINATION_TIME_SLOT_SUCCESS:
      return {
        ...state,
      };
    case patientVaccinationBookingConstants.SELECT_PATIENT_VACCINATION_TIME_SLOT_FAILURE:
      return {
        ...state,
      };

    case patientVaccinationBookingConstants.SET_PATIENT_VACCINATION_LOCATION_REQUEST:
      return {
        ...state,
      };
    case patientVaccinationBookingConstants.SET_PATIENT_VACCINATION_LOCATION_SUCCESS:
      return {
        ...state,
      };
    case patientVaccinationBookingConstants.SET_PATIENT_VACCINATION_LOCATION_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default PatientVaccinationBookings;
