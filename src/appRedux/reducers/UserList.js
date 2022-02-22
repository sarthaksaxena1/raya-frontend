import { userListConstants } from "../constants";

const initialSettings = {
  isLoaded: false,
  isSlotAssigned: false,
  userListData: {},
  userListRequestObj: {
    page: 1,
    limit: 10,
  },
  patientVaccinationStatusDetails: {},
  patientVaccinationStatusId: null,
  vaccinatorListDetails: [],
  vaccinatorDetails: [],
  isVaccinatorAdded: false,
  isVaccinatorEdited: true,
  singleVaccinatorList: [],
};

const UserList = (state = initialSettings, action) => {
  switch (action.type) {
    case userListConstants.GET_USER_LIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case userListConstants.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        userListData: action.data,
      };
    case userListConstants.GET_USER_LIST_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };
    case userListConstants.ASSIGN_SLOTS_REQUEST:
      return {
        ...state,
        isSlotAssigned: false,
      };
    case userListConstants.ASSIGN_SLOTS_SUCCESS:
      return {
        ...state,
        isSlotAssigned: true,
      };
    case userListConstants.ASSIGN_SLOTS_FAILURE:
      return {
        ...state,
        isSlotAssigned: false,
      };

    case userListConstants.UPDATE_PATIENT_VACCINATION_STATUS_REQUEST:
      return {
        ...state,
      };
    case userListConstants.UPDATE_PATIENT_VACCINATION_STATUS_SUCCESS:
      return {
        ...state,
      };
    case userListConstants.UPDATE_PATIENT_VACCINATION_STATUS_FAILURE:
      return {
        ...state,
      };

    case userListConstants.GET_PATIENT_VACCINATION_STATUS_REQUEST:
      return {
        ...state,
      };
    case userListConstants.GET_PATIENT_VACCINATION_STATUS_SUCCESS:
      return {
        ...state,
        patientVaccinationStatusDetails: action.data,
      };
    case userListConstants.GET_PATIENT_VACCINATION_STATUS_FAILURE:
      return {
        ...state,
      };

    case userListConstants.SET_USER_LIST_REQUEST_OBJECT:
      return {
        ...state,
        userListRequestObj: action.data,
      };

    case userListConstants.SET_PATIENT_VACCINATION_ID:
      return {
        ...state,
        patientVaccinationStatusId: action.data,
      };

    case userListConstants.GET_USER_EXPORT_LIST_REQUEST:
      return {
        ...state,
      };
    case userListConstants.GET_USER_EXPORT_LIST_SUCCESS:
      return {
        ...state,
      };
    case userListConstants.GET_USER_EXPORT_LIST_FAILURE:
      return {
        ...state,
      };
    case userListConstants.GET_VACCINATOR_LIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case userListConstants.GET_VACCINATOR_LIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        vaccinatorListDetails: action.data,
      };
    case userListConstants.GET_VACCINATOR_LIST_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };
    case userListConstants.GET_VACCINATOR_DETAILS_LIST_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case userListConstants.GET_VACCINATOR_DETAILS_LIST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        vaccinatorDetails: action.data,
      };
    case userListConstants.GET_VACCINATOR_DETAILS_LIST_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };

    case userListConstants.ADD_VACCINATOR_REQUEST:
      return {
        ...state,
        isVaccinatorAdded: false,
      };
    case userListConstants.ADD_VACCINATOR_SUCCESS:
      return {
        ...state,
        isVaccinatorAdded: true,
      };
    case userListConstants.ADD_VACCINATOR_FAILURE:
      return {
        ...state,
        isVaccinatorAdded: false,
      };

    case userListConstants.EDIT_VACCINATOR_REQUEST:
      return {
        ...state,
        isVaccinatorEdited: false,
      };
    case userListConstants.EDIT_VACCINATOR_SUCCESS:
      return {
        ...state,
        isVaccinatorEdited: true,
      };
    case userListConstants.EDIT_VACCINATOR_FAILURE:
      return {
        ...state,
        isVaccinatorEdited: false,
      };

    case userListConstants.GET_VACCINATOR_DETAILS_REQUEST:
      return {
        ...state,
        isLoaded: false,
      };
    case userListConstants.GET_VACCINATOR_DETAILS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        singleVaccinatorList: action.data,
      };
    case userListConstants.GET_VACCINATOR_DETAILS_FAILURE:
      return {
        ...state,
        isLoaded: true,
      };

    case userListConstants.DELETE_VACCINATOR_REQUEST:
      return {
        ...state,
      };
    case userListConstants.DELETE_VACCINATOR_SUCCESS:
      return {
        ...state,
      };
    case userListConstants.DELETE_VACCINATOR_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default UserList;
