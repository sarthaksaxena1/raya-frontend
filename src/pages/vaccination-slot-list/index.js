import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "antd";
import {
  selectVaccinationDateSlot,
  getAdminVaccinationSlotExportList,
} from "../../appRedux/actions/VaccinationSlot";
import { TableScreenLayout } from "../../layouts/screens/table-screen";
import { VaccinationSlotDetailsList } from "./vaccination-slot-list";
import { VaccinationSlotTable } from "./vaccination-slot-table";
import { setSideBarMenuItem } from "../../appRedux/actions/Settings";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";

export const VaccinationSlotList = () => {
  const history = useHistory();
  const csvLink = useRef();
  const dispatch = useDispatch();
  const [dateSlotPaginationData, setDateSlotPaginationData] = useState({});
  const [exportData, setExporData] = useState("");

  const { vaccinationSlotDateList } = useSelector(
    ({ vaccinationSlots }) => vaccinationSlots
  );

  useEffect(() => {
    dispatch(selectVaccinationDateSlot(null));
    dispatch(setSideBarMenuItem("vaccination-slot-list"));
  }, []);

  const navigateToCreateSlot = () => {
    history.push("/admin/add-vaccination-slot");
  };

  const downloadVaccinationSlotData = () => {
    dispatch(
      getAdminVaccinationSlotExportList((exportData) => {
        const csvReport = {
          data: exportData.data.data,
          headers: exportData.data.headers,
          filename: "vaccination_slot_list.csv",
        };

        setExporData(csvReport);

        csvLink.current.link.click();
      })
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between pl-2">
        <h2>Vaccination Slots</h2>
        <div>
          <Button onClick={navigateToCreateSlot} type="primary">
            Create Vaccination Slots
          </Button>
          {vaccinationSlotDateList?.data?.length > 0 && (
            <Button
              type="primary"
              className="ml-2"
              onClick={downloadVaccinationSlotData}
            >
              Download
            </Button>
          )}
          {exportData && (
            <CSVLink
              className="hidden"
              ref={csvLink}
              target="_blank"
              {...exportData}
            >
              Export Data
            </CSVLink>
          )}
        </div>
      </div>
      <Row className="-mx-1">
        <Col xs={17} className="px-1">
          <TableScreenLayout>
            <VaccinationSlotTable
              setDateSlotPaginationData={setDateSlotPaginationData}
            />
          </TableScreenLayout>
        </Col>
        <Col xs={7} className="px-1">
          <VaccinationSlotDetailsList paginationData={dateSlotPaginationData} />
        </Col>
      </Row>
    </div>
  );
};
