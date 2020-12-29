import React, { Fragment, useState } from "react";

import { Input, Text } from "handsome-ui";

import { ResumeItemForm } from "../types";

import TagSection from "./TagSection";

interface Props {
  activeItem?: any; // TODO
  onUpdate: (item: ResumeItemForm) => void;
}

const ResumeForm = (props: Props): JSX.Element => {
  const { activeItem } = props;

  const initialFormState: ResumeItemForm = {
    name: "",
    datestring: "",
    description: "",
    tags: [],
  };

  if (activeItem) {
    initialFormState.id = activeItem.id;
    initialFormState.name = activeItem.name;
    initialFormState.datestring = activeItem.datestring;
    initialFormState.description = activeItem.description;
    initialFormState.tags = activeItem.tags;
  }

  const [form, setForm] = useState<ResumeItemForm>(initialFormState);

  const onFormChange = (newForm: ResumeItemForm) => {
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
    const availableTags = ["education", "experience"]; // TODO put in backend

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
          {activeItem ? "Update Resumé Item" : "Create Resumé Item"}
        </h1>
        {_renderInputs()}
        {_renderTagSection()}
      </div>
    </div>
  );
};

export default ResumeForm;
