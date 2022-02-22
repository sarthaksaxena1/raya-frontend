import { Input, Button, Form, Space, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { FormScreenLayout } from "../../layouts/screens/form-screen";
import {
  addVaccinatorList,
  editVaccinator,
  getVaccinatorDetails,
} from "../../appRedux/actions/UserList";

export const AddVaccinator = (props) => {
  const [form] = Form.useForm();
  const { vaccinator_id } = props.match.params;
  const { isLoaded, isVaccinatorAdded, singleVaccinatorList } = useSelector(
    ({ userList }) => userList
  );
  const [editFlag, setEditFlag] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (vaccinator_id) {
      setEditFlag(true);
      dispatch(getVaccinatorDetails(vaccinator_id));
    }
  }, []);

  useEffect(() => {
    if (isLoaded && editFlag) {
      form.setFieldsValue(singleVaccinatorList);
    }
  }, [isVaccinatorAdded, isLoaded]);

  const onFinish = (values) => {
    console.log(values);
    const postData = {
      code: values.code,
      name: values.name,
    };

    if (editFlag) {
      dispatch(
        editVaccinator(vaccinator_id, postData, () => {
          form.resetFields();
          history.push("/staff/vaccinator-list");
        })
      );
    } else {
      dispatch(
        addVaccinatorList(postData, () => {
          form.resetFields();
          history.push("/staff/vaccinator-list");
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
          <span className="pt-1">{editFlag ? "Edit" : "Add"} Vaccinator</span>
        </h2>
      </div>
      <FormScreenLayout
        formWidth={12}
        formTitle={editFlag ? "Edit Vaccinator" : "Add Vaccinator"}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Vaccinator Name"
            className="mb-2"
            rules={[
              {
                required: true,
                message: "Please enter vaccinator name!",
              },
              { max: 60, message: "Maximum 60 characters allowed !" },
            ]}
          >
            <Input placeholder="Vaccinator name" />
          </Form.Item>
          <Form.Item
            name="code"
            label="PRC License Number"
            className="mb-2"
            rules={[
              {
                required: true,
                message: "Please enter vaccinator PRC license  number!",
              },
              { max: 20, message: "Maximum 20 characters allowed !" },
            ]}
          >
            <Input className="w-full" placeholder="PRC license number" />
          </Form.Item>

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
