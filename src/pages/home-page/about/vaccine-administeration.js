import { Col, Row } from "antd";
import vaccination1 from "../../../assests/images/vaccination1.svg";
import vaccination2 from "../../../assests/images/vaccination2.svg";
import vaccination3 from "../../../assests/images/vaccination3.svg";
import vaccination4 from "../../../assests/images/vaccination4.svg";
import vaccination5 from "../../../assests/images/vaccination5.svg";
import vaccination6 from "../../../assests/images/vaccination6.svg";

export const VaccineAdministeration = () => {
  const vaccinationImagesList = [
    { imgUrl: vaccination1 },
    { imgUrl: vaccination2 },
    { imgUrl: vaccination3 },
    { imgUrl: vaccination4 },
    { imgUrl: vaccination5 },
    { imgUrl: vaccination6 },
  ];
  return (
    <div className="w-full md:w-10/12 md:mx-auto mt-16">
      <h2 className="text-center mb-8">Vaccine Administration</h2>
      <p className="text-center mb-12 text-lg md:text-xl">
        The Raya Clinic’s medical staff are trained and equipped with the proper
        knowledge to carry out a safe and proper administration of the Moderna
        vaccine. We have the capacity to vaccinate 100,000 patients per month,
        or potentially scale depending on your requirements.
      </p>
      <Row>
        {vaccinationImagesList.map((value, index) => (
          <Col xs={24} sm={12} md={8} key={index} className="flex items-center justify-center">
            <img src={value.imgUrl} alt="vaccination" />
          </Col>
        ))}
      </Row>
    </div>
  );
};
