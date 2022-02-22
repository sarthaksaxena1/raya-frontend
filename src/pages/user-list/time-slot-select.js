import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminVaccinationTimeSlotList } from "../../appRedux/actions/VaccinationSlot";
import { Select, Button } from "antd";
import moment from "moment";

const { Option } = Select;

export const TimeSlotSelect = ({
  vaccination_slot_date,
  assignTimeSlotToUser,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const [timeSlot, setTimeSlot] = useState(null);
  const { vaccinationSlotTimeList } = useSelector(
    ({ vaccinationSlots }) => vaccinationSlots
  );

  useEffect(() => {
    dispatch(getAdminVaccinationTimeSlotList(vaccination_slot_date, () => {}));
  }, []);

  return (
    <div>
      <p className="text-sm mb-2">Select time slot: </p>
      {vaccinationSlotTimeList && vaccinationSlotTimeList.data ? (
        <Select
          className="w-7/12"
          placeholder="Please select time slot"
          size="large"
          onChange={(value) => setTimeSlot(value)}
        >
          {vaccinationSlotTimeList && vaccinationSlotTimeList.data
            ? vaccinationSlotTimeList.data.map((value) => (
                <Option className="text-base" key={value.id} value={value.id}>
                  {moment(value.from_time, "H:mm:ss").format("h:mm A") +
                    " to " +
                    moment(value.to_time, "H:mm:ss").format("h:mm A")}
                </Option>
              ))
            : null}
        </Select>
      ) : null}
      <div className="mb-4 mt-8">
        <Button
          className="mr-2"
          type="primary"
          onClick={() => assignTimeSlotToUser("allocate", timeSlot)}
          disabled={!timeSlot}
        >
          Assign Time Slot
        </Button>

        <Button className="mr-2" onClick={() => assignTimeSlotToUser("skip")}>
          Skip and Assign Date Slot
        </Button>

        <Button onClick={() => closeModal()}>Cancel</Button>
      </div>
    </div>
  );
};
