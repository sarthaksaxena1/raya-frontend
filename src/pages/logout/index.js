import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogout } from "../../appRedux/actions/Authentication";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!!user) {
      dispatch(
        userLogout(() => {
          history.push("/login");
        })
      );
    } else {
      history.push("/login");
    }
  }, []);

  return <></>;
};

export default Logout;
