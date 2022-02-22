import { Form, Button, DatePicker, Select, Input } from "antd";
import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import {
  getPatientProfileDetails,
  editPatientProfile,
  resetProfileForm,
} from "../../appRedux/actions/PatientProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ceirFormFeildsData } from "../../helpers/ceir-form-feilds-data";

const { Option } = Select;

const EditUserProfile = (props) => {
  const { preferredLocationData } = ceirFormFeildsData();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { patient_id } = props.match.params;
  const patientProfileData = useSelector(
    (state) => state.patientProfile.patientProfileData
  );
  const isLoaded = useSelector((state) => state.patientProfile.isLoaded);
  const inputStyleClass = "w-full rounded-md h-14 shadow-md";

  useEffect(() => {
    dispatch(getPatientProfileDetails());
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      first_name: patientProfileData.first_name,
      middle_name: patientProfileData.middle_name
        ? patientProfileData.middle_name
        : " ",
      last_name: patientProfileData.last_name,
      date_of_birth: moment(patientProfileData.date_of_birth, "YYYY-MM-DD"),
      mobile: patientProfileData.mobile,
      email: patientProfileData.email,
      gender: patientProfileData.gender,
      preferred_location: patientProfileData.preferred_location,
    });
  }, [isLoaded]);

  const onFinish = (values) => {
    const postData = {
      first_name: values.first_name,
      middle_name: values.middle_name,
      last_name: values.last_name,
      mobile: values.mobile,
      email: values.email,
      gender: values.gender,
      date_of_birth: moment(values.date_of_birth._d).format("YYYY-MM-DD"),
      preferred_location: values.preferred_location,
    };

    dispatch(
      editPatientProfile(patient_id, postData, () => {
        dispatch(resetProfileForm());
        history.push("/patient/profile");
        dispatch(getPatientProfileDetails());
      })
    );
  };

  return (
    <MobilePagesScreenLayout
      pageTitle="Edit Profile"
      userIcon={false}
      showRayaLogo={false}
    >
      <Form className="pt-8 raya-signup-form" form={form} onFinish={onFinish}>
        <Form.Item
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please Enter Your First Name",
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
              message: "Please Enter Your Last Name",
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
          name="mobile"
        >
          <Input
            className={inputStyleClass}
            placeholder="Contact Number"
            disabled={true}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
            {
              type: "email",
              message: "Please enter valid email",
            },
          ]}
          name="email"
        >
          <Input
            className={inputStyleClass}
            placeholder="Email"
            disabled={true}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Please Enter Date of Birth",
            },
          ]}
          name="date_of_birth"
        >
          <DatePicker
            placeholder="Enter Date of Birth"
            className={inputStyleClass + " date-text-lg"}
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
            <Option className="text-lg" value="Male">
              Male
            </Option>
            <Option className="text-lg" value="Female">
              Female
            </Option>
            <Option className="text-lg" value="Other">
              Other
            </Option>
          </Select>
        </Form.Item>
        {patientProfileData.preferred_location != null &&
        patientProfileData.is_allocated_vaccine === false ? (
          <Form.Item
            name="preferred_location"
            rules={[
              {
                required: true,
                message: "Please select your preferred location ",
              },
            ]}
          >
            <Select placeholder="Preferred vaccination location" size="large">
              {preferredLocationData.map((val) => (
                <Option value={val.key}>{val.value}</Option>
              ))}
            </Select>
          </Form.Item>
        ) : null}
        <Form.Item className="mb-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 text-xl rounded-md"
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </MobilePagesScreenLayout>
  );
};
export default EditUserProfile;
