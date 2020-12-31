import React from "react";

import { GraduationCap, Suitcase } from "handsome-ui";

interface Props {
  title: string;
  datestring: string;
  type: "expereince" | "education";
  description: string;
  achievments: string | null;
}

const ResumeItem: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const _renderAchievements = (): React.ReactNode => {
    const { achievments } = props;

    if (achievments) {
      return (
        <div className="resume_list-achivements-container">
          <div className="resume_list-item_datestring">Achievements</div>
          {achievments}
        </div>
      );
    }

    return null;
  };

  const { title, datestring, description, type } = props;

  const iconProps = {
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
