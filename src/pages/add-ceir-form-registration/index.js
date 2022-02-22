import {
  Form,
  Button,
  DatePicker,
  Select,
  Input,
  Upload,
  Checkbox,
  Radio,
} from "antd";
import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import {
  getPatientCeirDetails,
  getPatientProfileDetails,
  patientAddCeir,
  patientEditCeir,
  setCeirFormData,
} from "../../appRedux/actions/PatientProfileDetails";
import { ceirFormFeildsData } from "../../helpers/ceir-form-feilds-data";
import { showMessage } from "../../helpers/message";
import { Link, useHistory } from "react-router-dom";
import RegisterationLayout from "../../layouts/hybrid/registeration-layout";

import {
  setSignUpFeildsData,
  userRegister,
} from "../../appRedux/actions/Authentication";
import {
  setMedicalFormData,
} from "../../appRedux/actions/MedicalHistory";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const { Option } = Select;

const AddCeirFormRegistration = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [provinceOptions, setProvinceOptions] = useState([]);
  const history = useHistory();
  const inputStyleClass = "w-full rounded-md h-14 shadow-md";
  const { action } = props.match.params;
  const { patientProfileData, patientCeirData, isLoaded } = useSelector(
    ({ patientProfile }) => patientProfile
  );

  const isCeirLoaded = useSelector((state) => state.patientProfile.isLoaded);

  const getSignupFeildsData = useSelector(
    (state) => state.authentication.signupFeildsData
  );

  const getMedicalFeildsData = useSelector(
    (state) => state.medicalHistory.medicalFeildsData
  );

  const getCeirFeildsData = useSelector(
    (state) => state.patientProfile.ceirFeildsData
  );

  const [fileList, setfileList] = useState([]);
  const {
    genderData,
    priorityGroupData,
    hasComorbidityData,
    regionData,
    provinceData,
    cityData,
    preferredLocationData,
  } = ceirFormFeildsData();
  const [hasCormobidity, setHasCormobidity] = useState(false);

  useEffect(() => {

    console.log(getCeirFeildsData);

    if (getCeirFeildsData.priority_group === "A3: Adult with Comorbidity") {
      setHasCormobidity(true);
    }

    form.setFieldsValue({ ...getCeirFeildsData });
  }, [isCeirLoaded]);

  useEffect(() => {
    if (action === "edit") {
      let initValues = { ...patientCeirData };
      initValues["date_of_birth"] = moment(
        patientCeirData.date_of_birth,
        "YYYY-MM-DD"
      );
      if (patientCeirData.priority_group === "A3: Adult with Comorbidity") {
        setHasCormobidity(true);
        form.setFieldsValue({
          upload: [
            {
              uid: "1",
              name: "comorbidityProof",
              status: "done",
              url: patientCeirData.commorbidity_doc,
            },
          ],
        });
      }
      if (initValues["middlename"] === "undefined") {
        initValues["middlename"] = "";
      }
      if (initValues["suffix"] === "undefined") {
        initValues["suffix"] = "";
      }
      form.setFieldsValue({ ...initValues });
    }
  }, [patientCeirData]);

  useEffect(() => {
    if (action === "add") {
      
    } else {
      dispatch(getPatientCeirDetails(() => {}));
    }
  }, []);

  useEffect(() => {
    if (action === "edit") {
      form.setFieldsValue({
        firstname: patientCeirData.firstname,
        lastname: patientCeirData.lastname,
        date_of_birth: moment(patientCeirData.date_of_birth, "YYYY-MM-DD"),
        contact_no: patientCeirData.contact_no,
        email: patientCeirData.email,
        gender: patientCeirData.gender,
      });
    } else {
      

      form.setFieldsValue({
        firstname: getSignupFeildsData.first_name,
        middlename: getSignupFeildsData.middle_name,
        lastname: getSignupFeildsData.last_name,
        date_of_birth: getSignupFeildsData.date_of_birth
        ? moment(getSignupFeildsData.date_of_birth, "YYYY-MM-DD")
        : "",
        contact_no: getSignupFeildsData.mobile,
        email: getSignupFeildsData.email,
        gender: getSignupFeildsData.gender,
      });




    }
  }, [isLoaded, patientProfileData, patientCeirData]);

  const onFinish = (values) => {

    let formData = new FormData();
    for (let key in values) {
      if (key !== "upload" && key !== "consent") {
        if (key === "date_of_birth") {
          formData.append(key, moment(values[key]._d).format("YYYY-MM-DD"));
        } else {
          formData.append(key, values[key]);
        }
      }
    }
    if (hasCormobidity) {
      if (!!values.upload && values.upload.length) {
        formData.append("commorbidity_doc", values.upload[0].originFileObj);
      }
    }
    
    formData.append("is_saved", true);
    formData.append("is_submitted", true);
    formData.append("is_verified", true);
    formData.append("has_commorbidity", hasCormobidity);

    if (action === "edit") {
      formData.append("is_rejected", false);
    }


    if (action === "add") {

        let medicalHistoryAnswers = [];

        // console.log(getMedicalFeildsData);

        for (let key in getMedicalFeildsData) {
          if (key.includes("question")) {
            medicalHistoryAnswers.push({
              question_id: key.split("_")[1],
              answer: getMedicalFeildsData["question_" + key.split("_")[1]],
              remarks: getMedicalFeildsData["remarks_" + key.split("_")[1]]
                ? getMedicalFeildsData["remarks_" + key.split("_")[1]]
                : "",
              date: getMedicalFeildsData["date_" + key.split("_")[1]]
                ? moment(getMedicalFeildsData["date_" + key.split("_")[1]]).format("DD-MM-YYYY")
                : "",
              symptoms: getMedicalFeildsData["symptoms_" + key.split("_")[1]]
                ? getMedicalFeildsData["symptoms_" + key.split("_")[1]] === "Others"
                  ? [getMedicalFeildsData["other_symptoms_" + key.split("_")[1]]]
                  : getMedicalFeildsData["symptoms_" + key.split("_")[1]]
                : [],
            });
          }
        }

        // console.log(medicalHistoryAnswers);

        getSignupFeildsData['preferred_location'] = values['preferred_location'];

        formData.append("personal_details", JSON.stringify(getSignupFeildsData))
        formData.append("medical_data", JSON.stringify(medicalHistoryAnswers))

       
        dispatch(
          userRegister(formData, () => {
            form.resetFields();
            resetFormFeilds();
            showMessage("success", "User registered successfully!");
            history.push("/login");
          })
        );
  

      
    } else {
      dispatch(
        patientEditCeir(patientCeirData.id, formData, () => {
          showMessage("success", "CEIR details edited succcessfully!");
          form.resetFields();
          history.push("/patient/dashboard");
        })
      );
    }


  };


  const onValuesChange = () => {
    const fieldsData = form.getFieldsValue();
    dispatch(setCeirFormData(fieldsData));
  };


  const resetFormFeilds = () => {
    dispatch(setSignUpFeildsData({}));
    dispatch(setMedicalFormData({}));
    dispatch(setCeirFormData({}));
    history.push("/login");
  };

  const handleRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setfileList(newFileList);
  };

  const handleBeforeUpload = (file) => {
    setfileList([...fileList, file]);
    return false;
  };

  const setProvince = (value) => {
    let region = regionData.filter(function (e) {
      return e.key === value;
    });
    setProvinceOptions(region[0].provinces);
  };

  return (
    <>
      <RegisterationLayout>
        <h3 className="text-center mt-8 mb-4">Fill up CEIR Form</h3>
        <Form
          layout="vertical"
          className="raya-signup-form"
          form={form}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          onFinishFailed={() =>
            showMessage(
              "error",
              "You may have missed answers for few fields. Please recheck and Submit!"
            )
          }
        >
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please enter your first name",
              },
              {
                max: 30,
                message: "Maximum 30 characters allowed!",
              },
            ]}
          >
            <Input
              className={inputStyleClass}
              placeholder="First Name"
              disabled={true}
            />
          </Form.Item>
          <Form.Item
            name="middlename"
            label="Middle Name"
            rules={[
              {
                max: 30,
                message: "Maximum 30 characters allowed!",
              },
            ]}
          >
            <Input
              className={inputStyleClass}
              placeholder="Middle Name"
              disabled={true}
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please enter your last name",
              },
              {
                max: 30,
                message: "Maximum 30 characters allowed!",
              },
            ]}
          >
            <Input
              className={inputStyleClass}
              placeholder="Last Name"
              disabled={true}
            />
          </Form.Item>
          <Form.Item
            name="suffix"
            label="Suffix"
            rules={[
              {
                max: 15,
                message: "Maximum 15 characters allowed!",
              },
            ]}
          >
            <Input className={inputStyleClass} placeholder="Suffix" />
          </Form.Item>
          <Form.Item
            name="contact_no"
            label="Contact Number"
            rules={[
              {
                required: true,
                message: "Please enter your contact number",
              },
              {
                pattern: /^0?[2-9]\d{9}$/,
                message: "Please enter valid contact number",
              },
            ]}
          >
            <Input
              className={inputStyleClass}
              placeholder="Contact Number"
              disabled={true}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                pattern: /^[a-z0-9._]+@[a-z0-9-]+\.[a-zA-Z0-9-.]+$/,

                message: "Please enter a valid email",
              },

              {
                required: true,
                message: "Please enter your E-mail",
              },
            ]}
          >
            <Input
              className={inputStyleClass}
              placeholder="Email"
              disabled={true}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter date of birth",
              },
            ]}
            name="date_of_birth"
            label="Date of Birth"
          >
            <DatePicker
              placeholder="Date of Birth"
              className={inputStyleClass}
              disabled={true}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Select placeholder="Gender" size="large" disabled={true}>
              {genderData.map((val) => (
                <Option value={val.value}>{val.value}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="preferred_location"
            label="Select your preferred vaccination location "
            className="pt-4"
            rules={[
              {
                required: true,
                message: "Please select your preferred location ",
              },
            ]}
          >
            <Select placeholder="Preferred vaccination location" size="large">
              {preferredLocationData.map((val) => (
                <Option value={val.key}>{val.value}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="priority_group"
            rules={[
              {
                required: true,
                message: "Please select your Priority Group",
              },
            ]}
            label="Priority Group"
          >
            <Select
              onChange={(value) =>
                setHasCormobidity(value === "A3: Adult with Comorbidity")
              }
              placeholder="Priority Group"
              size="large"
            >
              {priorityGroupData.map((val) => (
                <Option value={val.value}>{val.value}</Option>
              ))}
            </Select>
          </Form.Item>
          {hasCormobidity ? (
            <Form.Item
              name="commorbidity"
              label="Comorbidity"
              rules={[
                {
                  required: true,
                  message: "Please select your comorbidity",
                },
              ]}
            >
              <Select placeholder="Comorbidity" size="large">
                {hasComorbidityData.map((val) => (
                  <Option value={val.key}>{val.value}</Option>
                ))}
              </Select>
            </Form.Item>
          ) : null}
          {hasCormobidity ? (
            <Form.Item
              className="font-semibold"
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Only image or pdf format file accepted"
            >
              <Upload
                listType="picture"
                accept="image/*,.pdf"
                maxCount={1}
                onRemove={handleRemove}
                beforeUpload={handleBeforeUpload}
                fileList
              >
                <Button className={inputStyleClass} icon={<UploadOutlined />}>
                  Upload Comorbidity proof{" "}
                </Button>
              </Upload>
            </Form.Item>
          ) : null}
          <Form.Item
            name="region"
            label="Region"
            rules={[
              {
                required: true,
                message: "Please select region",
              },
            ]}
          >
            <Select
              placeholder="Region"
              size="large"
              showSearch
              className="ceir-select-search"
              onChange={(value) => setProvince(value)}
            >
              {regionData.map((val) => (
                <Option className="ceir-select" value={val.key}>
                  {val.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="province"
            label="Province"
            rules={[
              {
                required: true,
                message: "Please select province",
              },
            ]}
          >
            <Select
              placeholder="Province"
              size="large"
              showSearch
              className="ceir-select-search"
            >
              {provinceOptions.map((val) => (
                <Option className="ceir-select" value={val.key}>
                  {val.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please enter city",
              },
            ]}
            label="City"
          >
            <Select
              placeholder="City"
              size="large"
              showSearch
              className="ceir-select-search"
            >
              {cityData.map((val) => (
                <Option className="ceir-select" value={val.city}>
                  {val.city}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="barangay"
            rules={[
              {
                required: true,
                message: "Please enter barangay",
              },
              {
                max: 30,
                message: "Maximum 30 characters allowed!",
              },
            ]}
            label="Barangay"
          >
            <Input className={inputStyleClass} placeholder="Barangay" />
          </Form.Item>
          <Form.Item
            name="occupation"
            rules={[
              {
                required: true,
                message: "Please enter occupation",
              },
              {
                max: 30,
                message: "Maximum 30 characters allowed!",
              },
            ]}
            label="Occupation"
          >
            <Input className={inputStyleClass} placeholder="Occupation" />
          </Form.Item>
          <Form.Item
            name="has_allergy"
            rules={[
              { required: true, message: "Please select either yes or no" },
            ]}
            label="Are you allergic to vaccines?"
          >
            <Radio.Group className="mt-2" optionType="button" buttonStyle="solid">
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="consent"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please accept the Consent")),
              },
            ]}
          >
            <Checkbox className="text-base pt-0">
              Subscribe to The Raya Clinic updates
            </Checkbox>
          </Form.Item>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 text-xl rounded-md pl-2"
            >
              Submit
            </Button>
          </Form.Item>
            
          <>
              <Link className="text-lg text-blue-500 " to="/patient/add-medical-history-registration/1">
                Go Back
              </Link>
              <p className="text-lg text-gray-900">
                Have an account?
                <button
                  type="link"
                  className="text-lg text-blue-500 pl-2"
                  to="/login"
                  onClick={() => resetFormFeilds()}
                >
                  Login
                </button>
              </p>
            </>

        </Form>

      </RegisterationLayout>
    </>
  );
};
export default AddCeirFormRegistration;
