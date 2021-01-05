import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Router } from "react-router";

import { AppContainer, Header, LoadingOverlay } from "handsome-ui";

import { HeaderOption } from "../types";
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
  const HOME_REGEX = /^\/$/;
  const WORK_REGEX = /^\/work$/;
  const RESUME_REGEX = /^\/resume$/;
  const CONTACT_REGEX = /^\/contact$/;
  const BLOG_REGEX = /^\/blog$/;

  const [
    activeHeaderOption,
    setActiveHeaderOption,
  ] = useState<HeaderOption | null>("Home");

  useEffect(() => {
    const { location: mountingLocation } = history;
    const { pathname: mountingPath } = mountingLocation;

    if (!mountingPath.match(HOME_REGEX)) {
      history.replace("/");
    }

    const unlisten = history.listen((location) => {
      window.scrollTo(0, 0);

      const { pathname } = location;

      if (pathname.match(HOME_REGEX)) {
        setActiveHeaderOption("Home");
      } else if (pathname.match(WORK_REGEX)) {
        setActiveHeaderOption("Work");
      } else if (pathname.match(RESUME_REGEX)) {
        setActiveHeaderOption("Resumé");
      } else if (pathname.match(CONTACT_REGEX)) {
        setActiveHeaderOption("Contact");
      } else if (pathname.match(BLOG_REGEX)) {
        setActiveHeaderOption("Blog");
      } else {
        setActiveHeaderOption(null);
      }
    });

    return () => unlisten();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerOptions = [
    {
      name: "Home",
      action: () => history.push("/"),
      active: activeHeaderOption === "Home",
    },
    {
      name: "Work",
      action: () => history.push("/work"),
      active: activeHeaderOption === "Work",
    },
    {
      name: "Resumé",
      action: () => history.push("/resume"),
      active: activeHeaderOption === "Resumé",
    },
    {
      name: "Contact",
      action: () => history.push("/contact"),
      active: activeHeaderOption === "Contact",
    },
    {
      name: "Blog",
      action: () => history.push("/blog"),
      active: activeHeaderOption === "Blog",
    },
  ];

  const { contentLoading } = props;

  return (
    <AppContainer
      className="root_container"
      header={<Header options={headerOptions} />}
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
