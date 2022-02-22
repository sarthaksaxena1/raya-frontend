import { forwardRef, useImperativeHandle } from "react";
import { Form, InputNumber, TimePicker } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  addAdminVaccinationTimeSlot,
  editAdminVaccinationTimeSlot,
  getAdminVaccinationSlotList,
} from "../../appRedux/actions/VaccinationSlot";

export const AddVaccinationTimeSlotForm = forwardRef((props, ref) => {
  const {
    closeForm,
    setVaccinationTimeSlotDetails,
    vaccinationDateSlotId,
    isEditVaccinationForm,
    dateSlotPaginationData,
    timeSlotDetails,
  } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    submitForm() {
      form.submit();
    },
    resetForm() {
      form.resetFields();
    },
  }));

  const onFinish = (values) => {
    if (isEditVaccinationForm) {
      dispatch(
        editAdminVaccinationTimeSlot(
          vaccinationDateSlotId,
          timeSlotDetails.id,
          {
            from_time: moment(values.time[0]._d).format("H:mm:ss"),
            to_time: moment(values.time[1]._d).format("H:mm:ss"),
            max_allowed_patients: values.max_allowed_patients,
          },
          () => {
            dispatch(
              getAdminVaccinationSlotList(dateSlotPaginationData, {}, () => {
                setVaccinationTimeSlotDetails();
              })
            );
            closeForm();
          }
        )
      );
    } else {
      dispatch(
        addAdminVaccinationTimeSlot(
          vaccinationDateSlotId,
          {
            from_time: moment(values.time[0]._d).format("H:mm:ss"),
            to_time: moment(values.time[1]._d).format("H:mm:ss"),
            max_allowed_patients: values.max_allowed_patients,
          },
          () => {
            dispatch(
              getAdminVaccinationSlotList(dateSlotPaginationData, {}, () => {
                setVaccinationTimeSlotDetails();
              })
            );
            closeForm();
          }
        )
      );
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      name="add-vaccination-time-slot"
      initialValues={{
        time: isEditVaccinationForm
          ? [
              moment(timeSlotDetails.from_time, "H:mm:ss"),
              moment(timeSlotDetails.to_time, "H:mm:ss"),
            ]
          : [],
        max_allowed_patients: isEditVaccinationForm
          ? timeSlotDetails.max_allowed_patients
          : "",
      }}
    >
      <Form.Item
        label="Time Slot"
        className="mb-2"
        name="time"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please select time!",
          },
        ]}
      >
        <TimePicker.RangePicker
          disabled={
            timeSlotDetails && timeSlotDetails.patientIds ? true : false
          }
          use12Hours={true}
        />
      </Form.Item>
      <Form.Item
        label="Slot Capacity"
        className="mb-2"
        name="max_allowed_patients"
        rules={[
          {
            required: true,
            message: "Please enter slot capacity!",
          },
        ]}
        extra="Maximum capacity is 5000!"
      >
        <InputNumber
          className="w-4/12"
          min={0}
          max={5000}
          placeholder="Slot Capacity"
        />
      </Form.Item>
    </Form>
  );
});
