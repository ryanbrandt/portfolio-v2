import React, { Fragment, useEffect, useContext } from "react";
import { connect } from "react-redux";

import { AppContext, Breadcrumbs, Column, Code } from "handsome-ui";

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
            <div
              className="work-link"
              onClick={() => safeOpenWindow(activeItem.deploy)}
            >
              Deployed Project
            </div>
          </Fragment>
        )}
      </div>
    );
  };

  const _renderMobileHeader = (): React.ReactNode => {
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
          isMobile
            ? "work_content-container-mobile fadeable-content"
            : " work_content-container"
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
        <Column className="work_content-datestring aligned_text">
          {activeItem.datestring}
          {_renderLinks()}
        </Column>
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

export default connect<StateProps, void, Props, RootState>(mapStateToProps)(
  WorkContent
);
