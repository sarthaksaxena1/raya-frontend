import { MobilePagesScreenLayout } from "../../layouts/screens/common-mobile";
import { Col, Row, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientCeirDetails } from "../../appRedux/actions/PatientProfileDetails";
import moment from "moment";

const PatientCEIRDetails = () => {
  const isLoaded = useSelector((state) => state.patientProfile.isLoaded);
  const patientCeirData = useSelector(
    (state) => state.patientProfile.patientCeirData
  );
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientCeirDetails());
  }, []);

  useEffect(() => {
    setData(patientCeirData);
  }, [isLoaded]);

  const ceirData = [
    {
      label: "First Name",
      value: data?.firstname,
    },
    {
      label: "Last Name",
      value: data?.lastname,
    },
    {
      label: "Suffix",
      value: !data.suffix || data.suffix === "undefined" ? "" : data.suffix,
    },
    {
      label: "Contact",
      value: data?.contact_no,
    },
    {
      label: "Email",
      value: data?.email,
    },
    {
      label: "Date of Birth",
      value: data?.date_of_birth
        ? moment(data.date_of_birth, "YYYY-MM-DD").format("Do MMMM, YYYY")
        : null,
    },
    {
      label: "Gender",
      value: data?.gender,
    },
    {
      label: "Priority",
      value: data?.priority_group,
    },
    {
      label: "Comorbidity",
      value: data?.has_commorbidity ? data.commorbidity : "No",
    },
    {
      label: "Region",
      value: data?.region,
    },
    {
      label: "Province",
      value: data?.province,
    },
    {
      label: "City",
      value: data?.city,
    },
    {
      label: "Barangay",
      value: data?.barangay,
    },
    {
      label: "Occupation",
      value: data?.occupation,
    },
    {
      label: "Has Allergy",
      value: data?.has_allergy ? "Yes" : "No",
    },
  ];

  return (
    <MobilePagesScreenLayout
      pageTitle="CEIR Details"
      userIcon={false}
      showRayaLogo={false}
    >
      <div>
        <div className="flex items-center justify-between min-w-full h-12">
          <span></span>
          {patientCeirData?.is_verified ? (
            <Tag className="mr-0 mb-4" color="success">
              <span className="text-xl ">Verified</span>
            </Tag>
          ) : patientCeirData?.is_rejected ? (
            <Tag className="mr-0 mb-4" color="error">
              <span className="text-xl ">Rejected</span>
            </Tag>
          ) : (
            <Tag className="mr-0 mb-4" color="warning">
              <span className="text-xl ">Submitted</span>
            </Tag>
          )}
        </div>
        <div className="min-w-full mb-8">
          {ceirData.map((val) => (
            <Row className="mb-5">
              <Col xs={10}>
                <span className=" text-xl font-semi-bold">{val.label}:</span>
              </Col>
              <Col xs={14} className="text-right ">
                <span className=" text-xl font-light  break-words">
                  {val.value}
                </span>
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </MobilePagesScreenLayout>
  );
};

export default PatientCEIRDetails;
