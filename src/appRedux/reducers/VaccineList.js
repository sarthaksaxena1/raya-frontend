import { vaccineListConstants } from "../constants";

const initialSettings = {
  isLoaded: false,
  vaccineListData: {},
  isVaccineAdded: false,
  isVaccineEdited: false,
  vaccineList: {},
};
const VaccineList = (state = initialSettings, action) => {
  switch (action.type) {
    case vaccineListConstants.GET_VACCINE_LIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case vaccineListConstants.GET_VACCINE_LIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        vaccineListData: action.data,
      };
    case vaccineListConstants.GET_VACCINE_LIST_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };
    case vaccineListConstants.GET_VACCINE_DETAILS_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case vaccineListConstants.GET_VACCINE_DETAILS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        vaccineList: action.data,
      };
    case vaccineListConstants.GET_VACCINE_DETAILS_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };
    case vaccineListConstants.ADD_VACCINE_REQUEST:
      return {
        ...state,
        isVaccineAdded: false,
      };
    case vaccineListConstants.ADD_VACCINE_SUCCESS:
      return {
        ...state,
        isVaccineAdded: true,
      };
    case vaccineListConstants.ADD_VACCINE_FAILURE:
      return {
        ...state,
        isVaccineAdded: false,
      };

    case vaccineListConstants.EDIT_VACCINE_REQUEST:
      return {
        ...state,
        isVaccineEdited: false,
      };
    case vaccineListConstants.EDIT_VACCINE_SUCCESS:
      return {
        ...state,
        isVaccineEdited: true,
      };
    case vaccineListConstants.EDIT_VACCINE_FAILURE:
      return {
        ...state,
        isVaccineEdited: false,
      };
    case vaccineListConstants.RESET_VACCINE:
      return {
        ...state,
        isVaccineAdded: false,
        isVaccineEdited: false,
      };
    case vaccineListConstants.GET_VACCINE_EXPORT_LIST_REQUEST:
      return {
        ...state,
      };
    case vaccineListConstants.GET_VACCINE_EXPORT_LIST_SUCCESS:
      return {
        ...state,
      };
    case vaccineListConstants.GET_VACCINE_EXPORT_LIST_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default VaccineList;
