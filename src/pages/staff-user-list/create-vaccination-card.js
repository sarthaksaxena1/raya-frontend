import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  adminGetPatientVaccinatinStatus,
  adminUpdatePatientVaccinatinStatus,
  getAllVaccinatorList,
} from "../../appRedux/actions/UserList";
import { Form, Button, Select } from "antd";
import { showMessage } from "../../helpers/message";
import moment from "moment";

const { Option } = Select;

export const CreateVaccinationCard = ({ handleCreateVaccinationCancel,vaccineDoseNumber }) => {
  const { patientVaccinationStatusId, vaccinatorListDetails } = useSelector(
    ({ userList }) => userList
  );

  useEffect(() => {
    dispatch(getAllVaccinatorList());
  }, []);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(
      adminUpdatePatientVaccinatinStatus(
        patientVaccinationStatusId,
        {
          vaccination_card_creation_date: moment().format("YYYY-MM-DD H:mm:ss"),
          injected_arm: values.injected_arm,
          vaccinator: values.vaccinator_id,
        },
        vaccineDoseNumber,
        () => {
          dispatch(adminGetPatientVaccinatinStatus(patientVaccinationStatusId,vaccineDoseNumber));
          showMessage("success", "Vaccination Card created successfully!");
          handleCreateVaccinationCancel();
        }
      )
    );
  };

  return (
    <div className="h-80 overflow-y-auto">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Select Arm"
          name="injected_arm"
          rules={[{ required: true, message: "Please select arm" }]}
          className="mb-4"
        >
          <Select placeholder="Select Arm" className="w-6/12">
            <Select.Option value="L-ARM">Left Arm</Select.Option>
            <Select.Option value="R-ARM">Right Arm</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Vaccinator"
          name="vaccinator_id"
          rules={[{ required: true, message: "Please select the vaccinator" }]}
          className="mb-4"
        >
          <Select placeholder="Vaccinator" className="w-6/12" size="large">
            {vaccinatorListDetails?.map((value) => (
              <Option value={value.id}>
                <div className="font-semibold text-xs">{value.code}</div>
                <div className=" text-base">{value.name}</div>
              </Option>
            ))}
          </Select>
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
