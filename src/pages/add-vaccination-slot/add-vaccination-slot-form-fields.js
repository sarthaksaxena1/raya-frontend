import {
  Input,
  Button,
  Form,
  Select,
  DatePicker,
  Space,
  Radio,
  InputNumber,
  TimePicker,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getAdminVaccineLocationList } from "../../appRedux/actions/VaccineLocation";
import { getAdminVaccineList } from "../../appRedux/actions/VaccineList";
import moment from "moment";

const { Option } = Select;

export const AddVaccinationSlotFormFields = ({ editFlag }) => {
  const [locationData, setLocationData] = useState([]);
  const [vaccineData, setVaccineData] = useState([]);

  const { vaccineLocationList } = useSelector(
    ({ vaccineLocations }) => vaccineLocations
  );
  const { vaccineListData, isLoaded } = useSelector(
    ({ vaccineList }) => vaccineList
  );
  const isLocationLoaded = useSelector(
    ({ vaccineLocations }) => vaccineLocations.isLoaded
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAdminVaccineLocationList({}, () => {
        dispatch(getAdminVaccineList({}));
      })
    );
  }, []);

  useEffect(() => {
    if (!!vaccineLocationList.data) {
      let finalLocationData = vaccineLocationList.data
        .filter(function (value) {
          return value.status > 0;
        })
        .map((value) => ({
          id: value.id,
          name: value.name,
        }));
      setLocationData(finalLocationData);
    } else {
      setLocationData([]);
    }
    if (!!vaccineListData.data) {
      let finalVaccineData = vaccineListData.data
        .filter(function (value) {
          return value.status > 0;
        })
        .map((value) => ({
          id: value.id,
          name: value.name,
        }));
      setVaccineData(finalVaccineData);
    } else {
      setVaccineData([]);
    }
  }, [isLoaded, isLocationLoaded]);

  return (
    <>
      <Form.Item
        name="name"
        label="Slot Name"
        className="mb-2"
        rules={[
          {
            required: true,
            message: "Please enter Slot name!",
          },
          {
            max: 60,
            message: "Maximum 60 characters allowed!",
          },
        ]}
      >
        <Input placeholder="Slot Name" />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        className="mb-2"
        rules={[
          {
            required: true,
            message: "Please select Location!",
          },
        ]}
      >
        <Select
          placeholder="Location"
          showSearch
          optionFilterProp="children"
          filterOption={true}
        >
          {locationData.map((val) => (
            <Option key={val.id} value={val.id}>
              {val.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="vaccine"
        label="Vaccine"
        className="mb-2"
        rules={[
          {
            required: true,
            message: "Please select Vaccine!",
          },
        ]}
      >
        <Select
          placeholder="Vaccine"
          showSearch
          optionFilterProp="children"
          filterOption={true}
        >
          {vaccineData.map((val) => (
            <Option key={val.id} value={val.id}>
              {val.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="dose_number"
        label="Dose Number"
        className="mb-2"
        rules={[
          {
            required: true,
            message: "Please select Dose number!",
          },
        ]}
      >
        <Radio.Group>
          <Radio value="1">1</Radio>
          <Radio value="2">2</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="date"
        label="Date"
        className="mb-2"
        rules={[
          {
            type: "object",
            required: true,
            message: "Please select Date!",
          },
        ]}
      >
        <DatePicker
          disabledDate={(current) => {
            return current && current < moment(new Date());
          }}
        />
      </Form.Item>

      {!editFlag ? (
        <>
          <Form.Item
            className="mb-2"
            name="time_slot"
            label="Time Slot"
            rules={[
              {
                type: "array",
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <TimePicker.RangePicker use12Hours={true} className="w-72" />
          </Form.Item>

          <Form.Item
            className="mb-2 inline-block"
            name="maximum_capacity"
            label="Slot Capacity"
            rules={[
              {
                required: true,
                message: "Please enter Slot Capacity!",
              },
            ]}
            extra="Maximum capacity is 5000"
          >
            <InputNumber
              min={0}
              max={5000}
              className="w-72"
              placeholder="Slot capacity"
            />
          </Form.Item>
          <Form.Item
            name="slot_interval"
            label="Time Interval"
            className="mb-2 inline-block xl:pl-4"
            rules={[
              {
                required: true,
                message: "Please select Time Interval!",
              },
            ]}
          >
            <Select placeholder="Time Interval" className="w-52">
              <Option value="15">15 Minutes</Option>
              <Option value="30">30 Minutes</Option>
              <Option value="60">60 Minutes</Option>
            </Select>
          </Form.Item>
        </>
      ) : null}
    </>
  );
};
