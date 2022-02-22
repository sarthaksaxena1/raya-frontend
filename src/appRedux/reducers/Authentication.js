import { authConstants } from "../constants";

const initialSettings = {
  signupFeildsData: {},
  isLoaded: false,
};

const Authentication = (state = initialSettings, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
      };
    case authConstants.SET_SIGNUP_FEILDS_REQUEST_OBJECT:
      return {
        ...state,
        signupFeildsData: action.data,
        isLoaded: true,
      };

    default:
      return state;
  }
};

export default Authentication;
