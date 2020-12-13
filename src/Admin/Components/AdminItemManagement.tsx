import React, { useContext } from "react";
import { connect } from "react-redux";

import { AppContext, Breadcrumbs } from "handsome-ui";

import { history } from "../../routes";
import { getAdminActiveTab } from "../selectors";

import ResumeForm from "../Subcomponents/ResumeForm";
import { AdminTab } from "../types";
import { RootState } from "../../store/rootReducer";
import WorkForm from "../Subcomponents/WorkForm";

interface Props {}

interface StateProps {
  activeTab: AdminTab;
}

const AdminItemManagement = (props: Props & StateProps) => {
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
    const { activeTab } = props;
    let form = <ResumeForm />;
    if (activeTab === "work") {
      form = <WorkForm />;
    }

    return form;
  };

  const isMobile = useContext(AppContext);

  return (
    <div className={isMobile ? "admin_manage-container-mobile" : ""}>
      {_renderCrumbs()}
      {_renderForm()}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    activeTab: getAdminActiveTab(state),
  };
};

export default connect(mapStateToProps)(AdminItemManagement);
