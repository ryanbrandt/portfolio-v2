import React, { Fragment, useState } from "react";

import { Button, Input, FileInput, Row } from "handsome-ui";

import { WorkItemForm, WorkItemFormErrors } from "../types";
import { WorkItem } from "../../utils/types";
import { WORK_TAGS } from "../constants";
import { validateWorkForm } from "../validators";
import { getWorkFormInitialState } from "../initializers";
import { objectIsEmpty } from "../../utils/helpers";

import TagSection from "./TagSection";
import AdminMarkupTextField from "./AdminMarkupTextField";

interface Props {
  onSubmit: (item: WorkItemForm) => void;
  activeItem?: WorkItem;
  processing?: boolean;
}

const WorkForm = (props: Props): JSX.Element => {
  const { activeItem } = props;

  const [form, setForm] = useState<WorkItemForm>(
    getWorkFormInitialState(activeItem)
  );
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
    const { primaryImage, secondaryImage } = form;

    const primaryImageSelection = primaryImage ? [primaryImage] : [];
    const secondaryImageSelection = secondaryImage ? [secondaryImage] : [];

    return (
      <Row version="space-between">
        <FileInput
          selection={primaryImageSelection}
          error={errors.primaryImage}
          label="Primary Image"
          onChange={(files) => setForm({ ...form, primaryImage: files[0] })}
        />
        <FileInput
          selection={secondaryImageSelection}
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
        <AdminMarkupTextField
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
        error={errors.tags}
        minimum={1}
        availableTags={WORK_TAGS}
        onUpdateTags={(newTags: Array<string>) =>
          setForm({ ...form, tags: newTags })
        }
      />
    );
  };

  const _renderSubmit = (): React.ReactNode => {
    const { processing } = props;

    return (
      <div className="flex_center_col admin_button_container">
        <Button
          title="Submit"
          onClick={handleSubmit}
          disabled={processing}
          inverting
        />
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
