import React from "react";

import { Divider } from "handsome-ui/lib";

interface Props {}

const Home: React.FunctionComponent<Props> = (): JSX.Element => {
  return (
    <div className="flex_center_col">
      <div>
        <h1 className="aligned_text">Hello, World!</h1>
        <Divider />
        <p className="aligned_text">
          My name is Ryan Brandt. I'm a Software Engineer based out of
          Philadelphia.
        </p>
      </div>
    </div>
  );
};

export default Home;
