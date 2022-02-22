import { hideLoader, showLoader } from "./Loader";
import { showMessage } from "../../helpers/message";
import { surveyQuestionsConstants } from "../constants";
import {
  getSurveyQuestions,
  postSurveyAnswers,
  getSurveyData,
} from "../../services";
export const getPatientSurveyQuestions = (
  dose_no,
  paginationData,
  onSuccess
) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: surveyQuestionsConstants.GET_SURVEY_QUESTIONS_REQUEST,
    });
    getSurveyQuestions(dose_no, paginationData)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: surveyQuestionsConstants.GET_SURVEY_QUESTIONS_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: surveyQuestionsConstants.GET_SURVEY_QUESTIONS_FAILURE,
        });
      });
  };
};

export const getPatientSurveyData = (dose_no, id, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: surveyQuestionsConstants.GET_SURVEY_DATA_REQUEST,
    });
    getSurveyData(dose_no, id)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: surveyQuestionsConstants.GET_SURVEY_DATA_SUCCESS,
          data: response.data ? response.data : {},
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: surveyQuestionsConstants.GET_SURVEY_DATA_FAILURE,
        });
        if (!!error.message) {
          showMessage("error", error.message);
        }
      });
  };
};

export const addPatientSurvey = (data, onSuccess) => {
  return (dispatch) => {
    dispatch(showLoader());
    dispatch({
      type: surveyQuestionsConstants.POST_SURVEY_ANSWERS_REQUEST,
    });
    postSurveyAnswers(data)
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: surveyQuestionsConstants.POST_SURVEY_ANSWERS_SUCCESS,
        });
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        dispatch(hideLoader());
        dispatch({
          type: surveyQuestionsConstants.POST_SURVEY_ANSWERS_FAILURE,
        });
        showMessage(
          "error",
          error.data && !!error.data.non_field_errors
            ? error.data.non_field_errors[0]
            : error.data.medical_data
            ? error.data.medical_data
            : error.message
            ? error.message
            : "Something went wrong please try again!"
        );
      });
  };
};
