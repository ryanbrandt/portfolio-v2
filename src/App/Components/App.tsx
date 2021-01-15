import React from "react";
import { Provider } from "react-redux";

import configureStore from "../../store/store";

import RootContainer from "./RootContainer";
import ScrollTopIcon from "../Subcomponents/ScrollTopIcon";
import AppFooter from "../Subcomponents/AppFooter";
import ErrorBoundary from "./ErrorBoundary";

interface Props {}

const App: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const appRef = React.createRef<HTMLDivElement>();

  const { store } = configureStore();

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div ref={appRef} className="App">
          <RootContainer />
          <ScrollTopIcon appRef={appRef} />
          <AppFooter />
        </div>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
