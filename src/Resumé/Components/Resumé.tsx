import React from "react";

import { Divider, Row, Column, Badge } from "handsome-ui";

import ResumeItem from "../Subcomponents/ResumeItem";

interface Props {}

const Resumé: React.FunctionComponent<Props> = (): JSX.Element => {
  const _renderExperience = () => {
    return (
      <ResumeItem
        title="Fake Experience"
        datestring="August 2020"
        type="expereince"
        description="yayyayayayayayayayayayayayayay ayayayayayaya ayayay ayayay ayayayayayay ay ayayaya ayay ayayayay ayayayay"
        achievments="killed it"
      />
    );
  };

  const _renderEducation = () => {
    return (
      <ResumeItem
        title="Fake Education"
        datestring="August 2020"
        type="education"
        description="yayyayayayayayayayayayayayayay ayayayayayaya ayayay ayayay ayayayayayay ay ayayaya ayay ayayayay ayayayay"
      />
    );
  };

  const _renderToolsAndTechnologies = () => {
    const fakeList = [
      "TypeScript/JavaScript",
      "Node",
      "C#",
      "Python",
      "Java",
      "SQL",
      "NoSQL",
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
    ];

    return (
      <div className="resume_tools-container">
        {fakeList.map((item) => (
          <Badge key={item} className="resume_tools-badge" content={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Resumé</h1>
        <Divider />
        <div className="app_wide_container">
          <Row>
            <Column className="resume_column">
              <h3 className="resume_header">Development Experience</h3>
              <Divider />
              {_renderExperience()}
            </Column>
            <Column className="resume_column">
              <h3 className="resume_header">Education</h3>
              <Divider />
              {_renderEducation()}
            </Column>
            <Column className="resume_column">
              <h3 className="resume_header">Tools & Technology</h3>
              <Divider />
              {_renderToolsAndTechnologies()}
            </Column>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Resumé;
