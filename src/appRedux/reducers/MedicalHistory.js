import { medicalHistoryConstants } from "../constants";

const initialSettings = {
  medicalQuestions: {},
  medicalHistoryData: {},
  isMedicalHisotryUpdated: false,
  medicalFeildsData: {},
  isLoaded: false,
};

const MedicalHistory = (state = initialSettings, action) => {
  switch (action.type) {
    case medicalHistoryConstants.GET_MEDICAL_HISTORY_QUESTIONS_REQUEST:
      return {
        ...state,
      };
    case medicalHistoryConstants.GET_MEDICAL_HISTORY_QUESTIONS_SUCCESS:
      return {
        ...state,
        medicalQuestions: action.data,
      };
    case medicalHistoryConstants.GET_MEDICAL_HISTORY_QUESTIONS_FAILURE:
      return {
        ...state,
      };

    case medicalHistoryConstants.GET_MEDICAL_HISTORY_REQUEST:
      return {
        ...state,
      };
    case medicalHistoryConstants.GET_MEDICAL_HISTORY_SUCCESS:
      return {
        ...state,
        medicalHistoryData: action.data,
      };
    case medicalHistoryConstants.GET_MEDICAL_HISTORY_FAILURE:
      return {
        ...state,
      };

    case medicalHistoryConstants.POST_MEDICAL_HISTORY_REQUEST:
      return {
        ...state,
      };
    case medicalHistoryConstants.POST_MEDICAL_HISTORY_SUCCESS:
      return {
        ...state,
      };
    case medicalHistoryConstants.POST_MEDICAL_HISTORY_FAILURE:
      return {
        ...state,
      };

    case medicalHistoryConstants.UPDATE_MEDICAL_HISTORY_REQUEST:
      return {
        ...state,
        isMedicalHisotryUpdated: false,
      };
    case medicalHistoryConstants.UPDATE_MEDICAL_HISTORY_SUCCESS:
      return {
        ...state,
        isMedicalHisotryUpdated: true,
      };
    case medicalHistoryConstants.UPDATE_MEDICAL_HISTORY_FAILURE:
      return {
        ...state,
        isMedicalHisotryUpdated: false,
      };

    case medicalHistoryConstants.SET_MEDICAL_FEILDS_REQUEST_OBJECT:
      return {
        ...state,
        medicalFeildsData: action.data,
        isLoaded: true,
      };

    default:
      return state;
  }
};

export default MedicalHistory;
