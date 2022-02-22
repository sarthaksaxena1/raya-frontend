import { Input, Button, Form, Space, InputNumber, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminEditVaccine,
  adminAddVaccine,
  resetVaccine,
  getAdminVaccineDetails,
} from "../../appRedux/actions/VaccineList";

import { FormScreenLayout } from "../../layouts/screens/form-screen";
import { useHistory } from "react-router-dom";

export const AddVaccine = (props) => {
  const [form] = Form.useForm();

  const { vaccine_id } = props.match.params;
  const { isVaccineAdded, isLoaded, vaccineList, isVaccineEdited } =
    useSelector(({ vaccineList }) => vaccineList);
  const [editFlag, setEditFlag] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (vaccine_id) {
      setEditFlag(true);
      dispatch(getAdminVaccineDetails(vaccine_id));
    }
  }, []);

  useEffect(() => {
    if (isVaccineAdded || isVaccineEdited) {
      form.resetFields();
      props.history.push("/admin/vaccine-list");
    }
    if (isLoaded && editFlag) {
      form.setFieldsValue(vaccineList);
    }
  }, [isVaccineAdded, isVaccineEdited, isLoaded]);

  const onFinish = (values) => {
    const postData = {
      name: values.name,
      vaccine_manufacturer: values.vaccine_manufacturer,
      batch_number: values.batch_number,
      details: values.details,
      min_cooling_period_days: values.min_cooling_period_days,
      max_cooling_period_days: values.max_cooling_period_days,
    };

    if (editFlag) {
      dispatch(
        adminEditVaccine(vaccine_id, postData, () => {
          dispatch(resetVaccine());
        })
      );
    } else {
      dispatch(
        adminAddVaccine(postData, () => {
          dispatch(resetVaccine());
        })
      );
    }
  };

  const navigateToVaccineList = () => {
    history.push("/admin/vaccine-list");
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
          <span className = 'pt-1'>{editFlag ? "Edit" : "Add"} Vaccine</span>
        </h2>
      </div>
      <FormScreenLayout
        formWidth={12}
        formTitle={editFlag ? "Edit Vaccine" : "Add Vaccine"}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          validateTrigger="onBlur"
        >
          <Form.Item
            name="name"
            label="Name"
            className="mb-2"
            rules={[
              {
                required: true,
                message: "Please enter Vaccine name!",
              },
              {
                max: 60,
                message: "Maximum 60 characters allowed!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="vaccine_manufacturer"
            label="Manufacturer"
            className="mb-2"
            rules={[
              {
                required: true,
                message: "Please enter Manufacturer name!",
              },
              {
                max: 60,
                message: "Maximum 60 characters allowed!",
              },
            ]}
          >
            <Input placeholder="Manufacturer" />
          </Form.Item>
          <Form.Item
            name="batch_number"
            label="Lot No"
            className="mb-2"
            rules={[
              {
                required: true,
                message: "Please enter lot Number!",
              },
              {
                max: 10,
                message: "Maximum 10 characters allowed!",
              },
            ]}
          >
            <Input placeholder="Lot number" />
          </Form.Item>

          <Row className="-mx-4">
            <Col xs={12} className="px-4">
              <Form.Item
                name="min_cooling_period_days"
                label="Minimum Cooling Period"
                className="mb-2"
                rules={[
                  {
                    required: true,
                    message: "Please enter Minimum cooling period!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Minimum Cooling Period"
                  min={0}
                  max={1000}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col xs={12} className="px-4">
              <Form.Item
                name="max_cooling_period_days"
                label="Maximum Cooling Period"
                className="mb-2"
                dependencies={["min_cooling_period_days"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter Maximum cooling period!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        getFieldValue("min_cooling_period_days") <= value
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Maximum cooling period cannot be less that Minimum cooling period"
                        )
                      );
                    },
                  }),
                ]}
              >
                <InputNumber
                  placeholder="Maximum Cooling Period"
                  min={0}
                  max={1000}
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="details"
            label="Details"
            className="mb-2"
            rules={[
              {
                required: true,
                message: "Please enter details!",
              },
            ]}
          >
            <Input placeholder="Details" />
          </Form.Item>

          <Form.Item className="mt-6">
            <Space className="flex mb-2" align="baseline">
              <Button type="primary" htmlType="submit">
                Save
              </Button>

              <Button type="secondary" onClick={navigateToVaccineList}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </FormScreenLayout>
    </div>
  );
};
