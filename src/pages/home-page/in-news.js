import { Col, Row } from "antd";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import closeIcon from "../../assests/images/menu-close.svg";
import VidyardPlayer from "../../helpers/vidyardplayer";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export const InNews = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState("AzTBoHTejMDrqQgdeedG89");

  const videoList = [
    {
      videoId: "AzTBoHTejMDrqQgdeedG89",
      videoText: "Vaccination Walk-Through",
      thumbnail: "https://play.vidyard.com/AzTBoHTejMDrqQgdeedG89.jpg",
    },
    {
      videoId: "Tj9Nx44CtTe4fcFqfAf7jE",
      videoText: "Adverse Event Following Immunization",
      thumbnail: "https://play.vidyard.com/Tj9Nx44CtTe4fcFqfAf7jE.jpg",
    },
    {
      videoId: "vcv7AfpkARiJU94APUCxSj",
      videoText: "Why Get Vaccinated? ",
      thumbnail: "https://play.vidyard.com/vcv7AfpkARiJU94APUCxSj.jpg",
    },
    {
      videoId: "Pj42cUFKtAy3Bpvf5rh8p7",
      videoText: "Frequently Asked Questions on Vaccines",
      thumbnail: "https://play.vidyard.com/Pj42cUFKtAy3Bpvf5rh8p7.jpg",
    },
  ];

  const playVideo = (id) => {
    setShowVideo(!showVideo);
    setVideoId(id);
  };
  return (
    <div className="w-full relative mt-16">
      <div className="mx-8">
        <h2 className="text-center mb-8 sm:mb-16">In The News</h2>
      </div>
      {showVideo ? (
        <LightScreen
          videoId={videoId}
          toggleShowVideo={() => setShowVideo(!showVideo)}
        />
      ) : null}
      <div className="mx-8 xl:mx-auto max-w-1200 xxl:max-w-1440">
        <Row className="-mx-8">
          {videoList.map((value, index) => (
            <Col key={index} xs={24} sm={12} lg={8} className="px-8 mb-16">
              <div className="relative w-full h-auto">
                <div className="flex z-10 items-center justify-center bg-black bg-opacity-30 absolute top-0 w-full h-full">
                  <div
                    onClick={() => playVideo(value.videoId)}
                    className="flex items-center justify-center bg-white bg-opacity-20 w-16 h-16 rounded-full"
                  >
                    <span className="text-3xl text-white">
                      <FontAwesomeIcon icon={faPlay} />
                    </span>
                  </div>
                </div>
                <img className="max-h-64" src={value.thumbnail} alt="video" />
              </div>

              <p className="md:text-left text-center text-xl font-medium pt-4">
                {value.videoText}
              </p>
            </Col>
          ))}
          <Col xs={8}></Col>
        </Row>
      </div>
    </div>
  );
};

const LightScreen = ({ toggleShowVideo, videoId }) => {
  return (
    <div className="w-full fixed top-0 left-0 h-screen overflow-none z-20 bg-black bg-opacity-70 p-8 flex flex-col items-center">
      <div className="flex justify-end w-full">
        <img onClick={toggleShowVideo} src={closeIcon} alt="close" />
      </div>
      <div className="w-full max-w-xs sm:max-w-none md:w-6/12 mt-8">
        <VidyardPlayer uuid={videoId} type="inline" aspect="16:9" />
      </div>
    </div>
  );
};
