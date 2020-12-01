import React from "react";

import { Divider, TabMenu } from "handsome-ui";

import EmptyResults from "../../Common/Components/EmptyResults";

interface Props {}

const AdminDashboard: React.FunctionComponent<Props> = (props: Props) => {
  const tabs = [
    { title: "Resumé", key: "resume" },
    { title: "Work", key: "work" },
    { title: "Blog", key: "blog" },
  ];

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Admin Dashboard</h1>
        <Divider />
        <div className="app_wide_container">
          <TabMenu tabs={tabs} onTab={() => null} onSearch={() => null} />
          <EmptyResults />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
