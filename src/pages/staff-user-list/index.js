import { Row, Col, Divider, Select, DatePicker, Tabs } from "antd";
import { useEffect } from "react";
import { TableScreenLayout } from "../../layouts/screens/table-screen";
import { useDispatch, useSelector } from "react-redux";

import { setSideBarMenuItem } from "../../appRedux/actions/Settings";
import { StaffUserListTable } from "./staff-user-list-table";
import { StaffUserListVaccinationDetails } from "./staff-user-list-vaccination-details";
import { getAdminVaccineLocationList } from "../../appRedux/actions/VaccineLocation";
import { has } from "lodash";
import { setUserListRequstObj } from "../../appRedux/actions/UserList";
import moment from "moment";

const { TabPane } = Tabs;

export const StaffUserList = () => {
  const dispatch = useDispatch();
  const { vaccineLocationList } = useSelector(
    ({ vaccineLocations }) => vaccineLocations
  );
  const userListRequestObj = useSelector(
    (state) => state.userList.userListRequestObj
  );

  useEffect(() => {
    dispatch(setSideBarMenuItem("userdata-list"));
    dispatch(getAdminVaccineLocationList({}));

    return () => {
      dispatch(setUserListRequstObj({ page: 1, limit: 10 }));
    };
  }, []);

  const handleFilterFields = (key, value) => {
    let tempUserListRequestObj = { ...userListRequestObj };
    let tempFilters = userListRequestObj.filter
      ? { ...userListRequestObj.filter }
      : {};
    if (!value && has(tempFilters, key)) {
      delete tempFilters[key];
    }
    if (!!value) {
      tempFilters[key] = value;
    }
    tempUserListRequestObj["filter"] = tempFilters;
    dispatch(setUserListRequstObj(tempUserListRequestObj));
  };

  return (
    <div>
      <h2 className="mb-4">Patient List</h2>
      <div className="flex items-center justify-between pl-2">
        <div>
          <div className="flex items-center">
            <span className="mr-4">Filter by: </span>
            <div className="flex flex-col">
              <Select
                allowClear
                placeholder="Vaccine Location"
                className="w-48"
                showSearch
                onChange={(value) => handleFilterFields("location", value)}
              >
                {!!vaccineLocationList.data
                  ? vaccineLocationList.data
                      .filter((val) => val.status === 1)
                      .map((value) => ({
                        id: value.id,
                        name: value.name,
                      }))
                      .map((val) => (
                        <Select.Option key={val.id} value={val.id}>
                          {val.name}
                        </Select.Option>
                      ))
                  : null}
              </Select>
            </div>
            <Divider type="vertical" />

            <div className="flex flex-col">
              <DatePicker
                onChange={(value) =>
                  handleFilterFields(
                    "slot_date",
                    value && value._d
                      ? moment(value._d).format("YYYY-MM-DD")
                      : null
                  )
                }
                placeholder="Date"
              />
            </div>
          </div>
        </div>
      </div>
      <Row className="-mx-1">
        <Col xs={15} className="px-1">
          <TableScreenLayout>
            <StaffUserListTable />
          </TableScreenLayout>
        </Col>

        <Col xs={9} className="px-1">
          <StaffUserListVaccinationDetails />
        </Col>
      </Row>
    </div>
  );
};
