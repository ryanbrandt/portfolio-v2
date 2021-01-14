import React, { Fragment, useState } from "react";

import { Button, Input, Text } from "handsome-ui";

import { RESUME_TAGS } from "../constants";
import { ResumeItem } from "../../utils/types";
import { ResumeItemForm, ResumeItemFormErrors } from "../types";
import { getResumeFormInitialState } from "../initializers";
import { validateResumeForm } from "../validators";
import { objectIsEmpty } from "../../utils/helpers";

import TagSection from "./TagSection";

interface Props {
  onSubmit: (item: ResumeItemForm) => void;
  activeItem?: ResumeItem;
  processing?: boolean;
}

const ResumeForm = (props: Props): JSX.Element => {
  const { activeItem } = props;

  const [form, setForm] = useState<ResumeItemForm>(
    getResumeFormInitialState(activeItem)
  );
  const [errors, setErrors] = useState<ResumeItemFormErrors>({});

  const handleSubmit = (): void => {
    const { onSubmit } = props;

    const newErrors = validateResumeForm(form);
    setErrors(newErrors);

    if (objectIsEmpty(newErrors)) {
      onSubmit(form);
    }
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
        <Text
          label="Description*"
          value={form.description}
          error={errors.description}
          onChange={(value: string) => setForm({ ...form, description: value })}
        />
        <Text
          label="Achievments"
          value={form.achievements}
          error={errors.achievements}
          onChange={(value: string) =>
            setForm({ ...form, achievements: value })
          }
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
        limit={1}
        availableTags={RESUME_TAGS}
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
