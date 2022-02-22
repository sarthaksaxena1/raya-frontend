import { patientListConstants } from "../constants";

const initialSettings = {
  isLoaded: false,
  patientList: {},
  isLocationAdded: false,
  isLocationEdited: false,
  locationList: {},
  patientListRequestObj: {
    page: 1,
    limit: 10,
  },
};

const PatientLists = (state = initialSettings, action) => {
  switch (action.type) {
    case patientListConstants.GET_PATIENT_LIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case patientListConstants.GET_PATIENT_LIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        patientList: action.data,
      };
    case patientListConstants.GET_PATIENT_LIST_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };
    case patientListConstants.DELETE_PATIENT_REQUEST:
      return {
        ...state,
      };
    case patientListConstants.DELETE_PATIENT_SUCCESS:
      return {
        ...state,
      };
    case patientListConstants.DELETE_PATIENT_FAILURE:
      return {
        ...state,
      };
    case patientListConstants.VERIFY_PATIENT_REQUEST:
      return {
        ...state,
      };
    case patientListConstants.VERIFY_PATIENT_SUCCESS:
      return {
        ...state,
      };
    case patientListConstants.VERIFY_PATIENT_FAILURE:
      return {
        ...state,
      };

    case patientListConstants.VERIFY_ALL_PATIENT_REQUEST:
      return {
        ...state,
      };
    case patientListConstants.VERIFY_ALL_PATIENT_SUCCESS:
      return {
        ...state,
      };
    case patientListConstants.VERIFY_ALL_PATIENT_FAILURE:
      return {
        ...state,
      };

    case patientListConstants.SET_PATIENT_LIST_REQUEST_OBJECT:
      return {
        ...state,
        patientListRequestObj: action.data,
        isLoaded: true,
      };

    default:
      return state;
  }
};

export default PatientLists;
