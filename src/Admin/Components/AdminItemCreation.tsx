import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Breadcrumbs, AppContext, Badge } from "handsome-ui";

import {
  adminCreateWorkItemRequest,
  adminCreateResumeItemRequest,
} from "../actions";
import { getAdminActiveTab } from "../selectors";
import { history } from "../../routes";
import { AdminTab, ResumeItemForm, WorkItemForm } from "../types";
import ResumeForm from "../Subcomponents/ResumeForm";
import { RootState } from "../../store/rootReducer";

import WorkForm from "../Subcomponents/WorkForm";

interface Props {}

interface DispatchProps {
  createWorkItem: (item: WorkItemForm, resolve: any, reject: any) => void;
  createResumeItem: (item: ResumeItemForm, resolve: any, reject: any) => void;
}
interface StateProps {
  activeTab: AdminTab;
}

const AdminItemCreation = (props: Props & DispatchProps & StateProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const onCreateWorkItem = async (item: WorkItemForm): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setProcessing(true);

    await new Promise<string>((resolve, reject) => {
      const { createWorkItem } = props;

      createWorkItem(item, resolve, reject);
    })
      .then((successString: string) => setSuccessMessage(successString))
      .catch((error: string) => setErrorMessage(error));

    setProcessing(false);
  };

  const onCreateResumeItem = async (item: ResumeItemForm): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setProcessing(true);

    await new Promise<string>((resolve, reject) => {
      const { createResumeItem } = props;

      createResumeItem(item, resolve, reject);
    })
      .then((successString: string) => setSuccessMessage(successString))
      .catch((error: string) => setErrorMessage(error));

    setProcessing(false);
  };

  const _renderCrumbs = (): React.ReactNode => {
    const { activeTab } = props;

    const crumbs = [
      {
        title: "Admin Dashboard",
        action: () => history.push("/admin"),
      },
      { title: `Create ${activeTab} item`, action: () => null, disabled: true },
    ];

    return <Breadcrumbs crumbs={crumbs} />;
  };

  const _renderForm = (): React.ReactNode => {
    const { activeTab } = props;
    let form = (
      <ResumeForm onSubmit={onCreateResumeItem} processing={processing} />
    );
    if (activeTab === "work") {
      form = <WorkForm onSubmit={onCreateWorkItem} processing={processing} />;
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

  const isMobile = useContext(AppContext);

  return (
    <div className={isMobile ? "admin_manage-container-mobile" : ""}>
      {_renderCrumbs()}
      {_renderForm()}
      {_renderMessageSection()}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    createWorkItem: (item: WorkItemForm, resolve: any, reject: any) =>
      dispatch(adminCreateWorkItemRequest(item, resolve, reject)),
    createResumeItem: (item: ResumeItemForm, resolve: any, reject: any) =>
      dispatch(adminCreateResumeItemRequest(item, resolve, reject)),
  };
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    activeTab: getAdminActiveTab(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminItemCreation);
