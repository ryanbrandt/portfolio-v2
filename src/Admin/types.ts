export type AdminTab = "resume" | "work" | "blog";

export interface ResumeItemForm {
  id?: number;
  name: string;
  datestring: string;
  description: string;
  achievements: string;
  tags: Array<string>;
}

export interface ResumeItemFormErrors {
  [key: string]: any;
  name?: string;
  datestring?: string;
  description?: string;
  achievements?: string;
  tags?: string;
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
  originalPrimaryImage?: string;
  originalSecondaryImage?: string;
  primaryImage?: File;
  secondaryImage?: File;
}

export interface WorkItemFormErrors {
  [key: string]: any;
  name?: string;
  datestring?: string;
  description?: string;
  tags?: string;
  source?: string;
  deploy?: string;
  primaryImage?: string;
  secondaryImage?: string;
}

export interface WorkItemPayload extends Omit<WorkItemForm, "tags"> {
  tags: string;
}

export interface UploadPayload {
  bucket: string;
  filename: string;
  fileType: string;
}
