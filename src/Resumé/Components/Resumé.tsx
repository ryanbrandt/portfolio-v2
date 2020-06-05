import React from "react";

import { Divider, Button } from "handsome-ui";

interface Props {}

const Resumé: React.FunctionComponent<Props> = (): JSX.Element => {
  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Resumé</h1>
        <Divider />
      </div>
    </div>
  );
};

export default Resumé;
