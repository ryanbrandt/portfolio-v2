export type AdminTab = "resume" | "work" | "blog";

export interface ResumeItemForm {
  id?: number;
  name: string;
  datestring: string;
  description: string;
  tags: Array<string>;
}

export interface WorkItemForm {
  id?: number;
  name: string;
  datestring: string;
  description: string;
  tags: Array<string>;
  source: string;
}
