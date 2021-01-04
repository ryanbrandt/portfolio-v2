import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Router } from "react-router";

import { AppContainer, Header, LoadingOverlay } from "handsome-ui";

import { getContentLoading } from "../selectors";
import routes, { history } from "../../routes";
import { RootState } from "../../store/rootReducer";

interface Props {}

interface StateProps {
  contentLoading: boolean;
}

const RootContainer: React.FunctionComponent<Props & StateProps> = (
  props: Props & StateProps
): JSX.Element => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => unlisten();
  }, []);

  const { contentLoading } = props;

  const headerOptions = [
    { name: "Home", action: () => history.push("/") },
    { name: "Work", action: () => history.push("/work") },
    { name: "Resumé", action: () => history.push("/resume") },
    { name: "Contact", action: () => history.push("/contact") },
    { name: "Blog", action: () => history.push("/blog") },
  ];

  return (
    <AppContainer
      className="root_container"
      header={<Header options={headerOptions} defaultActive="Home" />}
    >
      <Router history={history}>{routes}</Router>
      <LoadingOverlay show={contentLoading} fade />
    </AppContainer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    contentLoading: getContentLoading(state),
  };
};

export default connect<StateProps, void, Props, RootState>(mapStateToProps)(
  RootContainer
);
