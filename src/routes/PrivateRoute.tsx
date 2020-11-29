import React, { useEffect, useRef, useState } from "react";
import { Auth } from "aws-amplify";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { history } from "./index";

interface Props extends RouteProps {}

const PrivateRoute = (props: Props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const historyListener = useRef<Function | null>(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        setAuthenticated(true);
        setLoaded(true);
      })
      .catch(() => history.push("/login"));

    historyListener.current = history.listen(() => {
      Auth.currentAuthenticatedUser()
        .then()
        .catch(() => {
          if (authenticated) {
            setAuthenticated(false);
          }
        });
    });

    return () => {
      if (historyListener.current) {
        historyListener.current();
      }
    };
  }, []);

  if (!loaded) {
    return null;
  }

  const { component } = props;

  return (
    <Route
      {...props}
      render={() => {
        return authenticated && component ? (
          component
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
