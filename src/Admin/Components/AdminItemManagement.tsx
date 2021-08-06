import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Badge, Breadcrumbs, useIsMobile } from "handsome-ui";

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
import { ResumeItem, WorkItem } from "../../utils/types";

interface Props {}

interface DispatchProps {
  updateWorkItem: (item: WorkItemForm, resolve: any, reject: any) => void;
  updateResumeItem: (item: ResumeItemForm, resolve: any, reject: any) => void;
}

interface StateProps {
  activeTab: AdminTab;
  activeWorkItem: WorkItem;
  activeResumeItem: ResumeItem;
}

const AdminItemManagement = (props: Props & DispatchProps & StateProps) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onUpdateWorkItem = async (item: WorkItemForm): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setProcessing(true);

    await new Promise<string>((resolve, reject) => {
      const { updateWorkItem } = props;

      updateWorkItem(item, resolve, reject);
    })
      .then((successString: string) => setSuccessMessage(successString))
      .catch((error: string) => setErrorMessage(error));

    setProcessing(false);
  };

  const onUpdateResumeItem = async (item: ResumeItemForm): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setProcessing(true);

    await new Promise<string>((resolve, reject) => {
      const { updateResumeItem } = props;

      updateResumeItem(item, resolve, reject);
    })
      .then((successString: string) => setSuccessMessage(successString))
      .catch((error: string) => setErrorMessage(error));

    setProcessing(false);
  };

  const _renderCrumbs = () => {
    const { activeTab } = props;

    let item = "";
    if (activeTab === "resume") {
      const { activeResumeItem } = props;
      item = activeResumeItem.name;
    } else if (activeTab === "work") {
      const { activeWorkItem } = props;
      item = activeWorkItem.name;
    }

    const crumbs = [
      {
        title: "Admin Dashboard",
        action: () => history.push("/admin"),
      },
      { title: `Manage ${item}`, action: () => null, disabled: true },
    ];

    return <Breadcrumbs crumbs={crumbs} />;
  };

  const _renderForm = (): React.ReactNode => {
    const { activeTab, activeResumeItem, activeWorkItem } = props;

    let form = (
      <ResumeForm
        onSubmit={onUpdateResumeItem}
        activeItem={activeResumeItem}
        processing={processing}
      />
    );
    if (activeTab === "work") {
      form = (
        <WorkForm
          onSubmit={onUpdateWorkItem}
          activeItem={activeWorkItem}
          processing={processing}
        />
      );
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

  const isMobile = useIsMobile();

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
    updateWorkItem: (item: WorkItemForm, resolve: any, reject: any) =>
      dispatch(adminUpdateWorkItemRequest(item, resolve, reject)),
    updateResumeItem: (item: ResumeItemForm, resolve: any, reject: any) =>
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
