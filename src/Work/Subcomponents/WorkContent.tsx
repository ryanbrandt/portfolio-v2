import React, { Fragment } from "react";
import { connect } from "react-redux";

import { Modal, AppContext, Row } from "handsome-ui";

import { RootState } from "../../store/rootReducer";
import { getActiveWorkItem } from "../selectors";
import { safeOpenWindow } from "../../utils/helpers";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface StateProps {
  activeItem: any; // TODO
}

const WorkContent = (props: Props & StateProps) => {
  const { open, activeItem, onClose } = props;

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

  if (activeItem) {
    return (
      <AppContext.Consumer>
        {(isMobile) => (
          <Modal heading={activeItem.name} open={open} onClose={onClose}>
            <div className="work_content-container">
              <div className="flex_center_col">
                <img
                  className={isMobile ? "work-img-mobile" : "work-img"}
                  src="project-placeholder.jpg"
                  alt="project-placeholder.jpg"
                />
              </div>
              <div className="work_content-datestring">
                {activeItem.datestring}
                {_renderLinks()}
              </div>
              <p>{activeItem.description}</p>
            </div>
          </Modal>
        )}
      </AppContext.Consumer>
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
