import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Button, Column, Divider, TabMenu } from "handsome-ui";

import { history } from "../../routes";
import { adminInitRequest, adminSetActiveTab, adminSetQuery } from "../actions";
import { AdminTab } from "../types";
import { RootState } from "../../store/rootReducer";
import { getAdminActiveTab } from "../selectors";

import AdminTable from "../Subcomponents/AdminTable";

interface Props {}

interface StateProps {
  activeTab: AdminTab;
}

interface DispatchProps {
  initAdminPortal: () => void;
  setTab: (tab: AdminTab) => void;
  setQuery: (query: string) => void;
}

const AdminDashboard = (props: Props & StateProps & DispatchProps) => {
  const tabs = [
    { title: "Resumé", key: "resume" },
    { title: "Work", key: "work" },
    { title: "Blog", key: "blog" },
  ];

  const { initAdminPortal } = props;
  useEffect(() => {
    initAdminPortal();
  }, [initAdminPortal]);

  const { setTab, setQuery, activeTab } = props;
  const activeTabDisplay = tabs.find((tab) => tab.key === activeTab)?.title;

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <Column className="flex_center_col admin_create-margin">
          <h1>Admin Portal</h1>
          <Button
            title={`Create ${activeTabDisplay} Item`}
            inverting
            onClick={() => history.push("/admin/create")}
            disabled={activeTab === "blog"}
          />
        </Column>
        <Divider />
        <div className="app_wide_container">
          <TabMenu
            tabs={tabs.map((tab) => ({
              ...tab,
              active: activeTab === tab.key,
            }))}
            onTab={(key) => setTab(key as AdminTab)}
            onSearch={(query) => setQuery(query)}
          />
          <AdminTable />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    activeTab: getAdminActiveTab(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    initAdminPortal: () => dispatch(adminInitRequest()),
    setTab: (tab: AdminTab) => dispatch(adminSetActiveTab(tab)),
    setQuery: (query: string) => dispatch(adminSetQuery(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
