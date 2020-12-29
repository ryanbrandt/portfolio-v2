import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AppContext, Badge, Breadcrumbs, Button } from "handsome-ui";

import { history } from "../../routes";
import {
  getAdminActiveTab,
  getAdminResumeActiveItem,
  getAdminWorkActiveItem,
} from "../selectors";
import {
  adminUpdateResumeItemRequest,
  adminUpdateWorkItemRequest,
} from "../actions";
import { AdminTab, ResumeItemForm, WorkItemForm } from "../types";
import { RootState } from "../../store/rootReducer";

import ResumeForm from "../Subcomponents/ResumeForm";
import WorkForm from "../Subcomponents/WorkForm";

interface Props {}

interface DispatchProps {
  updateWorkItem: (item: any, resolve: any, reject: any) => void; // TODO
  updateResumeItem: (item: any, resolve: any, reject: any) => void; // TODO
}

interface StateProps {
  activeTab: AdminTab;
  activeWorkItem: any; // TODO
  activeResumeItem: any; // TODO
}

const AdminItemManagement = (props: Props & DispatchProps & StateProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [item, setItem] = useState<ResumeItemForm | WorkItemForm>();

  const onUpdateWorkItemClick = async (): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);

    await new Promise<string>((resolve, reject) => {
      const { updateWorkItem } = props;

      updateWorkItem(item, resolve, reject);
    })
      .then((successString: string) => setSuccessMessage(successString))
      .catch((error: string) => setErrorMessage(error));
  };

  const onUpdateResumeItemClick = async (): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);

    await new Promise<string>((resolve, reject) => {
      const { updateResumeItem } = props;

      updateResumeItem(item, resolve, reject);
    })
      .then((successString: string) => setSuccessMessage(successString))
      .catch((error: string) => setErrorMessage(error));
  };

  const _renderCrumbs = () => {
    const crumbs = [
      {
        title: "Admin Dashboard",
        action: () => history.push("/admin"),
      },
      { title: "Manage", action: () => null, disabled: true },
    ];

    return <Breadcrumbs crumbs={crumbs} />;
  };

  const _renderForm = (): React.ReactNode => {
    const { activeTab, activeResumeItem, activeWorkItem } = props;

    let form = <ResumeForm onUpdate={setItem} activeItem={activeResumeItem} />;
    if (activeTab === "work") {
      form = <WorkForm onUpdate={setItem} activeItem={activeWorkItem} />;
    }

    return form;
  };

  const _renderMessageSection = (): React.ReactNode => {
    let message: string | null = null;
    let className = "app-success";

    if (errorMessage) {
      className = "app-error";
      message = errorMessage;
    }

    if (successMessage) {
      message = successMessage;
    }

    if (message) {
      return (
        <div className="flex_center_col">
          <Badge
            className={`fadeable-content ${className}`}
            content={message}
          />
        </div>
      );
    }

    return null;
  };

  const _renderSubmit = (): React.ReactNode => {
    const { activeTab } = props;
    let action = onUpdateResumeItemClick;
    if (activeTab === "work") {
      action = onUpdateWorkItemClick;
    }

    return (
      <div className="flex_center_col admin_button_container">
        <Button title="Update Item" onClick={action} inverting />
      </div>
    );
  };

  const isMobile = useContext(AppContext);

  return (
    <div className={isMobile ? "admin_manage-container-mobile" : ""}>
      {_renderCrumbs()}
      {_renderForm()}
      {_renderSubmit()}
      {_renderMessageSection()}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    updateWorkItem: (item: any, resolve: any, reject: any) =>
      dispatch(adminUpdateWorkItemRequest(item, resolve, reject)),
    updateResumeItem: (item: any, resolve: any, reject: any) =>
      dispatch(adminUpdateResumeItemRequest(item, resolve, reject)),
  };
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    activeTab: getAdminActiveTab(state),
    activeWorkItem: getAdminWorkActiveItem(state),
    activeResumeItem: getAdminResumeActiveItem(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminItemManagement);
