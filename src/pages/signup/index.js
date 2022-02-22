import { Form, Button, DatePicker, Select, Checkbox, Input } from "antd";
import { Link, useHistory } from "react-router-dom";
import { React, useEffect } from "react";
import RegisterationLayout from "../../layouts/hybrid/registeration-layout";
import { useSelector, useDispatch } from "react-redux";
import { setSignUpFeildsData } from "../../appRedux/actions/Authentication";
import moment from "moment";
import { setMedicalFormData } from "../../appRedux/actions/MedicalHistory";
const { Option } = Select;

const PatientSignUp = () => {
  const getSignupFeildsData = useSelector(
    (state) => state.authentication.signupFeildsData
  );
  const isLoaded = useSelector((state) => state.authentication.isLoaded);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };
  useEffect(() => {
    form.setFieldsValue({
      first_name: getSignupFeildsData.first_name,
      last_name: getSignupFeildsData.last_name,
      middle_name: getSignupFeildsData.middle_name,
      date_of_birth: getSignupFeildsData.date_of_birth
        ? moment(getSignupFeildsData.date_of_birth, "YYYY-MM-DD")
        : "",
      mobile: getSignupFeildsData.mobile,
      email: getSignupFeildsData.email,
      gender: getSignupFeildsData.gender,
      password: getSignupFeildsData.password,
    });
  }, [getSignupFeildsData, isLoaded]);

  const onFinish = (values) => {
    const postData = {
      password: values.password,
      user_type: "Patient",
      email: values.email,
      mobile: values.mobile,
      first_name: values.first_name,
      last_name: values.last_name,
      middle_name: values.middle_name,
      date_of_birth: moment(values.date_of_birth._d).format("YYYY-MM-DD"),
      gender: values.gender,
    };
    dispatch(setSignUpFeildsData(postData));
    history.push("/patient/add-medical-history-registration/1");
  };

  const inputStyleClass = "w-full rounded-md h-14 shadow-md";

  const resetFormFeilds = () => {
    dispatch(setSignUpFeildsData({}));
    dispatch(setMedicalFormData({}));
    history.push("/login");
  };
  return (
    <RegisterationLayout>
      <h3 className="text-center mt-8">Create an account</h3>
      <Form className="pt-8 raya-signup-form" form={form} onFinish={onFinish}>
        <Form.Item
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please enter your first name",
            },
            {
              max: 30,
              message: "Maximum 30 characters allowed!",
            },
          ]}
        >
          <Input className={inputStyleClass} placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="middle_name"
          rules={[
            {
              required: true,
              message: "Please enter your middle name",
            },
            {
              max: 30,
              message: "Maximum 30 characters allowed!",
            },
          ]}
        >
          <Input className={inputStyleClass} placeholder="Middle Name" />
        </Form.Item>

        <Form.Item
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please enter your last name",
            },
            {
              max: 30,
              message: "Maximum 30 characters allowed!",
            },
          ]}
        >
          <Input className={inputStyleClass} placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="mobile"
          rules={[
            {
              required: true,
              message: "Please enter your contact number",
            },
            {
              pattern: /^0?[2-9]\d{9}$/,
              message: "Please enter valid contact number",
            },
          ]}
        >
          <Input className={inputStyleClass} placeholder="Contact Number" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              pattern: /^[a-z0-9._]+@[a-z0-9-]+\.[a-zA-Z0-9-.]+$/,

              message: "Please enter a valid email",
            },

            {
              required: true,
              message: "Please enter your E-mail",
            },
          ]}
        >
          <Input className={inputStyleClass} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d|\W))(?=.*[^\w\d]).{8,}$/,
              message:
                "Password must be atleast 8 characters and must include atleast 1 uppercase, 1 lowercase, 1 number and 1 special character",
            },
          ]}
        >
          <Input.Password className={inputStyleClass} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            className={inputStyleClass}
            placeholder="Re-enter your password"
          />
        </Form.Item>

        <Form.Item
          name="date_of_birth"
          rules={[
            {
              required: true,
              message: "Please enter your date of birth",
            },
          ]}
        >
          <DatePicker
            placeholder="Date of Birth"
            className={inputStyleClass}
            disabledDate={disabledDate}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          rules={[
            {
              required: true,
              message: "Please select your gender",
            },
          ]}
        >
          <Select placeholder="Gender" size="large">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="terms"
          className="inline"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Please accept the Terms and Services")
                    ),
            },
          ]}
        >
          <Checkbox>
            <p className="text-base relative">
              I agree to{" "}
              {/* <Link to="/signup/terms-and-services" target="_blank"> */}
              <b>Terms and Services</b>
              {/* </Link> */}
            </p>
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="consent"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Please accept the Consent")),
            },
          ]}
        >
          <Checkbox className="text-base pt-0">
            Subscribe to The Raya Clinic updates
          </Checkbox>
        </Form.Item>

        <Form.Item className="mb-2 text-center">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 text-xl rounded-md text-center"
          >
            <p className="text-center "> Next </p>
          </Button>
        </Form.Item>
        <p className="text-lg text-gray-900">
          Have an account?
          <button
            type="link"
            className="text-lg text-blue-500 pl-2"
            to="/login"
            onClick={() => resetFormFeilds()}
          >
            Login
          </button>
        </p>
      </Form>
    </RegisterationLayout>
  );
};

export default PatientSignUp;
