import React, { Fragment, useState } from "react";

import { Button, Input, Text } from "handsome-ui";

import { WorkItemForm } from "../types";
import { WorkItem } from "../../utils/types";
import { WORK_TAGS } from "../constants";

import FileInput from "./FileInput";
import TagSection from "./TagSection";

interface Props {
  activeItem?: WorkItem;
  onSubmit: (item: WorkItemForm) => void;
}

const WorkForm = (props: Props): JSX.Element => {
  const { activeItem } = props;

  const initialFormState: WorkItemForm = {
    name: "",
    datestring: "",
    description: "",
    tags: [],
    source: "",
    deploy: "",
  };

  if (activeItem) {
    initialFormState.id = activeItem.id;
    initialFormState.name = activeItem.name;
    initialFormState.datestring = activeItem.datestring;
    initialFormState.description = activeItem.description;
    initialFormState.tags = activeItem.tags;
    initialFormState.source = activeItem.source || "";
    initialFormState.deploy = activeItem.deploy || "";
  }

  const [form, setForm] = useState<WorkItemForm>(initialFormState);

  const _renderInputs = (): React.ReactNode => {
    return (
      <Fragment>
        <Input
          label="Name*"
          value={form.name}
          onChange={(value: string) => setForm({ ...form, name: value })}
        />
        <Input
          label="Date String*"
          value={form.datestring}
          onChange={(value: string) => setForm({ ...form, datestring: value })}
        />
        <Input
          label="Source URL"
          value={form.source}
          onChange={(value: string) => setForm({ ...form, source: value })}
        />
        <Input
          label="Deploy URL"
          value={form.deploy}
          onChange={(value: string) => setForm({ ...form, deploy: value })}
        />
        <Text
          label="Description*"
          value={form.description}
          onChange={(value: string) => setForm({ ...form, description: value })}
        />
        <FileInput
          onChange={(files) => setForm({ ...form, image: files[0] })}
        />
      </Fragment>
    );
  };

  const _renderTagSection = (): React.ReactNode => {
    return (
      <TagSection
        tags={form.tags}
        availableTags={WORK_TAGS}
        onUpdateTags={(newTags: Array<string>) =>
          setForm({ ...form, tags: newTags })
        }
      />
    );
  };

  const _renderSubmit = (): React.ReactNode => {
    const { onSubmit } = props;

    return (
      <div className="flex_center_col admin_button_container">
        <Button title="Submit" onClick={() => onSubmit(form)} inverting />
      </div>
    );
  };

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">
          {activeItem ? "Update Work Item" : "Create Work Item"}
        </h1>
        {_renderInputs()}
        {_renderTagSection()}
        {_renderSubmit()}
      </div>
    </div>
  );
};

export default WorkForm;
