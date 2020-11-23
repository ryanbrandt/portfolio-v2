import React, { Fragment, useEffect, useContext } from "react";
import { connect } from "react-redux";

import { AppContext, Breadcrumbs } from "handsome-ui";

import { history } from "../../routes";
import { RootState } from "../../store/rootReducer";
import { getActiveWorkItem } from "../selectors";
import { safeOpenWindow } from "../../utils/helpers";

interface Props {}

interface StateProps {
  activeItem: any; // TODO
}

const WorkContent = (props: Props & StateProps) => {
  const isMobile = useContext(AppContext);
  const { activeItem } = props;

  useEffect(() => {
    const WORK_ITEM_PATH_REGEX = /\/work\/[-0-9]+/;
    const { location } = window;
    const { pathname } = location;
    if (WORK_ITEM_PATH_REGEX.test(pathname) && (!isMobile || !activeItem.id)) {
      history.push("/work");
    }
  }, [isMobile, activeItem]);

  const _renderLinks = () => {
    return (
      <Fragment>
        {activeItem.source && (
          <Fragment>
            <div
              className="work-link"
              onClick={() => safeOpenWindow(activeItem.source)}
            >
              Source
            </div>
          </Fragment>
        )}
        {activeItem.deploy && (
          <Fragment>
            <div
              className="work-link"
              onClick={() => safeOpenWindow(activeItem.deploy)}
            >
              Deployed Project
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };

  const _renderMobileHeader = () => {
    const crumbs = [
      {
        title: "Work",
        action: () => history.push("/work"),
      },
      { title: activeItem.name, action: () => null, disabled: true },
    ];

    return (
      <Fragment>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="aligned_text">{activeItem.name}</h1>
      </Fragment>
    );
  };

  if (activeItem) {
    return (
      <div
        className={
          isMobile ? "work_content-container-mobile" : " work_content-container"
        }
      >
        {isMobile && _renderMobileHeader()}
        <div className="flex_center_col">
          <img
            className={isMobile ? "work-img-mobile" : "work-img"}
            src="../project-placeholder.jpg"
            alt="project-placeholder.jpg"
          />
        </div>
        <div className="work_content-datestring">
          {activeItem.datestring}
          {_renderLinks()}
        </div>
        <p>{activeItem.description}</p>
      </div>
    );
  }

  return null;
};

const mapStateToProps = (state: RootState) => {
  return {
    activeItem: getActiveWorkItem(state),
  };
};

export default connect<StateProps, void, Props, any>(mapStateToProps)(
  WorkContent
);
