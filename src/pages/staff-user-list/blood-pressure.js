import { useDispatch, useSelector } from "react-redux";
import {
  adminGetPatientVaccinatinStatus,
  adminUpdatePatientVaccinatinStatus,
} from "../../appRedux/actions/UserList";
import { Form, Button, Input } from "antd";
import moment from "moment";
import { showMessage } from "../../helpers/message";

export const BloodPressureRecord = ({
  handleBloodPressureRecordCancel,
  vaccineDoseNumber,
}) => {
  const { patientVaccinationStatusId } = useSelector(
    ({ userList }) => userList
  );

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(
      adminUpdatePatientVaccinatinStatus(
        patientVaccinationStatusId,
        {
          blood_pressure_date: moment().format("YYYY-MM-DD H:mm:ss"),
          monitoring_remarks: values.monitoring_remarks,
          blood_pressure: values.blood_pressure,
          oxygen_saturation: values.oxygen_saturation,
        },
        vaccineDoseNumber,
        () => {
          dispatch(
            adminGetPatientVaccinatinStatus(
              patientVaccinationStatusId,
              vaccineDoseNumber
            )
          );
          showMessage("success", "Remarks recorded successfully!");
          handleBloodPressureRecordCancel();
        }
      )
    );
  };

  return (
    <div className="h-80 overflow-y-auto">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Blood Pressure"
          name="blood_pressure"
          rules={[
            {
              required: true,
              message: "Please enter blood pressure",
            },
            { max: 30, message: "Maximum 30 characters allowed" },
          ]}
        >
          <Input className="w-7/12" />
        </Form.Item>
        <Form.Item
          label="Oxygen Saturation"
          name="oxygen_saturation"
          rules={[
            {
              required: true,
              message: "Please enter oxygen level",
            },
            { max: 30, message: "Maximum 30 characters allowed" },
          ]}
        >
          <Input className="w-7/12" />
        </Form.Item>
        <Form.Item
          label="Remarks"
          name="monitoring_remarks"
          rules={[{ max: 100, message: "Maximum 100 characters allowed" }]}
        >
          <Input className="w-7/12 h-14" />
        </Form.Item>
        <Form.Item>
          <Button className="mr-2" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
