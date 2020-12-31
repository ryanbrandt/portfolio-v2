import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Button, Column, Modal } from "handsome-ui";

import {
  adminDeleteResumeItemRequest,
  adminDeleteWorkItemRequest,
} from "../actions";
import { ResumeItem, WorkItem } from "../../utils/types";
import { getAdminActiveTab } from "../selectors";
import { RootState } from "../../store/rootReducer";
import { AdminTab } from "../types";

interface Props {
  item: ResumeItem | WorkItem;
  open: boolean;
  onClose: Function;
}

interface StateProps {
  activeTab: AdminTab;
}

interface DispatchProps {
  deleteWorkItem: (id: number) => void;
  deleteResumeItem: (id: number) => void;
}

const AdminDeleteModal = (
  props: Props & DispatchProps & StateProps
): JSX.Element => {
  const { open, onClose, item } = props;

  const handleConfirmClick = () => {
    const { activeTab, deleteResumeItem, deleteWorkItem } = props;

    if (activeTab === "resume") {
      deleteResumeItem(item.id);
    }

    if (activeTab === "work") {
      deleteWorkItem(item.id);
    }

    onClose();
  };

  return (
    <Modal open={open} heading="" onClose={onClose}>
      <Column className="flex_center_col">
        <div className="admin_delete-modal-details">{`Delete ${item.name}?`}</div>
        <Button title="Confirm" onClick={handleConfirmClick} inverting />
        <div className="admin_delete-modal-cancel" onClick={() => onClose()}>
          Cancel
        </div>
      </Column>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    activeTab: getAdminActiveTab(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    deleteWorkItem: (id: number) => dispatch(adminDeleteWorkItemRequest(id)),
    deleteResumeItem: (id: number) =>
      dispatch(adminDeleteResumeItemRequest(id)),
  };
};

export default connect<StateProps, DispatchProps, Props, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(AdminDeleteModal);
