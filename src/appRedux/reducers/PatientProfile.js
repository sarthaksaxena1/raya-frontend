import { patientProfileConstants } from "../constants";

const initialSettings = {
  isLoaded: false,
  patientCeirData: {},
  patientProfileData: {},
  patientDetailsViaQr: {},
  isProfileEdited: false,
  isCeirEdited: false,
  isCeirAdded: false,
  ceirFeildsData: {},
  isLoaded: false,
};

const PatientProfile = (state = initialSettings, action) => {
  switch (action.type) {
    case patientProfileConstants.GET_PATIENT_PROFILE_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case patientProfileConstants.GET_PATIENT_PROFILE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        patientProfileData: action.data,
      };
    case patientProfileConstants.GET_PATIENT_PROFILE_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };

    case patientProfileConstants.GET_PATIENT_DETAILS_QRSCAN_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case patientProfileConstants.GET_PATIENT_DETAILS_QRSCAN_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        patientDetailsViaQr: action.data,
      };
    case patientProfileConstants.GET_PATIENT_DETAILS_QRSCAN_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };

    case patientProfileConstants.EDIT_PATIENT_DETAILS_REQUEST:
      return {
        ...state,
        isProfileEdited: false,
      };
    case patientProfileConstants.EDIT_PATIENT_DETAILS_SUCCESS:
      return {
        ...state,
        isProfileEdited: true,
      };
    case patientProfileConstants.EDIT_PATIENT_DETAILS_FAILURE:
      return {
        ...state,
        isProfileEdited: false,
      };
    case patientProfileConstants.EDIT_PATIENT_CEIR_REQUEST:
      return {
        ...state,
        isCeirEdited: false,
      };
    case patientProfileConstants.EDIT_PATIENT_CEIR_SUCCESS:
      return {
        ...state,
        isCeirEdited: true,
      };
    case patientProfileConstants.EDIT_PATIENT_CEIR_FAILURE:
      return {
        ...state,
        isCeirEdited: false,
      };
    case patientProfileConstants.ADD_PATIENT_CEIR_REQUEST:
      return {
        ...state,
        isCeirAdded: false,
      };
    case patientProfileConstants.ADD_PATIENT_CEIR_SUCCESS:
      return {
        ...state,
        isCeirAdded: true,
      };
    case patientProfileConstants.ADD_PATIENT_CEIR_FAILURE:
      return {
        ...state,
        isCeirAdded: false,
      };
    case patientProfileConstants.GET_PATIENT_CEIR_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case patientProfileConstants.GET_PATIENT_CEIR_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        patientCeirData: action.data,
      };
    case patientProfileConstants.GET_PATIENT_CEIR_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };
    case patientProfileConstants.RESET_PROFILE_FORM:
      return {
        ...state,
        isProfileEdited: false,
      };

    case patientProfileConstants.SET_CEIR_FEILDS_REQUEST_OBJECT:
      return {
        ...state,
        ceirFeildsData: action.data,
        isLoaded: true,
      };

    default:
      return state;
  }
};

export default PatientProfile;
