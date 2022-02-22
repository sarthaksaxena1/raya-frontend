import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
import { RightOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row, Button, Avatar, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientProfileDetails } from "../../appRedux/actions/PatientProfileDetails";
import moment from "moment";

const PatientProfile = () => {
  const isLoaded = useSelector((state) => state.patientProfile.isLoaded);
  const patientProfileData = useSelector(
    (state) => state.patientProfile.patientProfileData
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    dispatch(getPatientProfileDetails());
  }, []);

  useEffect(() => {
    setData(patientProfileData);
    setPatientId(patientProfileData ? patientProfileData.id : null);
  }, [isLoaded]);

  const profileData = [
    {
      label: "First Name",
      value: data?.first_name,
    },
    {
      label: "Middle Name",
      value: data?.middle_name ? data.middle_name : "NA",
    },
    {
      label: "Last Name",
      value: data?.last_name,
    },
    {
      label: "Email",
      value: data?.email,
    },
    {
      label: "Contact",
      value: data?.mobile,
    },
    {
      label: "Date of Birth",
      value: data?.date_of_birth
        ? moment(data.date_of_birth, "YYYY-MM-DD").format("Do MMMM, YYYY")
        : "-",
    },
    {
      label: "Gender",
      value: data?.gender,
    },
  ];

  return (
    <MobilePagesScreenLayout
      pageTitle="User Profile"
      userIcon={false}
      showRayaLogo={false}
    >
      <div className="mt-4">
        <div className="flex items-center">
          <div className="w-15">
            <Avatar
              className=" flex items-center justify-center mr-4 mt-2 bg-gray-500 "
              size={60}
              icon={<UserOutlined />}
            />
          </div>
          <div className="ml-2 pt-2">
            <span className="text-2xl font-bold break-word">
              {data?.first_name + " " + data?.last_name}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between min-w-full h-12">
          <span className="flex align center font-semibold text-xl pt-8 ">
            Profile Details
          </span>
          <Tooltip title="Edit User Details">
            <EditOutlined
              className="text-xl pt-8 "
              onClick={() => history.push("/patient/edit-profile/" + patientId)}
            />
          </Tooltip>
        </div>
        <div className="mt-8">
          {profileData.map((val) => (
            <Row className="mb-2">
              <Col xs={10}>
                <span className=" text-lg font-semi-bold">{val.label}:</span>
              </Col>
              <Col xs={14} className="text-right">
                <span className=" text-lg font-light break-all">
                  {val.value}
                </span>
              </Col>
            </Row>
          ))}
          {patientProfileData.preferred_location != null &&
          patientProfileData.is_allocated_vaccine === false ? (
            <Row className="mb-2">
              <Col xs={10}>
                <span className=" text-lg font-semi-bold">
                  Preferred Location:
                </span>
              </Col>
              <Col xs={14} className="text-right">
                <span className=" text-lg font-light break-all">
                  {patientProfileData.preferred_location}
                </span>
              </Col>
            </Row>
          ) : null}
        </div>

        {!!data?.qr_code_link ? (
          <div className="w-10/12 mx-auto mt-4">
            <img
              className="w-44 h-44 mr-auto ml-auto"
              src={data?.qr_code_link}
              alt="qr-code"
            />
          </div>
        ) : null}

        {data?.has_ceir_details ? (
          <div
            onClick={() => history.push("/patient/ceir")}
            className="flex items-center justify-between min-w-full h-12"
          >
            <span className="flex align center font-semibold text-xl pt-4 ">
              View CEIR Details
            </span>
            <RightOutlined className="text-xl pt-4 " />
          </div>
        ) : null}

        {data?.is_medical_history_submitted ? (
          <div
            onClick={() => history.push("/patient/medical-history/1")}
            className="flex items-center justify-between min-w-full h-12"
          >
            <span className="flex align center font-semibold text-xl pt-4 ">
              View Medical History
            </span>
            <RightOutlined className="text-xl pt-4 " />
          </div>
        ) : null}

        <div
          onClick={() => history.push("/patient/change-password")}
          className="flex items-center justify-between min-w-full h-12"
        >
          <span className="flex align center font-semibold text-xl pt-4 ">
            Change Password
          </span>
          <RightOutlined className="text-xl pt-4 " />
        </div>

        <div className="min-w-full ">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-10 mb-8 h-12 text-xl rounded-md"
            onClick={() => history.push("/logout")}
          >
            Logout
          </Button>
        </div>
      </div>
    </MobilePagesScreenLayout>
  );
};

export default PatientProfile;
