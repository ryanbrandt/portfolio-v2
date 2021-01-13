import {
  INVALID_FILE_TYPE_ERROR,
  REQUIRED_ERROR,
  VALID_IMAGE_TYPES,
} from "./constants";
import {
  WorkItemForm,
  ResumeItemForm,
  WorkItemFormErrors,
  ResumeItemFormErrors,
} from "./types";

export const validateWorkForm = (form: WorkItemForm): WorkItemFormErrors => {
  const { name, datestring, description, primaryImage, secondaryImage } = form;
  const errors: WorkItemFormErrors = {};

  if (!name || name.trim().length < 1) {
    errors.name = REQUIRED_ERROR;
  }

  if (!datestring || datestring.trim().length < 1) {
    errors.datestring = REQUIRED_ERROR;
  }

  if (!description || description.trim().length < 1) {
    errors.description = REQUIRED_ERROR;
  }

  if (primaryImage && !VALID_IMAGE_TYPES.includes(primaryImage.type)) {
    errors.primaryImage = INVALID_FILE_TYPE_ERROR;
  }

  if (secondaryImage && !VALID_IMAGE_TYPES.includes(secondaryImage.type)) {
    errors.secondaryImage = INVALID_FILE_TYPE_ERROR;
  }

  return errors;
};

export const validateResumeForm = (
  form: ResumeItemForm
): ResumeItemFormErrors => {
  const { name, datestring, description } = form;

  const errors: ResumeItemFormErrors = {};

  if (!name || name.trim().length < 1) {
    errors.name = REQUIRED_ERROR;
  }

  if (!datestring || datestring.trim().length < 1) {
    errors.datestring = REQUIRED_ERROR;
  }

  if (!description || description.trim().length < 1) {
    errors.description = REQUIRED_ERROR;
  }

  return errors;
};
