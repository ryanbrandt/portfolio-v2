import { ResumeItem, WorkItem } from "../utils/types";
import { ResumeItemForm, WorkItemForm } from "./types";

export const getWorkFormInitialState = (
  activeItem?: WorkItem
): WorkItemForm => {
  const initialFormState: WorkItemForm = {
    name: "",
    datestring: "",
    description: "",
    tags: [""],
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

  return initialFormState;
};

export const getResumeFormInitialState = (
  activeItem?: ResumeItem
): ResumeItemForm => {
  const initialFormState: ResumeItemForm = {
    name: "",
    datestring: "",
    description: "",
    achievements: "",
    tags: [""],
  };

  if (activeItem) {
    initialFormState.id = activeItem.id;
    initialFormState.name = activeItem.name;
    initialFormState.datestring = activeItem.datestring;
    initialFormState.description = activeItem.description;
    initialFormState.achievements = activeItem.achievements || "";
    initialFormState.tags = activeItem.tags;
  }

  return initialFormState;
};
