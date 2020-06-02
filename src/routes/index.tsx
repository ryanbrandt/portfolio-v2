import React from "react";
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import RootContainer from "../App/RootContainer";

export const history = createBrowserHistory();

export default (
  <Switch>
    <Route exact path="/" component={RootContainer} />
    <Route exact path="/work" component={RootContainer} />
    <Route exact path="/resumé" component={RootContainer} />
    <Route exact path="/contact" component={RootContainer} />
    <Route exact path="/blog" component={RootContainer} />
    <Route exact path="*" component={RootContainer} />
  </Switch>
);
