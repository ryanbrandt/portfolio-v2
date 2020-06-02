import React from "react";

import { Divider } from "handsome-ui/lib";

interface Props {}

const Home: React.FunctionComponent<Props> = (): JSX.Element => {
  return (
    <div className="home_container">
      <h1>Foo bar</h1>
      <Divider />
    </div>
  );
};

export default Home;
