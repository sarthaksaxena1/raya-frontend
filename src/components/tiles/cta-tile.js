import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "antd";
import React from "react";

export const CtaTile = ({
  headerText,
  subText,
  onClickHandle,
  icon,
  bgColor,
  hideArrow,
}) => {
  return (
    <Card
      onClick={onClickHandle}
      className={
        bgColor
          ? "rounded-md shadow-md " + bgColor
          : "rounded-md shadow-md bg-blue-50"
      }
    >
      <div className="flex items-center text-gold-500">
        <FontAwesomeIcon className="text-2xl" icon={icon} />
        <h3 className="ml-4 font-semibold">{headerText}</h3>
      </div>
      <div className="flex items-end justify-between mt-2">
        <p className=" text-base text-gray-700">{subText}</p>
        {!hideArrow ? (
          <FontAwesomeIcon
            className="text-2xl font-light text-blue-700 ml-2"
            icon={faChevronRight}
          />
        ) : null}
      </div>
    </Card>
  );
};
