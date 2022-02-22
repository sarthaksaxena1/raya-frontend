import { Input, Button, Form, Space, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  adminEditLocation,
  adminAddLocation,
  resetLocation,
  getAdminLocationDetails,
} from "../../appRedux/actions/VaccineLocation";
import { LeftOutlined } from "@ant-design/icons";
import { FormScreenLayout } from "../../layouts/screens/form-screen";

export const AddLocation = (props) => {
  const [form] = Form.useForm();
  const { location_id } = props.match.params;
  const { isLocationAdded, isLoaded, locationList, isLocationEdited } =
    useSelector(({ vaccineLocations }) => vaccineLocations);
  const [editFlag, setEditFlag] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { TextArea } = Input;

  useEffect(() => {
    if (location_id) {
      setEditFlag(true);
      dispatch(getAdminLocationDetails(location_id));
    }
  }, []);

  useEffect(() => {
    if (isLocationAdded || isLocationEdited) {
      form.resetFields();
      history.push("/admin/locations");
    }
    if (isLoaded && editFlag) {
      form.setFieldsValue(locationList);
    }
  }, [isLocationAdded, isLocationEdited, isLoaded]);

  const onFinish = (values) => {
    const postData = {
      name: values.name,
      address: values.address,
      // city: values.city,
      postal_code: values.postal_code,
      cbcr: values.cbcr,
    };

    if (editFlag) {
      dispatch(
        adminEditLocation(location_id, postData, () => {
          dispatch(resetLocation());
        })
      );
    } else {
      dispatch(
        adminAddLocation(postData, () => {
          dispatch(resetLocation());
        })
      );
    }
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
          <span className="pt-1">{editFlag ? "Edit" : "Add"} Location</span>
        </h2>
      </div>
      <FormScreenLayout
        formWidth={12}
        formTitle={editFlag ? "Edit Location" : "Add Location"}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Site Name"
            className="mb-2"
            rules={[
              {
                required: true,
                message: "Please enter Site name!",
              },
              { max: 60, message: "Maximum 60 characters allowed !" },
            ]}
          >
            <Input placeholder="Site name" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            className="mb-2"
            rules={[
              {
                required: true,
                message: "Please enter Address!",
              },
            ]}
          >
            <TextArea
              placeholder="Address"
              rows={6}
              showCount
              maxLength={100}
            />
          </Form.Item>
          <Row className="-mx-4">
            <Col xs={12} className="px-4">
              <Form.Item
                name="cbcr"
                label="CBCR Code"
                className="mb-2"
                rules={[
                  {
                    required: true,
                    message: "Please enter CBCR Code!",
                    
                  },
                  () => ({
                    validator(_, value) {
                      if (!!value && value.toString().length > 8) {
                        return Promise.reject(
                          new Error("Maximum 8 characters allowed")
                        );
                      } else {
                        if (!value || !isNaN(value)) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            new Error("CBCR code must be a number!")
                          );
                        }
                      }
                    },
                  }),
                ]}
              >
                <Input placeholder="CBCR code" max={10} />
              </Form.Item>
            </Col>
            <Col xs={12} className="px-4">
              <Form.Item
                name="postal_code"
                label="Postal Code"
                className="mb-2"
                rules={[
                  {
                    required: true,
                    message: "Please enter Postal Code!",
                  },
                  { max: 10, message: "Maximum 10 characters allowed" },
                  () => ({
                    validator(_, value) {
                      if (!value || !isNaN(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Postal code must be a number!")
                      );
                    },
                  }),
                ]}
              >
                <Input placeholder="Postal code" max={10} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="mt-6">
            <Space className="flex mb-2" align="baseline">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button type="secondary" onClick={navigateBack}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </FormScreenLayout>
    </div>
  );
};
