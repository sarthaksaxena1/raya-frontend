import { appSettingsConstant } from "../constants";

export const setSideBarMenuItem = (sideBarMenuItem) => {
  return (dispatch) => {
    let sideBarMenu = [];
    sideBarMenu.push(sideBarMenuItem);
    dispatch({
      type: appSettingsConstant.SET_SIDE_BAR_MENU_ITEM,
      data: sideBarMenu,
    });
  };
};
