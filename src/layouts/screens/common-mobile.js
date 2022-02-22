import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../../helpers/window-dimensions";
export const MobilePagesScreenLayout = ({
  children,
  pageTitle,
  showRayaLogo,
  userIcon,
}) => {
  const history = useHistory();
  const { height } = useWindowDimensions();

  return (
    <div className="bg-white h-screen overflow-hidden">
      <div className="flex items-center justify-between bg-blue-700 px-4 py-2 h-16 fixed w-full z-10">
        {showRayaLogo ? (
          <div className="w-12">
            <img
              src="/mobilescreen_raya_logo.png"
              alt="raya-logo"
              className="w-full h-auto"
            />
          </div>
        ) : (
          <h2 className="flex align-center text-2xl font-normal text-white ">
            <LeftOutlined
              onClick={() => history.goBack()}
              className="mr-2 text-2xl leading-none flex items-center mt-1"
            />
            <span className="pl-1 pt-1">{pageTitle}</span>
          </h2>
        )}

        {userIcon ? (
          <Avatar
            className=" flex items-center justify-center bg-gray-500 mt-1 mb-1"
            size={36}
            onClick={() => history.push("/patient/profile")}
            icon={<UserOutlined />}
          />
        ) : (
          null
        )}
      </div>
      <div style={{height:height-80}} className="px-4 mt-20 overflow-y-auto">{children}</div>
    </div>
  );
};
