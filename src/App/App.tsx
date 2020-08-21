import React from "react";
import { Provider } from "react-redux";

import configureStore from "../store/store";
import RootContainer from "./RootContainer";

interface Props {}

const App: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { store } = configureStore();

  return (
    <div className="App">
      <Provider store={store}>
        <RootContainer />
        <footer className="app_footer">
          © 2020 Ryan Brandt. All rights reserved.
        </footer>
      </Provider>
    </div>
  );
};

export default App;
