import { Form, Button, Upload, notification, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  adminUploadPatient,
  getAdminUploadedPatientData,
} from "../../appRedux/actions/UploadPatient";
import { FormScreenLayout } from "../../layouts/screens/form-screen";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const UploadPatient = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const [fileList, setfileList] = useState([]);

  const onFinish = (values) => {
    let formData = new FormData();
    formData.append("excel_file", values.upload[0].originFileObj);
    dispatch(
      adminUploadPatient(formData, (response) => {
        dispatch(
          getAdminUploadedPatientData((uploadedData) => {
            const csvReport = {
              data: uploadedData.data.data,
              headers: uploadedData.data.headers,
              filename: "uploaded_patients.csv",
            };

            notification.success({
              message: <span className="mt-4 text-lg">{response.message}</span>,
              description: (
                <Row className="-mx-1 mt-2">
                  <Col xs={12} className="px-1">
                    <h2 className="text-green-500 text-2xl">
                      {response.data.uploaded_data}
                    </h2>
                    <p className="text-gray-700">Records added</p>
                    <span className="text-blue-500">
                      <CSVLink {...csvReport}>Uploaded Records</CSVLink>
                    </span>
                  </Col>
                  <Col xs={12} className="px-1">
                    <h2 className="text-red-500 text-2xl">
                      {response.data.pending_data}
                    </h2>
                    <p className="text-gray-700">Records skipped</p>
                  </Col>
                </Row>
              ),
            });
            history.push("/admin/patient-list");
          })
        );
      })
    );
  };

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

  const navigateBack = () => {
    history.goBack();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="flex align-center">
          <LeftOutlined
            onClick={navigateBack}
            className="mr-2 text-2xl leading-none flex items-center mt-1"
          />
          <span className="pt-1">Upload Patient</span>
        </h2>
      </div>
      <FormScreenLayout formTitle="Upload patient details">
        <p>
          Click here to download
          <a href="/data.xlsx">
            <strong className="text-blue-500 ml-2">Sample Import File</strong>
          </a>
        </p>
        <p>&nbsp;</p>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Only .xlsx file accepted"
          >
            <Upload
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              maxCount={1}
              onRemove={handleRemove}
              beforeUpload={handleBeforeUpload}
              fileList
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={fileList.length < 1}
            >
              Upload
            </Button>
          </Form.Item>
        </Form>
      </FormScreenLayout>
    </div>
  );
};
