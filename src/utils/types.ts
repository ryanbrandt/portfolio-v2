export interface TimeStampedItem {
  [key: string]: any;
  created: string;
  modified: string;
}

export type WithTimestamp<T> = T & TimeStampedItem;

export interface ResumeItem extends TimeStampedItem {
  id: number;
  name: string;
  datestring: string;
  description: string;
  achievements: string | null;
  tags: Array<string>;
}

export interface WorkItem extends TimeStampedItem {
  id: number;
  name: string;
  datestring: string;
  description: string;
  tags: Array<string>;
  source: string | null;
  deploy: string | null;
  icons: Array<string> | null;
  primaryImage: string | null;
  secondaryImage: string | null;
}
