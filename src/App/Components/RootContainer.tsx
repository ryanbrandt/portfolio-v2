import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Router } from "react-router";

import { AppContainer, LoadingOverlay } from "handsome-ui";

import { getContentLoading } from "../selectors";
import routes, { history } from "../../routes";
import { RootState } from "../../store/rootReducer";

interface Props {}

interface StateProps {
  contentLoading: boolean;
}

interface MenuItem {
  name: string;
  route: string;
  active: boolean;
}

const MENU_OPTIONS = [
  { name: "Home", route: "/" },
  { name: "Work", route: "/work" },
  { name: "Resumé", route: "/resumé" },
  { name: "Contact", route: "/contact" },
  { name: "Blog", route: "/blog" },
];

const initialState: Array<MenuItem> = [
  { name: "Home", route: "/", active: true },
  { name: "Work", route: "/work", active: false },
  { name: "Resumé", route: "/resumé", active: false },
  { name: "Contact", route: "/contact", active: false },
  { name: "Blog", route: "/blog", active: false },
];

const RootContainer: React.FunctionComponent<Props & StateProps> = (
  props: Props & StateProps
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

  const [menuOptions, setMenuOptions] = useState<Array<MenuItem>>(initialState);

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

  const _handleMobileClick = (item: string): void => {
    if (item !== "Home") {
      history.push(item.toLowerCase());
    } else {
      history.push("/");
    }
    window.scrollTo(0, 0);
  };

  const _getMobileMenu = (): Array<string> => {
    return menuOptions
      .filter((option: MenuItem) => !option.active)
      .map((option: MenuItem) => option.name);
  };

  const _renderHeaderMenu = (): React.ReactNode => {
    return (
      <div className="flex_space_row app_menu">
        {menuOptions.map((option: MenuItem) => (
          <span
            key={option.name}
            className={
              option.active
                ? "app_menu_active medium_text"
                : "app_menu_option medium_text"
            }
            onClick={() => {
              history.push(option.route);
              window.scrollTo(0, 0);
            }}
          >
            {option.name}
          </span>
        ))}
      </div>
    );
  };

  const { contentLoading } = props;

  return (
    <AppContainer
      className="root_container"
      mobileMenu={_getMobileMenu()}
      headerMenu={_renderHeaderMenu()}
      onMobileClick={_handleMobileClick}
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

export default connect<StateProps, void, Props, any>(mapStateToProps)(
  RootContainer
);
