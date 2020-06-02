import React, { useEffect, useState } from "react";
import { Router } from "react-router";

import { AppContainer } from "handsome-ui";

import routes, { history } from "../routes";

interface Props {}

const MENU_OPTIONS = [
  { name: "Home", route: "/" },
  { name: "Work", route: "/work" },
  { name: "Resumé", route: "/resumé" },
  { name: "Contact", route: "/contact" },
  { name: "Blog", route: "/blog" },
];

const initialState = [
  { name: "Home", route: "/", active: true },
  { name: "Work", route: "/work", active: false },
  { name: "Resumé", route: "/resumé", active: false },
  { name: "Contact", route: "/contact", active: false },
  { name: "Blog", route: "/blog", active: false },
];

const RootContainer: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  useEffect(() => {
    const { location } = history;
    const { pathname } = location;
    _handlePathChange(pathname);

    history.listen((location, action) => {
      const { pathname } = location;
      _handlePathChange(pathname);
    });
  }, []);

  const [menuOptions, setMenuOptions] = useState(initialState);

  const _handlePathChange = (activePath: string): void => {
    setMenuOptions(
      MENU_OPTIONS.map((option) => {
        if (option.route === activePath) {
          return {
            ...option,
            active: true,
          };
        }
        return { ...option, active: false };
      })
    );
  };

  const _renderHeaderMenu = (): React.ReactNode => {
    return (
      <div className="flex_row app_menu">
        {menuOptions.map((option) => (
          <span
            key={option.name}
            className={option.active ? "app_menu_active" : "app_menu_option"}
            onClick={() => history.push(option.route)}
          >
            {option.name}
          </span>
        ))}
      </div>
    );
  };

  const _renderMobileMenu = (): React.ReactNode => {
    return <p>mobile</p>;
  };

  return (
    <AppContainer
      mobileMenu={_renderMobileMenu()}
      headerMenu={_renderHeaderMenu()}
    >
      <div className="root_container">
        <Router history={history}>{routes}</Router>
      </div>
    </AppContainer>
  );
};

export default RootContainer;
