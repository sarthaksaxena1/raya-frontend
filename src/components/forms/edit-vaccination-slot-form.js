import { forwardRef, useImperativeHandle } from "react";
import { Form } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AddVaccinationSlotFormFields } from "../../pages/add-vaccination-slot/add-vaccination-slot-form-fields";
import {
  editAdminVaccinationSlot,
  getAdminVaccinationSlotList,
} from "../../appRedux/actions/VaccinationSlot";

export const EditVaccinationSlotForm = forwardRef((props, ref) => {
  const {
    slotDetails,
    closeForm,
    dateSlotPaginationData,
    setVaccinationTimeSlotDetails,
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
    dispatch(
      editAdminVaccinationSlot(
        slotDetails.id,
        {
          name: values.name,
          vaccination_location: values.location,
          vaccine: values.vaccine,
          slot_date: moment(values.date._d).format("YYYY-MM-DD"),
          dose_number: parseInt(values.dose_number),
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
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      name="edit-vaccination-slot"
      initialValues={{
        name: slotDetails.name,
        location: slotDetails.vaccination_location,
        vaccine: slotDetails.vaccine,
        dose_number: slotDetails.dose_number.toString(),
        date: moment(slotDetails.slot_date, "YYYY-MM-DD"),
      }}
    >
      <AddVaccinationSlotFormFields editFlag={true} />
    </Form>
  );
});
