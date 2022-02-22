import { Col, Row } from "antd";
import tile1 from "../../../assests/images/affiliate-logo-1.svg";
import tile2 from "../../../assests/images/affiliate-logo-2.svg";

export const AffiliatesSection = () => {
  const affiliatesArray = [
    {
      name: "nutrigenicsasia",
      imgUrl: tile2,
      link: "http://www.nutrigenicsasia.com/",
      desc: (
        <span >
          Nutrigenics Asia is a boutique pharmaceutical company specializing in
          the importation and distribution of pharmaceutical grade
          nutraceuticals, natural hormone preparations, physiology-based weight
          loss supplements, high-quality aesthetic products, breakthrough
          regenerative equipment and other wellness related products.
        </span>
      ),
    },
    {
      name: "raya",
      imgUrl: tile1,
      link: "http://www.rayapreventive.com/ ",
      desc: (
        <span>
          The Raya Clinic specializes in the prevention and early detection of
          diseases, whether acute or chronic, as well as aesthetic and
          regenerative treatments to help you become and stay fully healthy and
          well.
        </span>
      ),
    },
  ];
  return (
    <div className="w-full md:w-10/12 md:mx-auto mt-16 pb-16">
      <h2 className="text-center mt-16 mb-8 sm:mb-16">Affiliates</h2>
      <Row className="-mx-2 justify-center">
        {affiliatesArray.map((val, index) => (
          <Col
            key={index}
            xs={24}
            sm={12}
            md={10}
            lg={8}
            className="px-2 flex mb-4 sm:mb-0"
          >
            <div
              onClick={() => window.open(val.link, "_blank")}
              className="shadow-custom w-full flex flex-col rounded-md bg-white cursor-pointer"
            >
              <div className="flex rounded-md h-48 items-center justify-center shadow-custom">
                <img src={val.imgUrl} alt="affiliate" />
              </div>
              <div className="px-4 py-4">
                <p className="text-sm text-center">{val.desc}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
