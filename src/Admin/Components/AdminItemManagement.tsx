import React, { Fragment } from "react";

import { Breadcrumbs } from "handsome-ui";

import { history } from "../../routes";

import ResumeForm from "../Subcomponents/ResumeForm";

interface Props {}

const AdminItemManagement = (props: Props) => {
  const _renderHeader = () => {
    const crumbs = [
      {
        title: "Admin Dashboard",
        action: () => history.push("/admin"),
      },
      { title: "Manage", action: () => null, disabled: true },
    ];

    return (
      <Fragment>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="aligned_text">Item Management</h1>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {_renderHeader()}
      <div className="fadeable-content flex_center_col">
        <div>
          <ResumeForm />
        </div>
      </div>
    </Fragment>
  );
};

export default AdminItemManagement;
