import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
import { Form, Button, Upload, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { showMessage } from "../../helpers/message";
import {
  getPatientCeirDetails,
  patientEditCeir,
} from "../../appRedux/actions/PatientProfileDetails";
import { ceirFormFeildsData } from "../../helpers/ceir-form-feilds-data";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const { Option } = Select;

const UploadComorbidityProof = () => {
  const { hasComorbidityData } = ceirFormFeildsData();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [fileList, setfileList] = useState([]);
  const { patientCeirData } = useSelector(
    ({ patientProfile }) => patientProfile
  );

  useEffect(() => {
    dispatch(getPatientCeirDetails());
  }, []);

  const handleRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setfileList(newFileList);
  };

  const handleBeforeUpload = (file) => {
    setfileList([...fileList, file]);
    return false;
  };

  const onFinish = (values) => {
    let formData = new FormData();
    formData.append("commorbidity", values.commorbidity);
    formData.append("commorbidity_doc", values.upload[0].originFileObj);
    dispatch(
      patientEditCeir(patientCeirData.id, formData, () => {
        showMessage("success", "CEIR details edited succcessfully!");
        form.resetFields();
        history.push("/patient/dashboard");
      })
    );
  };
  const inputStyleClass = "w-full rounded-md h-14 shadow-md";
  return (
    <MobilePagesScreenLayout
      pageTitle="Upload Proof"
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
          name="commorbidity"
          label="Select your comorbidity"
          className = 'pt-4'
          rules={[
            {
              required: true,
              message: "Please select your comorbidity",
            },
          ]}
        >
          <Select placeholder="Comorbidity" size="large">
            {hasComorbidityData.map((val) => (
              <Option value={val.key}>{val.value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          className="font-semibold"
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Only image or pdf format file accepted"
          rules={[
            {
              required: true,
              message: "Please upload proof",
            },
          ]}
        >
          <Upload
            listType="picture"
            accept="image/*,.pdf"
            maxCount={1}
            onRemove={handleRemove}
            beforeUpload={handleBeforeUpload}
            fileList
          >
            <Button className={inputStyleClass} icon={<UploadOutlined />}>
              Upload Comorbidity proof{" "}
            </Button>
          </Upload>
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
export default UploadComorbidityProof;