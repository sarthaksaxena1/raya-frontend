import { vaccineLocationConstants } from "../constants";

const initialSettings = {
  isLoaded: false,
  vaccineLocationList: {},
  isLocationAdded: false,
  isLocationEdited: false,
  locationList: {},
};

const VaccineLocations = (state = initialSettings, action) => {
  switch (action.type) {
    case vaccineLocationConstants.GET_LOCATION_LIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case vaccineLocationConstants.GET_LOCATION_LIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        vaccineLocationList: action.data,
      };
    case vaccineLocationConstants.GET_LOCATION_LIST_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };

    case vaccineLocationConstants.GET_LOCATION_DETAILS_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case vaccineLocationConstants.GET_LOCATION_DETAILS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        locationList: action.data,
      };
    case vaccineLocationConstants.GET_LOCATION_DETAILS_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };
    case vaccineLocationConstants.ADD_LOCATION_REQUEST:
      return {
        ...state,
        isLocationAdded: false,
      };
    case vaccineLocationConstants.ADD_LOCATION_SUCCESS:
      return {
        ...state,
        isLocationAdded: true,
      };
    case vaccineLocationConstants.ADD_LOCATION_FAILURE:
      return {
        ...state,
        isLocationAdded: false,
      };

    case vaccineLocationConstants.EDIT_LOCATION_REQUEST:
      return {
        ...state,
        isLocationEdited: false,
      };
    case vaccineLocationConstants.EDIT_LOCATION_SUCCESS:
      return {
        ...state,
        isLocationEdited: true,
      };
    case vaccineLocationConstants.EDIT_LOCATION_FAILURE:
      return {
        ...state,
        isLocationEdited: false,
      };
    case vaccineLocationConstants.RESET_LOCATION:
      return {
        ...state,
        isLocationAdded: false,
        isLocationEdited: false,
      };
    case vaccineLocationConstants.GET_LOCATION_EXPORT_LIST_REQUEST:
      return {
        ...state,
      };
    case vaccineLocationConstants.GET_LOCATION_EXPORT_LIST_SUCCESS:
      return {
        ...state,
      };
    case vaccineLocationConstants.GET_LOCATION_EXPORT_LIST_FAILURE:
      return {
        ...state,
      };
    
    default:
      return state;
  }
};

export default VaccineLocations;
