import bannerImg from "../../assests/images/hero-banner-img.png";
import bannerMobileImg from "../../assests/images/hero-banner-mobile-img.png";
import useWindowDimensions from "../../helpers/window-dimensions";

export const HeroBanner = () => {
  const { isMobile } = useWindowDimensions();

  return (
    <div id="#home" className="w-full relative">
      <img
        className="min-h-800 sm:min-h-500 min-w-full"
        src={isMobile ? bannerMobileImg : bannerImg}
        alt="banner"
      />
      <div className="absolute top-0 w-full h-full">
        <div className="mx-8 xl:mx-auto max-w-1200 xxl:max-w-1440">
          <div className="p-10 lg:w-8/12 xl:w-6/12 mt-32 md:mt-32 xl:mt-40 xxl:mt-60 bg-black bg-opacity-30 rounded-tl-4xl rounded-br-4xl">
            <h1 className="text-white text-2xl sm:text-4xl">
              Raya Health
            </h1>
            <p className="text-lg text-white mt-8 font-medium">
              We specialize in the prevention and early detection of diseases,
              whether acute or chronic, as well as aesthetic and regenerative
              treatments to help you become and stay fully healthy and well.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
