import { Form, Button, Input } from "antd";
import { Link, useHistory } from "react-router-dom";
import RegisterationLayout from "../../layouts/hybrid/registeration-layout";
import { useDispatch } from "react-redux";
import {
  appGetCurrentVersion,
  userLogin,
} from "../../appRedux/actions/Authentication";
import { showMessage } from "../../helpers/message";
import { roleConstants } from "../../appRedux/constants";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { AppVersion } from "@ionic-native/app-version";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const inputStyleClass = "w-full rounded-md h-14 shadow-md";

  useEffect(() => {
    navigatePostLogin();
    if (Capacitor.isNativePlatform()) {
      dispatch(
        appGetCurrentVersion((appData) => {
          AppVersion.getVersionNumber().then((result) => {
            AppVersion.getVersionCode().then((response) => {
              if (Capacitor.getPlatform() === "ios") {
                if (
                  appData.data &&
                  (appData.data.ios_version_no != result.toString() ||
                    appData.data.ios_build_no != response.toString())
                ) {
                  history.push("/version-error-ios");
                  // let ans = window.confirm(
                  //   "Your Raya Health application is out of date. Please download the latest version to continue using the app!"
                  // );
                  // if (ans) {
                  //   App.exitApp();
                  // } else {
                  //   App.exitApp();
                  // }
                }
              }
              if (Capacitor.getPlatform() === "android") {
                if (
                  appData.data &&
                  (appData.data.android_version_no != result.toString() ||
                    appData.data.android_build_no != response.toString())
                ) {
                  history.push("/version-error-android");
                  // let ans = window.confirm(
                  //   "Your Raya Health application is out of date. Please download the latest version to continue using the app!"
                  // );
                  // if (ans) {
                  //   App.exitApp();
                  // } else {
                  //   App.exitApp();
                  // }
                }
              }
            });
          });
        })
      );

      App.addListener("backButton", (e) => {
        const pathList = ["/login", "/patient/dashboard"];
        if (pathList.includes(window.location.pathname)) {
          // Show A Confirm Box For User to exit app or not
          let ans = window.confirm("Are you sure you want to exit?");
          if (ans) {
            App.exitApp();
          }
        } else {
          history.goBack();
        }
      });
    }
  }, []);

  const navigatePostLogin = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.user_type === roleConstants.ADMIN_ROLE) {
        history.push("/admin/patient-list");
      } else if (user.user_type === roleConstants.STAFF_ROLE) {
        history.push("/staff/userdata-list");
      } else {
        history.push("/patient/dashboard");
      }
    } else {
      history.push("/login");
    }
  };

  const onFinish = (values) => {
    dispatch(
      userLogin(
        {
          email: values.email,
          password: values.password,
        },
        (response) => {
          const { data, message } = response;
          localStorage.setItem("user", JSON.stringify(data));
          showMessage("success", message);
          navigatePostLogin();
        }
      )
    );
  };

  return (
    <RegisterationLayout>
      <h2 className="text-center mt-8">Welcome to Raya Health</h2>
      <h3 className="text-center mt-4">Login</h3>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        className="pt-8"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please Enter Your Email",
            },
            {
              type: "email",
              message: "Please enter a valid Email",
            },
          ]}
        >
          <Input className={inputStyleClass} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please Enter Your Password",
            },
          ]}
        >
          <Input.Password
            className={inputStyleClass}
            type="password"
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item className="mb-2">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 text-xl rounded-md"
          >
            Login
          </Button>
        </Form.Item>
        <Link className="text-lg text-blue-500 mb-2" to="/reset-password">
          Forgot Password?
        </Link>

        <p className="text-lg text-gray-900 ">
          Don't have an account?
          <Link className="text-lg text-blue-500 pl-2" to="/signup">
            Sign up
          </Link>
        </p>
      </Form>
    </RegisterationLayout>
  );
};

export default Login;
