import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

import { StaffApp } from "./staffRoutes";
import { isUserAuthenticated } from "../helpers/utils";
// import { Auth } from "../helpers/auth";
import PatientSignUp from "../pages/signup";
import TermsAndServices from "../pages/terms-and-services";
import Login from "../pages/login";
import Logout from "../pages/logout";
import PatientForgotPassword from "../pages/forgot-password";
import PatientProfile from "../pages/patient-profile";
import PatientDashboard from "../pages/patient-dashboard";
import EditUserProfile from "../pages/edit-profile";
import PatientCEIRDetails from "../pages/patient-ceir-details";
import AddCeirForm from "../pages/add-ceir-form";
import AddCeirFormRegistration from "../pages/add-ceir-form-registration";
import ChangePassword from "../pages/change-password";
import { PatientChangePassword } from "../pages/patient-change-password";
import { AddMedicalHistory } from "../pages/add-medical-history";
import { AddMedicalHistoryRegistration } from "../pages/add-medical-history-registration";
import { roleConstants } from "../appRedux/constants";
import PatientMedicalHistory from "../pages/patient-medical-history";
import PatientVaccinationDetails from "../pages/patient-vaccination-details";
import DisplayPatientVaccinationDetails from "../pages/patient-vaccination-details-qrcode";
import { RayaHomePage } from "../pages/home-page";
import UploadComorbidityProof from "../pages/upload-comorbidity-proof";
import { PrivacyPolicy } from "../pages/privacy-policy";
import SelectPreferredLocation from "../pages/select-preferred-location";
import { VersionErrorIos } from "../pages/version-error-ios";
import { VersionErrorAndroid } from "../pages/version-error-android";
import { SurveyForm } from "../pages/add-survey-form";

const RestrictedRoute = ({
  component: Component,
  location,
  allowedUsers,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthenticated(allowedUsers) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/logout",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const NotFoundRedirect = () => <Redirect to="/" />;
// const AuthenticatedHomePage = Auth(HomePage, [roleConstants.ADMIN_ROLE]);

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
          <Route exact path="/" component={RayaHomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/signup" component={PatientSignUp} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/version-error-ios" component={VersionErrorIos} />
          <Route
            exact
            path="/version-error-android"
            component={VersionErrorAndroid}
          />

          <Route
            exact
            path="/signup/terms-and-services"
            component={TermsAndServices}
          />
          <Route
            exact
            path="/reset-password"
            component={PatientForgotPassword}
          />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route
            exact
            path="/patient/vaccination_details/:qrid"
            component={DisplayPatientVaccinationDetails}
          />
          <RestrictedRoute
            exact
            path="/patient/change-password"
            component={PatientChangePassword}
            allowedUsers={[roleConstants.PATIENT_ROLE]}
          />
          <Route
            // allowedUsers={[roleConstants.PATIENT_ROLE]}
            exact
            path="/patient/ceir/:action"
            component={AddCeirForm}
          />
          <Route
            // allowedUsers={[roleConstants.PATIENT_ROLE]}
            exact
            path="/patient/ceir-registration/:action"
            component={AddCeirFormRegistration}
          />
          <RestrictedRoute
            exact
            path="/patient/profile"
            component={PatientProfile}
            allowedUsers={[roleConstants.PATIENT_ROLE]}
          />
          <RestrictedRoute
            exact
            path="/patient/edit-profile/:patient_id"
            component={EditUserProfile}
            allowedUsers={[roleConstants.PATIENT_ROLE]}
          />
          <RestrictedRoute
            allowedUsers={[roleConstants.PATIENT_ROLE]}
            exact
            path="/patient/dashboard"
            component={PatientDashboard}
          />
          <RestrictedRoute
            exact
            path="/patient/ceir"
            component={PatientCEIRDetails}
            allowedUsers={[roleConstants.PATIENT_ROLE]}
          />
          <RestrictedRoute
            exact
            path="/patient/preferred-location"
            component={SelectPreferredLocation}
            allowedUsers={[roleConstants.PATIENT_ROLE]}
          />
          <RestrictedRoute
            exact
            path="/patient/upload-comorbidity"
            component={UploadComorbidityProof}
            allowedUsers={[roleConstants.PATIENT_ROLE]}
          />
          <RestrictedRoute
            exact
            path="/patient/medical-history/:dose_number"
            component={PatientMedicalHistory}
            allowedUsers={[roleConstants.PATIENT_ROLE]}
          />
          <Route
            exact
            path="/patient/add-medical-history/:dose_number"
            component={AddMedicalHistory}
          />
          <Route
            exact
            path="/patient/add-medical-history-registration/:dose_number"
            component={AddMedicalHistoryRegistration}
          />
          <RestrictedRoute
            exact
            path="/patient/add-survey-form/:dose_number"
            component={SurveyForm}
            allowedUsers={[roleConstants.PATIENT_ROLE]}
          />
          <RestrictedRoute
            exact
            path="/patient/vaccination-details/:action/:dose_number"
            component={PatientVaccinationDetails}
            allowedUsers={[roleConstants.PATIENT_ROLE]}
          />
          <RestrictedRoute
            allowedUsers={[roleConstants.ADMIN_ROLE, roleConstants.STAFF_ROLE]}
            component={StaffApp}
          />
          <Route component={NotFoundRedirect} />
        </Switch>
      </Router>
    );
  }
}

export { AppRouter };
