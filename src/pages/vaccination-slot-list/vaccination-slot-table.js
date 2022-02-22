import { forwardRef, useImperativeHandle } from "react";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminVaccinationSlotList,
  selectVaccinationDateSlot,
} from "../../appRedux/actions/VaccinationSlot";
import { setTableRowColor } from "../../helpers/utils";
import useWindowDimensions from "../../helpers/window-dimensions";

export const VaccinationSlotTable = forwardRef((props, ref) => {
  const {
    setDateSlotPaginationData,
    assignSlotModal,
    getSlotData,
    closeModal,
    selectDateSlot,
  } = props;
  const [requestObj, setRequestObj] = useState({
    page_number: 1,
    page_size: 10,
  });
  const [total, setTotal] = useState(0);
  const { height } = useWindowDimensions();

  useImperativeHandle(ref, () => ({
    submitModal() {
      getSlotData(selectedRowKeys);
    },
  }));

  const [vaccinationDateSlotData, setVaccinationDateSlotData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { isLoaded, vaccinationSlotDateList } = useSelector(
    ({ vaccinationSlots }) => vaccinationSlots
  );
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Slot Name",
      dataIndex: "name",
      key: "name",
      width: 125,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location) => <span>{location.name}</span>,
      width: 125,
    },
    {
      title: "Vaccine",
      dataIndex: "vaccine",
      key: "vaccine",
      render: (vaccine) => <span>{vaccine.name}</span>,
      width: 125,
    },
    {
      title: "Dose",
      dataIndex: "dose",
      key: "dose",
      width: 50,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 100,
    },
    {
      title: "Total Slots",
      dataIndex: "max_count",
      key: "max_count",
      width: 50,
    },
    {
      title: "Available Slots",
      dataIndex: "total_available",
      key: "total_available",
      width: 75,
    },
  ];

  useEffect(() => {
    let paginationData = {
      page: requestObj.page_number,
      limit: requestObj.page_size,
    };
    dispatch(getAdminVaccinationSlotList(paginationData, {}, () => {}));
    if (!assignSlotModal) {
      setDateSlotPaginationData(paginationData);
    }
  }, [requestObj]);

  useEffect(() => {
    if (!!vaccinationSlotDateList.data) {
      setVaccinationDateSlotData(
        vaccinationSlotDateList.data.map((value) => ({
          id: value.id,
          name: value.name,
          location: value.vaccination_location,
          vaccine: value.vaccine,
          dose: value.dose_number,
          date: value.slot_date,
          max_count: value.max_allowed_patients,
          total_available: value.available_slots,
        }))
      );
      setTotal(vaccinationSlotDateList.total);
    } else {
      setVaccinationDateSlotData([]);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!assignSlotModal) {
      dispatch(selectVaccinationDateSlot(selectedRowKeys[0]));
    }
  }, [selectedRowKeys]);

  const handleTableChange = (pagination, columns) => {
    const { current, pageSize } = pagination;
    setRequestObj({
      page_size: pageSize,
      page_number: current,
    });
  };

  return (
    <>
      <Table
        size="small"
        scroll={{ y: assignSlotModal ? height - 450 : height - 275 }}
        columns={columns}
        dataSource={vaccinationDateSlotData.map((val) => ({
          ...val,
          key: val.id,
        }))}
        pagination={{
          pageSize: requestObj.page_size,
          current: requestObj.page_number,
          total,
        }}
        onChange={handleTableChange}
        rowSelection={{
          type: "radio",
          selectedRowKeys,
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        rowClassName={setTableRowColor}
      />
      {assignSlotModal ? (
        <div>
          <Button
            disabled={!selectedRowKeys || selectedRowKeys.length < 1}
            type="primary"
            onClick={() => selectDateSlot(selectedRowKeys)}
            className="mr-2"
          >
            Select Date Slot
          </Button>
          <Button onClick={() => closeModal()}>Cancel</Button>
        </div>
      ) : null}
    </>
  );
});
