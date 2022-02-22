import { Form, Button } from "antd";
import { useHistory } from "react-router-dom";
import { FormScreenLayout } from "../../layouts/screens/form-screen";
import { AddVaccinationSlotFormFields } from "./add-vaccination-slot-form-fields";
import { LeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  adminAddVaccinationSlot,
  getAdminVaccinationSlotList,
  resetSlot,
} from "../../appRedux/actions/VaccinationSlot";
import moment from "moment";
import { vaccinationSlotConstants } from "../../appRedux/constants";

export const AddVaccinationSlot = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const postData = {
      name: values.name,
      vaccination_location: values.location,
      vaccine: values.vaccine,
      slot_date: moment(values.date._d).format("YYYY-MM-DD"),
      dose_number: parseInt(values.dose_number),
      start_time: moment(values.time_slot[0]._d).format("H:mm"),
      end_time: moment(values.time_slot[1]._d).format("H:mm"),
      slot_interval: parseInt(values.slot_interval),
      maximum_capacity: values.maximum_capacity,
    };

    dispatch(
      adminAddVaccinationSlot(postData, () => {
        dispatch(getAdminVaccinationSlotList({}, {}));
        dispatch({
          type: vaccinationSlotConstants.GET_VACCINATION_TIME_SLOT_LIST_SUCCESS,
          data: {},
        });
        dispatch({
          type: vaccinationSlotConstants.GET_VACCINATION_SLOT_SUCCESS,
          data: {},
        });
        dispatch(resetSlot());
        history.push("/admin/vaccination-slot-list");
      })
    );
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
          <span className="pt-1">Create Vaccination Slots</span>
        </h2>
      </div>
      <FormScreenLayout formWidth={12} formTitle="Create Vaccination Slots">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          name="add-vaccination-slot"
          initialValues={{
            time_slots: [
              {
                time: [],
                max_allowed_patients: "",
              },
            ],
          }}
        >
          <AddVaccinationSlotFormFields editFlag={false} />
          <Form.Item className="mt-6">
            <Button className="mr-3" type="primary" htmlType="submit">
              Create
            </Button>
            <Button type="secondary" onClick={navigateBack}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </FormScreenLayout>
    </div>
  );
};
