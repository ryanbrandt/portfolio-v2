import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Divider, TabMenu } from "handsome-ui";

import { adminInitRequest, adminSetActiveTab, adminSetQuery } from "../actions";
import { AdminTab } from "../types";

import AdminTable from "../Subcomponents/AdminTable";

interface Props {}

interface DispatchProps {
  initAdminPortal: () => void;
  setTab: (tab: AdminTab) => void;
  setQuery: (query: string) => void;
}

const AdminDashboard = (props: Props & DispatchProps) => {
  const tabs = [
    { title: "Resumé", key: "resume" },
    { title: "Work", key: "work" },
    { title: "Blog", key: "blog" },
  ];

  const { initAdminPortal } = props;
  useEffect(() => {
    initAdminPortal();
  }, [initAdminPortal]);

  const { setTab, setQuery } = props;

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Admin Portal</h1>
        <Divider />
        <div className="app_wide_container">
          <TabMenu
            tabs={tabs}
            onTab={(key) => setTab(key as AdminTab)}
            onSearch={(query) => setQuery(query)}
          />
          <AdminTable />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    initAdminPortal: () => dispatch(adminInitRequest()),
    setTab: (tab: AdminTab) => dispatch(adminSetActiveTab(tab)),
    setQuery: (query: string) => dispatch(adminSetQuery(query)),
  };
};

export default connect(null, mapDispatchToProps)(AdminDashboard);
