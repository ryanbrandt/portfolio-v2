import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Breadcrumbs, AppContext, Button, Badge } from "handsome-ui";

import {
  adminCreateWorkItemRequest,
  adminCreateResumeItemRequest,
} from "../actions";
import { getAdminActiveTab } from "../selectors";
import { history } from "../../routes";

import ResumeForm from "../Subcomponents/ResumeForm";
import { RootState } from "../../store/rootReducer";
import { AdminTab, ResumeItemForm, WorkItemForm } from "../types";
import WorkForm from "../Subcomponents/WorkForm";

interface Props {}

interface DispatchProps {
  createWorkItem: (item: any, resolve: any, reject: any) => void; // TODO
  createResumeItem: (item: any, resolve: any, reject: any) => void; // TODO
}
interface StateProps {
  activeTab: AdminTab;
}

const AdminItemCreation = (props: Props & DispatchProps & StateProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [item, setItem] = useState<ResumeItemForm | WorkItemForm>();

  const onCreateWorkItemClick = async (): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);

    await new Promise<string>((resolve, reject) => {
      const { createWorkItem } = props;

      createWorkItem(item, resolve, reject);
    })
      .then((successString: string) => setSuccessMessage(successString))
      .catch((error: string) => setErrorMessage(error));
  };

  const onCreateResumeItemClick = async (): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);

    await new Promise<string>((resolve, reject) => {
      const { createResumeItem } = props;

      createResumeItem(item, resolve, reject);
    })
      .then((successString: string) => setSuccessMessage(successString))
      .catch((error: string) => setErrorMessage(error));
  };

  const _renderCrumbs = (): React.ReactNode => {
    const crumbs = [
      {
        title: "Admin Dashboard",
        action: () => history.push("/admin"),
      },
      { title: "Create", action: () => null, disabled: true },
    ];

    return <Breadcrumbs crumbs={crumbs} />;
  };

  const _renderForm = (): React.ReactNode => {
    const { activeTab } = props;
    let form = <ResumeForm onUpdate={setItem} />;
    if (activeTab === "work") {
      form = <WorkForm onUpdate={setItem} />;
    }

    return form;
  };

  const _renderSubmit = (): React.ReactNode => {
    const { activeTab } = props;
    let action = onCreateResumeItemClick;
    if (activeTab === "work") {
      action = onCreateWorkItemClick;
    }

    return (
      <div className="flex_center_col admin_button_container">
        <Button title="Create Item" onClick={action} inverting />
      </div>
    );
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
    createWorkItem: (item: any, resolve: any, reject: any) =>
      dispatch(adminCreateWorkItemRequest(item, resolve, reject)),
    createResumeItem: (item: any, resolve: any, reject: any) =>
      dispatch(adminCreateResumeItemRequest(item, resolve, reject)),
  };
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    activeTab: getAdminActiveTab(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminItemCreation);
