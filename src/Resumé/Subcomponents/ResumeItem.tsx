import React from "react";

import { GraduationCap, Suitcase } from "handsome-ui";

interface Props {
  title: string;
  datestring: string;
  type: "expereince" | "education";
  description: string;
  achievments?: string;
}

const ResumeItem: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const _renderAchievements = () => {
    const { achievments } = props;

    if (achievments) {
      return (
        <div className="resume_list-achivements-container">
          <div className="resume_list-item_datestring">Achievements</div>
          {achievments}
        </div>
      );
    }
  };

  const { title, datestring, description, type } = props;

  let iconProps = {
    width: 20,
    height: 20,
  };

  let Icon = <GraduationCap {...iconProps} />;
  if (type === "expereince") {
    Icon = <Suitcase {...iconProps} />;
  }

  return (
    <div className="resume_list-item_container">
      <div className="resume_list-item_header">
        {Icon}
        <div className="resume_list-item_title">{title}</div>
      </div>
      <div className="resume_list-item_datestring">{datestring}</div>
      <p>{description}</p>
      {_renderAchievements()}
    </div>
  );
};

export default ResumeItem;
