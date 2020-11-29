import React from "react";
import { Provider } from "react-redux";

import { version } from "../../utils/gitVersion";
import configureStore from "../../store/store";
import RootContainer from "./RootContainer";
import ScrollTopIcon from "../Subcomponents/ScrollTopIcon";
import { Column } from "handsome-ui";
import { history } from "../../routes";

interface Props {}

const App: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const appRef = React.createRef<HTMLDivElement>();

  const { store } = configureStore();

  return (
    <div ref={appRef} className="App">
      <Provider store={store}>
        <RootContainer />
        <ScrollTopIcon appRef={appRef} />
        <footer className="app_footer aligned_text">
          <Column>
            <div>© 2020 Ryan Brandt. All rights reserved.</div>{" "}
            <div>
              {version}{" "}
              <div
                className="app_footer-link"
                onClick={() => history.push("/login")}
              >
                Admin Portal
              </div>
            </div>
          </Column>
        </footer>
      </Provider>
    </div>
  );
};

export default App;
