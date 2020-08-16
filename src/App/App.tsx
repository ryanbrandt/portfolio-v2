import React from "react";

import RootContainer from "./RootContainer";

interface Props {}

const App: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  return (
    <div className="App">
      <RootContainer />
      <footer className="app_footer">
        © 2020 Ryan Brandt. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
