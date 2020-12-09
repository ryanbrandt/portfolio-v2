import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CognitoUser } from "@aws-amplify/auth";

import { Column, Row } from "handsome-ui";

import { history } from "../../routes";
import { RootState } from "../../store/rootReducer";
import { getActiveUser } from "../../Auth/selectors";
import { adminLogout } from "../../Auth/actions";

interface Props {}

interface StateProps {
  user: CognitoUser | null;
}

interface DispatchProps {
  logout: () => void;
}

const AppFooter = (props: Props & StateProps & DispatchProps) => {
  const _renderLinks = (): React.ReactNode => {
    const { user, logout } = props;

    return (
      <Row style={{ justifyContent: "space-evenly" }}>
        <div className="app_footer-link" onClick={() => history.push("/admin")}>
          Admin Portal
        </div>
        {user && (
          <Fragment>
            <div>|</div>
            <div className="app_footer-link" onClick={() => logout()}>
              Logout
            </div>
          </Fragment>
        )}
      </Row>
    );
  };

  return (
    <footer className="app_footer aligned_text">
      <Column>
        {_renderLinks()}
        <div>© 2020 Ryan Brandt. All rights reserved.</div>
      </Column>
    </footer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: getActiveUser(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => dispatch(adminLogout()),
  };
};

export default connect<StateProps, DispatchProps, Props, any>(
  mapStateToProps,
  mapDispatchToProps
)(AppFooter);
