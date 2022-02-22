import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assests/images/logo.svg";
import closeIcon from "../../assests/images/menu-close.svg";

export const MobileSidebar = ({ headerMenu, showNavMenu, toggleNavMenu }) => {
  const history = useHistory();
  return (
    <div
      style={{ top: showNavMenu ? 0 : "-100%" }}
      className="w-full z-50 bg-black bg-opacity-75 h-full flex flex-col fixed transition-all duration-300 overflow-hidden"
    >
      <div className="flex items-center justify-between pt-4 mx-8 h-20">
        <img src={logo} alt="logo" />
        <img onClick={toggleNavMenu} src={closeIcon} alt="menu" />
      </div>
      <div className="flex flex-col items-center mt-12 flex-grow overflow-y-auto">
        {headerMenu.map((value) => (
          <Link
            key={value.href}
            className="text-lg text-white mb-8"
            onClick={toggleNavMenu}
            to={value.href}
          >
            {value.label}
          </Link>
        ))}
        <Button
          onClick={() => history.push("/login")}
          className="w-25 bg-gray-500 border-none outline-none shadow-custom rounded-md text-base mb-8"
        >
          Login
        </Button>
      </div>
    </div>
  );
};
