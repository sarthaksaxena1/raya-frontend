import { Card } from "antd";
import docQunicy from "../../../assests/images/doc-quincy.svg";
import docMac from "../../../assests/images/doc-mac.svg";
import useWindowDimensions from "../../../helpers/window-dimensions";

const { Meta } = Card;
export const OurTeamSection = () => {
  const { width } = useWindowDimensions();

  return (
    <div className="w-full md:w-10/12 md:mx-auto">
      <h2 className="text-center mb-8 sm:mb-16">Our Team</h2>
      <Card className="rounded-md shadow-custom border-none outline-none mb-8 px-0 sm:px-12 py-4 sm:py-8">
        <div className="flex flex-col xl:flex-row">
          <Card
            className="mx-auto w-48 xs:w-80"
            cover={
              <img
                alt="doctor"
                className="w-48 xs:w-80 h-auto"
                src={docQunicy}
              />
            }
          >
            <Meta
              className="flex justify-center"
              title={
                <span className="text-lg text-center flex justify-center ">
                  Dr. Quincy Raya
                </span>
              }
              description={
                <span className="text-center flex justify-center">Founder</span>
              }
            />
          </Card>
          <p className=" xl:w-8/12 flex-grow xl:ml-8 text-base mt-8 xl:mt-0">
            Dr. Raya is a preventive medicine physician with over ten years of
            vast clinical experience and expertise in patient wellness,
            integrative and nutritional medicine, and men’s and women’s health.
            <br />
            <br /> She is trained in Anti-Aging Medicine with Dr. Thierry
            Hertoghe (Paris), Preventive Medicine in Dresden International
            University (Germany), Andrology and Men’s Health with Dr. Peter Lim
            at Gleneagles Hospital (Singapore) and Nutritional Medicine with the
            Australian College of Nutritional and Environmental Medicine.
            <br />
            <br /> She will be graduating from the Leadership in Medicine
            Program of Harvard Medical School in September 2021.
          </p>
        </div>
      </Card>
      <Card className="rounded-md shadow-custom border-none outline-none px-0 sm:px-12 py-4 sm:py-8">
        <div className="flex flex-col xl:flex-row-reverse">
          <Card
            className="mx-auto w-48 xs:w-80"
            cover={
              <img alt="doctor" className="w-48 xs:w-80 h-auto" src={docMac} />
            }
          >
            <Meta
              className="flex justify-center"
              title={
                <span className="text-lg text-center break-all">
                  {width < 480 ? (
                    <span>
                      Mac Arthur
                      <br /> Manglicmot
                    </span>
                  ) : (
                    "Mac Arthur Manglicmot"
                  )}
                </span>
              }
              description={
                <span className="text-center flex justify-center">
                  Clinical manager
                </span>
              }
            />
          </Card>
          <p className=" xl:w-8/12 flex-grow xl:mr-8 text-base mt-8 xl:mt-0">
            Mac has years of experience in Hospital and Clinic management as a
            board certified Registered Nurse in the Philippines and abroad
            specializing in Adult Health, Nephrology, and Occupational Health
            Nursing, having been with St Luke’s Medical Center – Global City,
            Fresenius Kidney Care and Manila Doctors Hospital.
            <br />
            <br /> He aims to provide expertise in patient care for Raya Clinic
            as it expands the operations in the country.
          </p>
        </div>
      </Card>
    </div>
  );
};
