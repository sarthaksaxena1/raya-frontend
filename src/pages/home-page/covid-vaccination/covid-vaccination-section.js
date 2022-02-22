import { Col, Row } from "antd";
// import covaxinImg from "../../../assests/images/covaxin.svg";
import modernaImg from "../../../assests/images/moderna.svg";
import coronaBgImg from "../../../assests/images/corona-bg.svg";
import { CovidFaqs } from "./covid-faq";
import { InnoculationFlowSection } from "./innoculation-flow";

export const CovidVaccination = () => {
  return (
    <div
      id="#covid"
      className="bg-red-50 bg-opacity-50 w-full relative covid-vaccination"
    >
      <div
        style={{ top: 900, left: "50%", transform: "translateX(-50%)" }}
        className="z-negative absolute hidden md:block"
      >
        <img src={coronaBgImg} alt="" />
      </div>
      <div className="mx-8 pt-16">
        <h1 className="text-center mb-12 sm:mb-16">COVID 19 Vaccination</h1>
      </div>
      <div className="mx-8 xl:mx-auto max-w-1200 xxl:max-w-1440">
        <div>
          <Row className="flex -mx-8 mb-12">
            <Col xs={24} md={12} lg={11} className="px-8">
              <div className="w-full h-full mb-12 md:mb-0 ">
                <img
                  className="rounded-tl-4xl rounded-br-4xl w-full h-auto"
                  src={modernaImg}
                  alt="moderna"
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={13} className="px-8 flex items-center">
              <div>
                <h2 className="font-medium mb-8 md:mb-12">
                  What is Moderna and how does it work?
                </h2>
                <p className="text-xl">
                  The Moderna vaccine is an mRNA vaccine that injects genetic
                  material that our body reads to make spike proteins. These
                  proteins trigger our immune response, getting our body ready
                  to recognize and fight off the virus.
                </p>
              </div>
            </Col>
          </Row>
          {/* <Row className="flex flex-row-reverse -mx-8 mb-12">
            <Col xs={24} md={12} lg={11} className="px-8">
              <div className="w-full h-full mb-12 md:mb-0">
                <img
                  className="rounded-tl-4xl rounded-br-4xl w-full h-auto"
                  src={covaxinImg}
                  alt="covaxin"
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={13} className="px-8 flex items-center">
              <div>
                <h2 className="font-medium mb-8 md:mb-12">
                  What is Covaxin and how does it work?
                </h2>
                <p className="text-xl">
                  Covaxin is an inactivated vaccine which means that it is made
                  up of killed coronaviruses, making it safe to be injected into
                  the body.
                  <br />
                  <br /> Bharat Biotech, a 24-year-old vaccine maker with a
                  portfolio of 16 vaccines and exports to 123 countries, used a
                  sample of the coronavirus, isolated by India's National
                  Institute of Virology.
                </p>
              </div>
            </Col>
          </Row>
         */}
        </div>
        <CovidFaqs />
      </div>
      <InnoculationFlowSection />
    </div>
  );
};
