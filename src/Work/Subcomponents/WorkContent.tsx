import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import {
  Breadcrumbs,
  Column,
  Code,
  WorldWideWeb,
  Spinner,
  useIsMobile,
} from "handsome-ui";

import { history } from "../../routes";
import { RootState } from "../../store/rootReducer";
import { getActiveWorkItem } from "../selectors";
import { safeOpenWindow } from "../../utils/helpers";
import { WorkItem } from "../../utils/types";

interface Props {}

interface StateProps {
  activeItem: WorkItem;
}

const WorkContent = (props: Props & StateProps) => {
  const FALLBACK_IMG = "../project-placeholder.jpg";

  const isMobile = useIsMobile();

  const [imgLoaded, setImgLoaded] = useState(false);

  const { activeItem } = props;

  const handleImgLoaded = (): void => {
    setTimeout(() => setImgLoaded(true), 500);
  };

  const _renderLinks = (): React.ReactNode => {
    return (
      <div className="aligned_text">
        {activeItem.source && (
          <Fragment>
            <Code
              className="home_icon"
              onClick={() => safeOpenWindow(activeItem.source)}
            />
          </Fragment>
        )}
        {activeItem.deploy && (
          <Fragment>
            <WorldWideWeb
              className="home_icon"
              onClick={() => safeOpenWindow(activeItem.deploy)}
            />
          </Fragment>
        )}
      </div>
    );
  };

  const _renderHeader = (): React.ReactNode => {
    const crumbs = [
      {
        title: "Work",
        action: () => history.push("/work"),
      },
      { title: activeItem.name, disabled: true },
    ];

    return (
      <Fragment>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="aligned_text">{activeItem.name}</h1>
      </Fragment>
    );
  };

  const _renderImage = (): React.ReactNode => {
    let imgStyle = {};
    if (!imgLoaded) {
      imgStyle = { display: "none" };
    }

    let imgClassName = "fadeable-content work-img";
    if (isMobile) {
      imgClassName = "work-img-mobile";
    }

    return (
      <Fragment>
        <img
          style={imgStyle}
          className={imgClassName}
          src={activeItem.primaryImage || FALLBACK_IMG}
          onLoad={handleImgLoaded}
          alt={FALLBACK_IMG}
        />
        {!imgLoaded && <Spinner className="work-img-loading" />}
      </Fragment>
    );
  };

  if (activeItem) {
    return (
      <div className="work_content-container-mobile fadeable-content">
        {_renderHeader()}
        <div className="flex_center_col">{_renderImage()}</div>
        <Column className="work_content-datestring aligned_text">
          {activeItem.datestring}
          {_renderLinks()}
        </Column>
        <p dangerouslySetInnerHTML={{ __html: activeItem.description }} />
      </div>
    );
  }

  throw Error("No active item");
};

const mapStateToProps = (state: RootState) => {
  return {
    activeItem: getActiveWorkItem(state),
  };
};

export default connect<StateProps, void, Props, RootState>(mapStateToProps)(
  WorkContent
);
