import React from "react";
import { connect } from "react-redux";

import { Modal } from "handsome-ui";

import { RootState } from "../../store/rootReducer";
import { getActiveWorkItem } from "../selectors";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface StateProps {
  activeItem: any; // TODO
}

const WorkContent = (props: Props & StateProps) => {
  const { open, activeItem, onClose } = props;

  if (activeItem) {
    return (
      <Modal heading={activeItem.name} open={open} onClose={onClose}>
        <div className="work_content-datestring">{activeItem.datestring}</div>
        <div className="work_content-container">
          <p>{activeItem.description}</p>
        </div>
      </Modal>
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
