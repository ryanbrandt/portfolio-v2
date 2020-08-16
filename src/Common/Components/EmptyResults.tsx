import React from "react";

import { EmptyBox } from "handsome-ui";

import { GRAY_THEME } from "../../utils/constants";

interface Props {}

const EmptyResults: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  return (
    <div className="empty_results-container">
      <EmptyBox height={75} width={75} fill={GRAY_THEME} opacity={0.5} />
      <div className="empty_results-text">
        There doesnt seem to be anything here.
      </div>
    </div>
  );
};

export default EmptyResults;
