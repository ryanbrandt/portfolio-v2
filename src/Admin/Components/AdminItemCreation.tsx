import React, { useContext } from "react";
import { connect } from "react-redux";

import { Breadcrumbs, AppContext } from "handsome-ui";

import { getAdminActiveTab } from "../selectors";
import { history } from "../../routes";

import ResumeForm from "../Subcomponents/ResumeForm";
import { RootState } from "../../store/rootReducer";
import { AdminTab } from "../types";
import WorkForm from "../Subcomponents/WorkForm";

interface Props {}

interface StateProps {
  activeTab: AdminTab;
}

const AdminItemCreation = (props: Props & StateProps) => {
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
    let form = <ResumeForm create />;
    if (activeTab === "work") {
      form = <WorkForm create />;
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

export default connect(mapStateToProps)(AdminItemCreation);
