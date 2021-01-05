import { ResumeItem } from "../utils/types";

export const RESUME_TOOLS = [
  "TypeScript/JavaScript",
  "C#",
  "Python",
  "Java",
  "SQL",
  "NoSQL",
  "Node.js",
  "React",
  "React-Native",
  "Redux",
  "Electron",
  "Express",
  "Serverless",
  ".NET",
  "WPF",
  "ReactiveUI",
  "Flask",
  "Django",
  "Cypress",
  "Jest",
  "Enzyme",
  "Xunit",
  "AWS",
  "Heroku",
  "WiX Toolset",
  "CircleCI",
];

export const RESUME_DOWNLOAD_LINK =
  "http://ryanbrandt-resume.s3.amazonaws.com/Resume2020.pdf";

export const PLACEHOLDER_RESUME_ITEM: ResumeItem = {
  id: -1,
  name: "N/A",
  datestring: "N/A",
  description: "N/A",
  achievements: "N/A",
  tags: [],
  created: "N/A",
  modified: "N/A",
};
