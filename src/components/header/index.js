import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import logo from "../../assests/images/logo.svg";
import useWindowDimensions from "../../helpers/window-dimensions";
import menuIcon from "../../assests/images/menu-icon.svg";

export const Header = ({ headerMenu, toggleNavMenu }) => {
  const { isMobileView } = useWindowDimensions();
  const history = useHistory();
  return (
    <div className="fixed w-full h-16 bg-white border-b-2 bg-opacity-70 z-20">
      <div className="mx-8 xl:mx-auto flex justify-between items-center max-w-1200 xxl:max-w-1440 h-full">
        <img src={logo} alt="logo" />
        {isMobileView ? (
          <div className="flex items-center">
            <img src={menuIcon} onClick={toggleNavMenu} alt="menu" />
            <p className="text-lg text-black pl-4" onClick={toggleNavMenu}>
              Menu
            </p>
          </div>
        ) : (
          <div className="flex items-center">
            {headerMenu.map((value) => (
              <Link
                key={value.href}
                className="text-base text-black mr-12"
                to={value.href}
              >
                {value.label}
              </Link>
            ))}
          </div>
        )}
        {isMobileView ? null : (
          <Button
            onClick={() => history.push("/login")}
            className="w-25 bg-blue-600 text-white border-none outline-none shadow-custom rounded-md text-base"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};
