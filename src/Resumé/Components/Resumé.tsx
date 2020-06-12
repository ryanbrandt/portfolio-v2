import React from "react";

import { Divider, Row, Column } from "handsome-ui";

interface Props {}

const Resumé: React.FunctionComponent<Props> = (): JSX.Element => {
  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Resumé</h1>
        <Divider />
        <div style={{ width: "80vw" }}>
          <Row>
            <Column className="resume_column">
              <h3 className="resume_header">Development Experience</h3>
              <Divider />
            </Column>
            <Column className="resume_column">
              <h3 className="resume_header">Education</h3>
              <Divider />
            </Column>
            <Column className="resume_column">
              <h3 className="resume_header">Tools & Technology</h3>
              <Divider />
            </Column>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Resumé;
