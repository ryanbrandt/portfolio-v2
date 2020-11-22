import React from "react";
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "../Home/Components/Home";
import Work from "../Work/Components/Work";
import WorkContent from "../Work/Subcomponents/WorkContent";
import Resumé from "../Resumé/Components/Resumé";
import Contact from "../Contact/Components/Contact";
import Blog from "../Blog/Components/Blog";

export const history = createBrowserHistory();

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/work" component={Work} />
    <Route exact path="/work/:id" component={WorkContent} />
    <Route exact path="/resume" component={Resumé} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/blog" component={Blog} />
    <Route exact path="*" component={Home} />
  </Switch>
);
