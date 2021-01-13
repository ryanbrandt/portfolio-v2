import React, { Fragment, useState } from "react";

import { Button, Input, Text } from "handsome-ui";

import { RESUME_TAGS } from "../constants";
import { ResumeItem } from "../../utils/types";
import { ResumeItemForm, ResumeItemFormErrors } from "../types";

import TagSection from "./TagSection";
import { validateResumeForm } from "../validators";
import { objectIsEmpty } from "../../utils/helpers";

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
    achievements: "",
    tags: [],
  };

  if (activeItem) {
    initialFormState.id = activeItem.id;
    initialFormState.name = activeItem.name;
    initialFormState.datestring = activeItem.datestring;
    initialFormState.description = activeItem.description;
    initialFormState.achievements = activeItem.achievements || "";
    initialFormState.tags = activeItem.tags;
  }

  const [form, setForm] = useState<ResumeItemForm>(initialFormState);
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
        limit={1}
        availableTags={RESUME_TAGS}
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
