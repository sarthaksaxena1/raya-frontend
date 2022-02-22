import { uploadPatientConstants } from "../constants";

const initialSettings = {};

const UploadPatient = (state = initialSettings, action) => {
  switch (action.type) {
    case uploadPatientConstants.UPLOAD_PATIENT_REQUEST:
      return {
        ...state,
      };
    case uploadPatientConstants.UPLOAD_PATIENT_SUCCESS:
      return {
        ...state,
      };
    case uploadPatientConstants.UPLOAD_PATIENT_FAILURE:
      return {
        ...state,
      };

    case uploadPatientConstants.GET_UPLOAD_PATIENT_DATA_REQUEST:
      return {
        ...state,
      };
    case uploadPatientConstants.GET_UPLOAD_PATIENT_DATA_SUCCESS:
      return {
        ...state,
      };
    case uploadPatientConstants.GET_UPLOAD_PATIENT_DATA_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default UploadPatient;
