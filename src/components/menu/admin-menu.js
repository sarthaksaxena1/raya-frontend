import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyringe,
  faHospitalUser,
  faUser,
  faMapMarkerAlt,
  faHospital,
  faSignOutAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { roleConstants } from "../../appRedux/constants";

export const AdminMenu = () => {
  const history = useHistory();
  const { sideBarMenuItem } = useSelector(({ appSettings }) => appSettings);

  const handleNavigate = ({ key }) => {
    if (user.user_type === roleConstants.ADMIN_ROLE) {
      if (key === "logout") {
        history.push("/logout");
      } else {
        history.push("/admin/" + key);
      }
    } else {
      if (key === "logout") {
        history.push("/logout");
      } else {
        history.push("/staff/" + key);
      }
    }
  };

  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <Menu
      onSelect={handleNavigate}
      selectedKeys={sideBarMenuItem}
      mode="inline"
    >
      {user.user_type === roleConstants.ADMIN_ROLE ? (
        <Menu.Item
          key="patient-list"
          className="text-xs"
          icon={<FontAwesomeIcon icon={faHospitalUser} />}
        >
          Patient List
        </Menu.Item>
      ) : null}

      <Menu.Item
        key="userdata-list"
        className="text-xs"
        icon={<FontAwesomeIcon icon={faUser} />}
      >
        {user.user_type === roleConstants.ADMIN_ROLE
          ? "Registered Users"
          : "Patient List"}
      </Menu.Item>

      {user.user_type === roleConstants.STAFF_ROLE ? (
        <Menu.Item
          key="vaccinator-list"
          className="text-xs"
          icon={<FontAwesomeIcon icon={faUsers} />}
        >
          Vaccinator List
        </Menu.Item>
      ) : null}
      {user.user_type === roleConstants.ADMIN_ROLE ? (
        <Menu.Item
          key="vaccine-list"
          className="text-xs"
          icon={<FontAwesomeIcon icon={faSyringe} />}
        >
          Vaccine List
        </Menu.Item>
      ) : null}
      {user.user_type === roleConstants.ADMIN_ROLE ? (
        <Menu.Item
          key="locations"
          className="text-xs"
          icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
        >
          Location List
        </Menu.Item>
      ) : null}
      {user.user_type === roleConstants.ADMIN_ROLE ? (
        <Menu.Item
          key="vaccination-slot-list"
          className="text-xs"
          icon={<FontAwesomeIcon icon={faHospital} />}
        >
          Vaccination Slot List
        </Menu.Item>
      ) : null}
      <Menu.Item
        key="logout"
        className="text-xs"
        icon={<FontAwesomeIcon icon={faSignOutAlt} />}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};
