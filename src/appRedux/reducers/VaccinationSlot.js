import { vaccinationSlotConstants } from "../constants";

const initialSettings = {
  isLoaded: false,
  vaccinationSlotDateList: {},
  vaccinationSlotTimeList: {},
  vaccinationSlotDetails: {},
  isSlotAdded: false,
  isSlotDataLoaded: false,
  selectedDateSlotId: null,
};

const VaccinationSlot = (state = initialSettings, action) => {
  switch (action.type) {
    case vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_LIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_LIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        vaccinationSlotDateList: action.data,
      };
    case vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_LIST_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };

    case vaccinationSlotConstants.GET_VACCINATION_TIME_SLOT_LIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case vaccinationSlotConstants.GET_VACCINATION_TIME_SLOT_LIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        vaccinationSlotTimeList: action.data,
      };
    case vaccinationSlotConstants.GET_VACCINATION_TIME_SLOT_LIST_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };

    case vaccinationSlotConstants.ADD_VACCINATION_SLOT_REQUEST:
      return {
        ...state,
        isSlotAdded: false,
      };
    case vaccinationSlotConstants.ADD_VACCINATION_SLOT_SUCCESS:
      return {
        ...state,
        isSlotAdded: true,
      };
    case vaccinationSlotConstants.ADD_VACCINATION_SLOT_FAILURE:
      return {
        ...state,
        isSlotAdded: false,
      };

    case vaccinationSlotConstants.GET_VACCINATION_SLOT_REQUEST:
      return {
        ...state,
        isSlotDataLoaded: false,
      };
    case vaccinationSlotConstants.GET_VACCINATION_SLOT_SUCCESS:
      return {
        ...state,
        isSlotDataLoaded: true,
        vaccinationSlotDetails: action.data,
      };
    case vaccinationSlotConstants.GET_VACCINATION_SLOT_FAILURE:
      return {
        ...state,
        isSlotDataLoaded: false,
      };

    case vaccinationSlotConstants.EDIT_VACCINATION_SLOT_REQUEST:
      return {
        ...state,
      };
    case vaccinationSlotConstants.EDIT_VACCINATION_SLOT_SUCCESS:
      return {
        ...state,
      };
    case vaccinationSlotConstants.EDIT_VACCINATION_SLOT_FAILURE:
      return {
        ...state,
      };

    case vaccinationSlotConstants.DELETE_VACCINATION_SLOT_REQUEST:
      return {
        ...state,
      };
    case vaccinationSlotConstants.DELETE_VACCINATION_SLOT_SUCCESS:
      return {
        ...state,
      };
    case vaccinationSlotConstants.DELETE_VACCINATION_SLOT_FAILURE:
      return {
        ...state,
      };

    case vaccinationSlotConstants.DELETE_VACCINATION_TIME_SLOT_REQUEST:
      return {
        ...state,
      };
    case vaccinationSlotConstants.DELETE_VACCINATION_TIME_SLOT_SUCCESS:
      return {
        ...state,
      };
    case vaccinationSlotConstants.DELETE_VACCINATION_TIME_SLOT_FAILURE:
      return {
        ...state,
      };

    case vaccinationSlotConstants.ADD_VACCINATION_TIME_SLOT_REQUEST:
      return {
        ...state,
      };
    case vaccinationSlotConstants.ADD_VACCINATION_TIME_SLOT_SUCCESS:
      return {
        ...state,
      };
    case vaccinationSlotConstants.ADD_VACCINATION_TIME_SLOT_FAILURE:
      return {
        ...state,
      };

    case vaccinationSlotConstants.EDIT_VACCINATION_TIME_SLOT_REQUEST:
      return {
        ...state,
      };
    case vaccinationSlotConstants.EDIT_VACCINATION_TIME_SLOT_SUCCESS:
      return {
        ...state,
      };
    case vaccinationSlotConstants.EDIT_VACCINATION_TIME_SLOT_FAILURE:
      return {
        ...state,
      };

    case vaccinationSlotConstants.RESET_SLOT:
      return {
        ...state,
        isSlotAdded: false,
      };

    case vaccinationSlotConstants.SELECT_VACCINATION_DATE_SLOT:
      return {
        ...state,
        selectedDateSlotId: action.data,
      };
    
    case vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_EXPORT_LIST_REQUEST:
      return {
        ...state,
      };
    case vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_EXPORT_LIST_SUCCESS:
      return {
        ...state,
      };
    case vaccinationSlotConstants.GET_VACCINATION_DATE_SLOT_EXPORT_LIST_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default VaccinationSlot;
