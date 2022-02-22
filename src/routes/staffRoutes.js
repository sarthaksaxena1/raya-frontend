import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { DashboardLayout } from "../layouts/dashboard";
import { UploadPatient } from "../pages/upload-patient";
import { VaccineList } from "../pages/vaccine-list";
import { PatientList } from "../pages/patient-list";
import { AddVaccinationSlot } from "../pages/add-vaccination-slot";
import { VaccinationSlotList } from "../pages/vaccination-slot-list";
import { LocationList } from "../pages/locations";
import { AddLocation } from "../pages/add-location";
import { AddVaccine } from "../pages/add-vaccine";
import { UserList } from "../pages/user-list";
import { StaffUserList } from "../pages/staff-user-list";
import { VaccinatorList } from "../pages/vaccinator-list";
import { AddVaccinator } from "../pages/add-vaccinator";

class StaffApp extends Component {
  render() {
    const NotFoundRedirect = () => <Redirect to="/" />;
    return (
      <DashboardLayout>
        <Switch>
          <Route exact path="/admin/upload-patient" component={UploadPatient} />
          <Route exact path="/admin/patient-list" component={PatientList} />
          <Route exact path="/admin/vaccine-list" component={VaccineList} />
          <Route exact path="/admin/userdata-list" component={UserList} />
          <Route exact path="/staff/userdata-list" component={StaffUserList} />
          <Route
            exact
            path="/staff/vaccinator-list"
            component={VaccinatorList}
          />
          <Route
            exact
            path="/admin/add-vaccination-slot"
            component={AddVaccinationSlot}
          />
          <Route
            exact
            path="/admin/vaccination-slot-list"
            component={VaccinationSlotList}
          />
          <Route
            exact
            path="/admin/add-vaccinaion-slots"
            component={AddVaccinationSlot}
          />
          <Route exact path="/admin/locations" component={LocationList} />
          <Route exact path="/admin/add-location" component={AddLocation} />
          <Route
            exact
            path="/admin/edit-location/:location_id"
            component={AddLocation}
          />
          <Route exact path="/admin/add-vaccine" component={AddVaccine} />
          <Route
            exact
            path="/admin/edit-vaccine/:vaccine_id"
            component={AddVaccine}
          />
          <Route exact path="/staff/add-vaccinator" component={AddVaccinator} />
          <Route
            exact
            path="/staff/edit-vaccinator/:vaccinator_id"
            component={AddVaccinator}
          />
          <Route component={NotFoundRedirect} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export { StaffApp };
