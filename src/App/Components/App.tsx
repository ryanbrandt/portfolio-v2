import React from "react";
import { Provider } from "react-redux";

import configureStore from "../../store/store";
import RootContainer from "./RootContainer";
import ScrollTopIcon from "../Subcomponents/ScrollTopIcon";

interface Props {}

const App: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const appRef = React.createRef<HTMLDivElement>();

  const { store } = configureStore();

  return (
    <div ref={appRef} className="App">
      <Provider store={store}>
        <RootContainer />
        <ScrollTopIcon appRef={appRef} />
        <footer className="app_footer">
          © 2020 Ryan Brandt. All rights reserved. v2.0.0
        </footer>
      </Provider>
    </div>
  );
};

export default App;
