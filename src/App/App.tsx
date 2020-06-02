import React from "react";

import RootContainer from "./RootContainer";

interface Props {}

const App: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  return (
    <div className="App">
      <RootContainer />
    </div>
  );
};

export default App;
