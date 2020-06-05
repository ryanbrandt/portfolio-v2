import React from "react";

import { Divider } from "handsome-ui";

interface Props {}

const Contact: React.FunctionComponent<Props> = (): JSX.Element => {
  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Contact</h1>
        <Divider />
      </div>
    </div>
  );
};

export default Contact;
