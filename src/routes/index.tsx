import React from "react";
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "../Home/Components/Home";

export const history = createBrowserHistory();

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/work" component={Home} />
    <Route exact path="/resumé" component={Home} />
    <Route exact path="/contact" component={Home} />
    <Route exact path="/blog" component={Home} />
    <Route exact path="*" component={Home} />
  </Switch>
);
