import { appSettingsConstant } from "../constants";

const initialSettings = {
  sideBarMenuItem: [],
};

const AppSettings = (state = initialSettings, action) => {
  switch (action.type) {
    case appSettingsConstant.SET_SIDE_BAR_MENU_ITEM:
      return {
        ...state,
        sideBarMenuItem: action.data,
      };

    default:
      return state;
  }
};

export default AppSettings;
