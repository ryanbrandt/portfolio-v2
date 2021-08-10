import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  Divider,
  Row,
  Column,
  Badge,
  Download,
  useIsMobile,
} from "handsome-ui";

import { resumeListRequest } from "../actions";
import { RESUME_DOWNLOAD_LINK, RESUME_TOOLS } from "../constants";
import { getEducationList, getExperienceList } from "../selectors";
import { RootState } from "../../store/rootReducer";
import { safeOpenWindow } from "../../utils/helpers";
import { ResumeItem as IResumeItem } from "../../utils/types";

import ResumeItem from "../Subcomponents/ResumeItem";
import EmptyResults from "../../Common/Components/EmptyResults";

interface Props {}

interface StateProps {
  education: Array<IResumeItem>;
  experience: Array<IResumeItem>;
}

interface DispatchProps {
  fetchResumeList: () => void;
}

const Resumé: React.FunctionComponent<Props & StateProps & DispatchProps> = (
  props: Props & StateProps & DispatchProps
): JSX.Element => {
  const isMobile = useIsMobile();

  useEffect(() => {
    const { fetchResumeList } = props;

    fetchResumeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleDownloadClick = (): void => {
    safeOpenWindow(RESUME_DOWNLOAD_LINK);
  };

  const _renderExperience = (): React.ReactNode => {
    const { experience } = props;

    if (experience.length > 0) {
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
    }

    return <EmptyResults />;
  };

  const _renderEducation = (): React.ReactNode => {
    const { education } = props;

    if (education.length > 0) {
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
    }

    return <EmptyResults />;
  };

  const _renderToolsAndTechnologies = (): React.ReactNode => {
    return (
      <div className="resume_tools-container">
        {RESUME_TOOLS.map((item) => (
          <Badge key={item} className="resume_tools-badge" content={item} />
        ))}
      </div>
    );
  };

  const _renderResumeSection = (): React.ReactNode => {
    return (
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
    );
  };

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">
          <Download
            className={isMobile ? "download_icon-mobile" : "download_icon"}
            onClick={_handleDownloadClick}
          />
          Resumé
        </h1>
        <Divider />
        <div className="app_wide_container">{_renderResumeSection()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    education: getEducationList(state),
    experience: getExperienceList(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchResumeList: () => dispatch(resumeListRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resumé);
