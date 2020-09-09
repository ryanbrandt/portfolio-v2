import React from "react";

import { AppContext } from "handsome-ui";

interface Props {
  imgSrc: string;
  title: string;
  onClick: () => void;
}

const ContentCard = (props: Props) => {
  const { imgSrc, title, onClick } = props;

  const _renderCard = (isMobile: boolean) => {
    const cssModifier = isMobile ? "-mobile" : "";

    return (
      <div className={`content_card-container${cssModifier}`} onClick={onClick}>
        <h3 className="content_card-title">{title}</h3>
        <div>
          <img
            className="content_card-img"
            src={imgSrc}
            alt="project-placeholder.jpg"
          />
        </div>
      </div>
    );
  };

  return (
    <AppContext.Consumer>
      {(isMobile) => _renderCard(isMobile)}
    </AppContext.Consumer>
  );
};

export default ContentCard;
