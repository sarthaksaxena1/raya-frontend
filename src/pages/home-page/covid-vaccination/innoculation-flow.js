import bgInnoculationImg from "../../../assests/images/innoculation-flow-bg-image.svg";
import step1 from "../../../assests/images/step-1.svg";
import step2 from "../../../assests/images/step-2.svg";
import step3 from "../../../assests/images/step-3.svg";
import step4 from "../../../assests/images/step-4.svg";
import mobStep1 from "../../../assests/images/mobStep1.svg";
import mobStep2 from "../../../assests/images/mobStep2.svg";
import mobStep3 from "../../../assests/images/mobStep3.svg";
import mobStep4 from "../../../assests/images/mobStep4.svg";
import { Col, Row } from "antd";
import useWindowDimensions from "../../../helpers/window-dimensions";

export const InnoculationFlowSection = () => {
  const { isMobile } = useWindowDimensions();
  const innoculationData = [
    {
      imgUrl: step1,
      mobImgUrl: mobStep1,
      mobKey: 1,
      label: "Registration",
      content:
        "Upon arriving at the vaccination center, identified recipients of the vaccine must show a valid ID, accomplish the Informed Consent Form, Health Screening Form",
    },
    {
      imgUrl: step2,
      mobImgUrl: mobStep2,
      mobKey: 2,
      label: "Screening and Health Education",
      content:
        "Answer truthfully questions on health, history of exposure to Covid-19, history of vaccination, medicines taking, etc. Listen carefully to the important information regarding Covid-19 vaccination. Consult the vaccination staff if you have concerns.",
    },
    {
      imgUrl: step3,
      mobImgUrl: mobStep3,
      mobKey: 3,
      label: "Vaccine Administration",
      content:
        "Vaccine will be administered within 1-2 minutes. Don't forget to pick up your vaccination card upon receiving the vaccine.",
    },
    {
      imgUrl: step4,
      mobImgUrl: mobStep4,
      mobKey: 4,
      label: "Observation",
      content:
        "Vaccinees must remain in the facility for 15-30 minutes for observation of reactions, unpleasant sensibilities, or effects of the vaccine.",
    },
  ];
  return (
    <div className="mt-12 w-full relative">
      <div className="z-negative absolute bottom-0 right-0 hidden md:block">
        <img src={bgInnoculationImg} alt="" />
      </div>
      <div className="mx-8 xl:mx-auto max-w-1200 xxl:max-w-1440">
        <div className="flex flex-col">
          <div>
            <h2 className="text-center mb-8 sm:mb-4">Inoculation Flow</h2>
          </div>
          <div className="flex-grow md:flex-grow pt-16 ">
            {innoculationData.map((value, index) => (
              <Row key={index} className="mb-16 md:mb-24 md:items-center">
                <Col xs={24} md={8}>
                  {isMobile ? (
                    index % 2 === 0 ? (
                      <img
                        className="mr-auto"
                        src={value.mobImgUrl}
                        alt={value.label}
                      />
                    ) : (
                      <img
                        className="ml-auto"
                        src={value.mobImgUrl}
                        alt={value.label}
                      />
                    )
                  ) : (
                    <img
                      className="mx-auto h-36 w-80"
                      src={value.mobImgUrl}
                      alt={value.label}
                    />
                  )}
                </Col>
                <Col
                  xs={24}
                  md={14}
                  xl={10}
                  className="text-center md:text-left"
                >
                  {isMobile ? (
                    <p className="text-lg font-medium mb-4 mt-4 text-left">
                      {value.label}
                    </p>
                  ) : (
                    <p className="text-lg font-medium mb-4 mt-4 ml-44">
                      {value.label}
                    </p>
                  )}
                  {isMobile ? (
                    <p className="text-lg text-left">{value.content}</p>
                  ) : (
                    <p className="text-base w-9/12 ml-44">{value.content}</p>
                  )}
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
