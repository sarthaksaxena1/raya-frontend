import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
import { Form, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../helpers/message";
import { patientPreferredVaccinationLocation } from "../../appRedux/actions/PatientVaccinationBookings";
import { getPatientProfileDetails } from "../../appRedux/actions/PatientProfileDetails";
import { ceirFormFeildsData } from "../../helpers/ceir-form-feilds-data";

const { Option } = Select;

const SelectPreferredLocation = () => {
  const { preferredLocationData } = ceirFormFeildsData();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [patientId, setPatientId] = useState("");
  const patientProfileData = useSelector(
    (state) => state.patientProfile.patientProfileData
  );

  useEffect(() => {
    dispatch(
      getPatientProfileDetails(() => {
        setPatientId(patientProfileData?.id);
      })
    );
  }, []);

  const onFinish = (values) => {
    const postData = {
      preferred_location: values.preferred_location,
    };
    dispatch(
      patientPreferredVaccinationLocation(patientId, postData, () => {
        showMessage("success", "Location selected succcessfully!");
        form.resetFields();
        history.push("/patient/dashboard");
      })
    );
  };

  return (
    <MobilePagesScreenLayout
      pageTitle="Select Location"
      userIcon={false}
      showRayaLogo={false}
    >
      <Form
        layout="vertical"
        className="raya-signup-form"
        form={form}
        onFinish={onFinish}
        onFinishFailed={() =>
          showMessage(
            "error",
            "You may have missed answers for few fields. Please recheck and Submit!"
          )
        }
      >
        <Form.Item
          name="preferred_location"
          label="Select your preferred vaccination location "
          className="pt-4"
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
        <Form.Item className="mb-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 text-xl rounded-md pl-2"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MobilePagesScreenLayout>
  );
};
export default SelectPreferredLocation;
