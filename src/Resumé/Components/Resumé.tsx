import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Divider, Row, Column, Badge } from "handsome-ui";

import { resumeListRequest } from "../actions";
import { getEducationList, getExperienceList } from "../selectors";

import ResumeItem from "../Subcomponents/ResumeItem";
import { RootState } from "../../store/rootReducer";

interface Props {}

interface StateProps {
  education: Array<any>;
  experience: Array<any>;
}

interface DispatchProps {
  fetchResumeList: () => void;
}

const Resumé: React.FunctionComponent<Props & StateProps & DispatchProps> = (
  props: Props & StateProps & DispatchProps
): JSX.Element => {
  useEffect(() => {
    const { fetchResumeList } = props;

    fetchResumeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _renderExperience = () => {
    const { experience } = props;

    return experience.map((experienceItem) => (
      <ResumeItem
        key={experienceItem.name}
        title={experienceItem.name}
        datestring={experienceItem.datestring}
        type="expereince"
        description={experienceItem.description}
        achievments={experienceItem.achievements}
      />
    ));
  };

  const _renderEducation = () => {
    const { education } = props;

    return education.map((educationItem) => (
      <ResumeItem
        key={educationItem.name}
        title={educationItem.name}
        datestring={educationItem.datestring}
        type="education"
        description={educationItem.description}
        achievments={educationItem.achievements}
      />
    ));
  };

  const _renderToolsAndTechnologies = () => {
    const tools = [
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
        {tools.map((item) => (
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

const mapStateToProps = (state: RootState) => {
  return {
    education: getEducationList(state),
    experience: getExperienceList(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchResumeList: () => dispatch(resumeListRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resumé);
