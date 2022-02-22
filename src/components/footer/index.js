import { Row, Col } from "antd";
import logo from "../../assests/images/footer-logo.svg";
import locationIcon from "../../assests/images/location-icon.png";
import calendarIcon from "../../assests/images/calendar-icon.png";
import callIcon from "../../assests/images/call-icon.png";
import bgFooter from "../../assests/images/bg-footer.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div id="#contact">
      <div className="bg-blue-600 w-full relative">
        <div className="z-negative absolute right-0 hidden md:block">
          <img src={bgFooter} alt="" />
        </div>
        <div className="mx-8 xl:mx-auto max-w-1200 xxl:max-w-1440">
          <div className="pt-8">
            <img src={logo} alt="logo" />
          </div>
          <Row className="mt-8 pb-24">
            <Col xs={24} sm={12} lg={8} className="flex">
              <div className="w-8 h-auto mr-4">
                <img className="w-full h-auto" src={locationIcon} alt="icon" />
              </div>
              <span className="text-lg text-white w-10/12">
                The Raya Clinic <br /> 2505 25th Floor, Centuria Medical Makati,
                Century City, Gen. Luna St., Brgy. Poblacion, Makati City,
                Philippines
              </span>
            </Col>
            <Col
              xs={24}
              sm={12}
              lg={9}
              className="flex sm:justify-center mt-8 sm:mt-0"
            >
              <div className="w-8 h-auto mr-4">
                <img className="w-full h-auto" src={calendarIcon} alt="icon" />
              </div>
              <p className="text-lg text-white md:w-6/12">
                Monday – Sunday
                <br /> 8am – 5pm
              </p>
            </Col>
            <Col
              xs={24}
              sm={12}
              lg={7}
              className="flex md:justify-center mt-8 lg:mt-0"
            >
              <div className="w-8 h-auto mr-4">
                <img className="w-full h-auto" src={callIcon} alt="icon" />
              </div>
              <p className="text-lg text-white w-10/12">
                info@raya-health.com <br />
                0917 890 1422
              </p>
            </Col>
          </Row>
        </div>
      </div>
      <div className="text-center pt-4 pb-4">
        <span className="text-lg">
          <span>&#169;</span> 2021 by Raya Health
        </span>
        <span className="text-lg"> | </span>
        <Link className="text-lg" to="/privacy-policy">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};
