import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Input, Text, Button, Badge } from "handsome-ui";
import { RootState } from "../../store/rootReducer";
import { getAdminResumeActiveItem } from "../selectors";
import {
  adminCreateResumeItemRequest,
  adminUpdateResumeItemRequest,
} from "../actions";
import TagSection from "./TagSection";

interface Props {
  create?: boolean;
}

interface StateProps {
  activeItem: any; // TODO
}

interface DispatchProps {
  createItem: (item: any, resolve: any, reject: any) => void; // TODO
  updateItem: (item: any, resolve: any, reject: any) => void; // TODO
}

interface ResumeFormState {
  name: string;
  datestring: string;
  description: string;
  tags: Array<string>;
}

const ResumeForm = (props: Props & StateProps & DispatchProps) => {
  const { create, activeItem } = props;

  const initialFormState: ResumeFormState = {
    name: "",
    datestring: "",
    description: "",
    tags: [],
  };

  if (activeItem && !create) {
    initialFormState.name = activeItem.name;
    initialFormState.datestring = activeItem.datestring;
    initialFormState.description = activeItem.description;
    initialFormState.tags = activeItem.tags;
  }

  const [form, setForm] = useState<ResumeFormState>(initialFormState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onCreateClick = async (): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);

    await new Promise<string>((resolve, reject) => {
      const { createItem } = props;

      createItem(form, resolve, reject);
    })
      .then((successString) => setSuccessMessage(successString))
      .catch((errorString) => setErrorMessage(errorString));
  };

  const onUpdateClick = async (): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);

    await new Promise<string>((resolve, reject) => {
      const { updateItem, activeItem } = props;

      updateItem(
        { ...activeItem, ...form, tags: JSON.stringify(activeItem.tags) },
        resolve,
        reject
      );
    })
      .then((successString) => setSuccessMessage(successString))
      .catch((errorString) => setErrorMessage(errorString));
  };

  const _renderInputs = (): React.ReactNode => {
    return (
      <Fragment>
        <Input
          label="Name"
          value={form.name}
          onChange={(value: string) => setForm({ ...form, name: value })}
        />
        <Input
          label="Date String"
          value={form.datestring}
          onChange={(value: string) => setForm({ ...form, datestring: value })}
        />
        <Text
          label="Description"
          value={form.description}
          onChange={(value: string) => setForm({ ...form, description: value })}
        />
      </Fragment>
    );
  };

  const _renderMessage = (): React.ReactNode => {
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

  const _renderTagSection = (): React.ReactNode => {
    const availableTags = ["education", "experience"]; // TODO put in backend

    return (
      <TagSection
        tags={form.tags}
        availableTags={availableTags}
        onUpdateTags={(newTags: Array<string>) =>
          setForm({ ...form, tags: newTags })
        }
      />
    );
  };

  const _renderSubmit = (): React.ReactNode => {
    let action = onUpdateClick;
    let title = "Update Item";
    if (create) {
      title = "Create Item";
      action = onCreateClick;
    }

    return (
      <div className="flex_center_col admin_button_container">
        <Button title={title} onClick={action} inverting />
      </div>
    );
  };

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">
          {create ? "Create Resumé Item" : "Manage Resumé Item"}
        </h1>
        {_renderInputs()}
        {_renderTagSection()}
        {_renderSubmit()}
        {_renderMessage()}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    activeItem: getAdminResumeActiveItem(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    createItem: (item: any, resolve: any, reject: any) =>
      dispatch(adminCreateResumeItemRequest(item, resolve, reject)),
    updateItem: (item: any, resolve: any, reject: any) =>
      dispatch(adminUpdateResumeItemRequest(item, resolve, reject)),
  };
};

export default connect<StateProps, DispatchProps, Props, any>(
  mapStateToProps,
  mapDispatchToProps
)(ResumeForm);
