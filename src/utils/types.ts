export interface ResumeItem {
  id: number;
  name: string;
  datestring: string;
  description: string;
  achievements: string | null;
  tags: Array<string>;
  created: string;
  modified: string;
}

export interface WorkItem {
  id: number;
  name: string;
  datestring: string;
  description: string;
  tags: Array<string>;
  source: string | null;
  deploy: string | null;
  icons: Array<string> | null;
  image: string | null;
  created: string;
  modified: string;
}
