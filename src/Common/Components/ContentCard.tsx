import React from "react";

import { useIsMobile } from "handsome-ui";

interface Props {
  imgSrc: string;
  title: string;
  onClick: () => void;
}

const ContentCard = (props: Props): JSX.Element => {
  const { imgSrc, title, onClick } = props;

  const isMobile = useIsMobile();

  const cssModifier = isMobile ? "-mobile" : "";
  const fadeClassName = isMobile ? "fadeable-content" : "fadeable-half-content";

  return (
    <div
      className={`${fadeClassName} content_card-container${cssModifier}`}
      onClick={onClick}
    >
      <h3 className="content_card-title">{title}</h3>
      <div>
        <img
          className="content_card-img"
          src={imgSrc}
          alt="../project-placeholder.jpg"
        />
      </div>
    </div>
  );
};

export default ContentCard;
