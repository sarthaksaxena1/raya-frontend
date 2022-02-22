import { combineReducers } from "redux";
import Loader from "./Loader";
import UploadPatient from "./UploadPatient";
import PatientLists from "./PatientList";
import VaccinationSlot from "./VaccinationSlot";
import VaccineLocations from "./VaccineLocation";
import VaccineList from "./VaccineList";
import UserList from "./UserList";
import AppSettings from "./Settings";
import Authentication from "./Authentication";
import PatientProfile from "./PatientProfile";
import MedicalHistory from "./MedicalHistory";
import PatientVaccinationBookings from "./PatientVaccinationBookings";
import SurveyQuestions from "./SurveyQuestions";

const rootReducer = combineReducers({
  loader: Loader,
  uploadPatient: UploadPatient,
  patientLists: PatientLists,
  vaccineLocations: VaccineLocations,
  vaccineList: VaccineList,
  vaccinationSlots: VaccinationSlot,
  userList: UserList,
  appSettings: AppSettings,
  authentication: Authentication,
  patientProfile: PatientProfile,
  medicalHistory: MedicalHistory,
  patientVaccinationBookings: PatientVaccinationBookings,
  surveyQuestions: SurveyQuestions,
});

export default rootReducer;
