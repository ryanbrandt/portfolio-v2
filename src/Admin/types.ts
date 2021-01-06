export type AdminTab = "resume" | "work" | "blog";

export interface ResumeItemForm {
  id?: number;
  name: string;
  datestring: string;
  description: string;
  achievements: string;
  tags: Array<string>;
}

export interface ResumeItemPayload extends Omit<ResumeItemForm, "tags"> {
  tags: string;
}

export interface WorkItemForm {
  id?: number;
  name: string;
  datestring: string;
  description: string;
  tags: Array<string>;
  source: string;
  deploy: string;
  image?: File;
}

export interface WorkItemPayload extends Omit<WorkItemForm, "tags"> {
  tags: string;
}
