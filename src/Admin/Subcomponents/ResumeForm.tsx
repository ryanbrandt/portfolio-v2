import React, { Fragment, useState } from "react";

import { Button, Input, Text } from "handsome-ui";

import { RESUME_TAGS } from "../constants";
import { ResumeItem } from "../../utils/types";
import { ResumeItemForm } from "../types";

import TagSection from "./TagSection";

interface Props {
  activeItem?: ResumeItem;
  onSubmit: (item: ResumeItemForm) => void;
}

const ResumeForm = (props: Props): JSX.Element => {
  const { activeItem } = props;

  const initialFormState: ResumeItemForm = {
    name: "",
    datestring: "",
    description: "",
    achievments: "",
    tags: [],
  };

  if (activeItem) {
    initialFormState.id = activeItem.id;
    initialFormState.name = activeItem.name;
    initialFormState.datestring = activeItem.datestring;
    initialFormState.description = activeItem.description;
    initialFormState.achievments = activeItem.achievments || "";
    initialFormState.tags = activeItem.tags;
  }

  const [form, setForm] = useState<ResumeItemForm>(initialFormState);

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

  const _renderTagSection = (): React.ReactNode => {
    return (
      <TagSection
        tags={form.tags}
        limit={1}
        availableTags={RESUME_TAGS}
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
          {activeItem ? "Update Resumé Item" : "Create Resumé Item"}
        </h1>
        {_renderInputs()}
        {_renderTagSection()}
        {_renderSubmit()}
      </div>
    </div>
  );
};

export default ResumeForm;
