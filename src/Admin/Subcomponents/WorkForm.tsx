import React, { Fragment, useState } from "react";

import { Input, Text } from "handsome-ui";

import { WorkItemForm } from "../types";

import TagSection from "./TagSection";

interface Props {
  activeItem?: any;
  onUpdate: (item: WorkItemForm) => void;
}

const WorkForm = (props: Props): JSX.Element => {
  const { activeItem } = props;

  const initialFormState: WorkItemForm = {
    name: "",
    datestring: "",
    description: "",
    tags: [],
    source: "",
  };

  if (activeItem) {
    initialFormState.id = activeItem.id;
    initialFormState.name = activeItem.name;
    initialFormState.datestring = activeItem.datestring;
    initialFormState.description = activeItem.description;
    initialFormState.tags = activeItem.tags;
    initialFormState.source = activeItem.source;
  }

  const [form, setForm] = useState<WorkItemForm>(initialFormState);

  const onFormChange = (newForm: WorkItemForm) => {
    const { onUpdate } = props;

    setForm(newForm);
    onUpdate(newForm);
  };

  const _renderInputs = (): React.ReactNode => {
    return (
      <Fragment>
        <Input
          label="Name"
          value={form.name}
          onChange={(value: string) => onFormChange({ ...form, name: value })}
        />
        <Input
          label="Date String"
          value={form.datestring}
          onChange={(value: string) =>
            onFormChange({ ...form, datestring: value })
          }
        />
        <Input
          label="Source"
          value={form.source}
          onChange={(value: string) => onFormChange({ ...form, source: value })}
        />
        <Text
          label="Description"
          value={form.description}
          onChange={(value: string) =>
            onFormChange({ ...form, description: value })
          }
        />
      </Fragment>
    );
  };

  const _renderTagSection = (): React.ReactNode => {
    const availableTags = ["web", "tools", "other"]; // TODO put in backend

    return (
      <TagSection
        tags={form.tags}
        availableTags={availableTags}
        onUpdateTags={(newTags: Array<string>) =>
          onFormChange({ ...form, tags: newTags })
        }
      />
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
      </div>
    </div>
  );
};

export default WorkForm;
