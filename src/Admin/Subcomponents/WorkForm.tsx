import React, { Fragment, useState } from "react";

import { Button, Input, Text, FileInput, Row } from "handsome-ui";

import { WorkItemForm, WorkItemFormErrors } from "../types";
import { WorkItem } from "../../utils/types";
import { WORK_TAGS } from "../constants";

import TagSection from "./TagSection";
import { validateWorkForm } from "../validators";
import { objectIsEmpty } from "../../utils/helpers";

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
    initialFormState.originalPrimaryImage =
      activeItem.primaryImage || undefined;
    initialFormState.originalSecondaryImage =
      activeItem.secondaryImage || undefined;
  }

  const [form, setForm] = useState<WorkItemForm>(initialFormState);
  const [errors, setErrors] = useState<WorkItemFormErrors>({});

  const handleSubmit = (): void => {
    const { onSubmit } = props;

    const newErrors = validateWorkForm(form);
    setErrors(newErrors);

    if (objectIsEmpty(newErrors)) {
      onSubmit(form);
    }
  };

  const _renderFileInputs = (): React.ReactNode => {
    return (
      <Row>
        <FileInput
          error={errors.primaryImage}
          label="Primary Image"
          onChange={(files) => setForm({ ...form, primaryImage: files[0] })}
        />
        <FileInput
          error={errors.secondaryImage}
          label="Secondary Image"
          onChange={(files) => setForm({ ...form, secondaryImage: files[0] })}
        />
      </Row>
    );
  };

  const _renderInputs = (): React.ReactNode => {
    return (
      <Fragment>
        <Input
          label="Name*"
          value={form.name}
          error={errors.name}
          onChange={(value: string) => setForm({ ...form, name: value })}
        />
        <Input
          label="Date String*"
          value={form.datestring}
          error={errors.datestring}
          onChange={(value: string) => setForm({ ...form, datestring: value })}
        />
        <Input
          label="Source URL"
          value={form.source}
          error={errors.source}
          onChange={(value: string) => setForm({ ...form, source: value })}
        />
        <Input
          label="Deploy URL"
          value={form.deploy}
          error={errors.deploy}
          onChange={(value: string) => setForm({ ...form, deploy: value })}
        />
        <Text
          label="Description*"
          value={form.description}
          error={errors.description}
          onChange={(value: string) => setForm({ ...form, description: value })}
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
    return (
      <div className="flex_center_col admin_button_container">
        <Button title="Submit" onClick={handleSubmit} inverting />
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
        {_renderFileInputs()}
        {_renderTagSection()}
        {_renderSubmit()}
      </div>
    </div>
  );
};

export default WorkForm;
