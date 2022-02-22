import { showMessage } from "../../helpers/message";
import {
  changePassword,
  getCurrentVersion,
  login,
  logout,
  register,
  resetPassord,
} from "../../services/Authentication";
import { authConstants } from "../constants";
import { hideLoader, showLoader } from "./Loader";

export const userLogin = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: authConstants.LOGIN_REQUEST });
    login(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
        });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: authConstants.LOGIN_FAILURE,
        });
        showMessage(
          "error",
          error.message ? error.message : "Invalid credentials!"
        );
      });
  };
};

export const userRegister = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    register(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: authConstants.SIGNUP_SUCCESS,
        });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : !!error.data.email
            ? error.data.email[0]
            : error.message
            ? error.message
            : "Something went wrong! Please try again."
        );
      });
  };
};

export const userLogout = (onSuccess) => {
  return (dispatch) => {
    logout()
      .then((response) => {
        dispatch({ type: authConstants.LOGOUT_SUCCESS });
        localStorage.removeItem("user");
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        localStorage.removeItem("user");
      });
  };
};

export const userForgotPassword = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: authConstants.RESET_PASSWORD_REQUEST });
    resetPassord(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: authConstants.RESET_PASSWORD_SUCCESS,
        });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: authConstants.RESET_PASSWORD_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.message
            ? error.message
            : "Something went wrong! Please try again."
        );
      });
  };
};

export const userChangePassword = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({ type: authConstants.CHANGE_PASSWORD_REQUEST });
    changePassword(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: authConstants.CHANGE_PASSWORD_SUCCESS,
        });
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: authConstants.CHANGE_PASSWORD_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.data.old_password
            ? error.data.old_password[0]
            : error.data.new_password
            ? error.data.new_password[0]
            : error.message
            ? error.message
            : "Something went wrong! Please try again."
        );
      });
  };
};

export const appGetCurrentVersion = (onSuccess) => {
  return () => {
    showLoader();
    getCurrentVersion()
      .then((response) => {
        hideLoader();
        if (onSuccess) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        hideLoader();
      });
  };
};

export const setSignUpFeildsData = (data, onSuccess) => {
  return (dispatch) => {
    dispatch({
      type: authConstants.SET_SIGNUP_FEILDS_REQUEST_OBJECT,
      data,
    });
    if (onSuccess) {
      onSuccess();
    }
  };
};
