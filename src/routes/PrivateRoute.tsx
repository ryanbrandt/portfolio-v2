import React, { useEffect } from "react";
import { CognitoUser } from "@aws-amplify/auth";
import { connect } from "react-redux";
import { Route, RouteProps } from "react-router-dom";

import { history } from "./index";
import { getActiveUser } from "../Auth/selectors";
import { RootState } from "../store/rootReducer";
import Login from "../Auth/Components/Login";

interface Props extends RouteProps {}

interface StateProps {
  user: CognitoUser | null;
}

const PrivateRoute = (props: Props & StateProps) => {
  const { user, component } = props;

  const { location } = history;
  const { pathname } = location;

  useEffect(() => {
    if (!user && pathname !== "/admin") {
      history.push("/admin");
    }
  }, [pathname, user]);

  return <Route {...props} component={user && component ? component : Login} />;
};

const mapStateToProps = (state: RootState) => {
  return {
    user: getActiveUser(state),
  };
};

export default connect<StateProps, void, Props, RootState>(mapStateToProps)(
  PrivateRoute
);
