import { surveyQuestionsConstants } from "../constants";

const initialSettings = {
  surveyQuestions: {},
  surveyData: {},
  isLoaded: false,
};

const SurveyQuestions = (state = initialSettings, action) => {
  switch (action.type) {
    case surveyQuestionsConstants.GET_SURVEY_QUESTIONS_REQUEST:
      return {
        ...state,
      };
    case surveyQuestionsConstants.GET_SURVEY_QUESTIONS_SUCCESS:
      return {
        ...state,
        surveyQuestions: action.data,
      };
    case surveyQuestionsConstants.GET_SURVEY_QUESTIONS_FAILURE:
      return {
        ...state,
      };

    case surveyQuestionsConstants.POST_SURVEY_ANSWERS_REQUEST:
      return {
        ...state,
      };
    case surveyQuestionsConstants.POST_SURVEY_ANSWERS_SUCCESS:
      return {
        ...state,
      };
    case surveyQuestionsConstants.POST_SURVEY_ANSWERS_FAILURE:
      return {
        ...state,
      };

    case surveyQuestionsConstants.GET_MSURVEY_DATAREQUEST:
      return {
        ...state,
      };
    case surveyQuestionsConstants.GET_SURVEY_DATA_SUCCESS:
      return {
        ...state,
        surveyData: action.data,
      };
    case surveyQuestionsConstants.GET_SURVEY_DATA_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default SurveyQuestions;
