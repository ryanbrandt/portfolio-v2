import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Badge, Input, Button, Divider } from "handsome-ui";

import { version } from "../../utils/gitVersion";
import { adminLoginRequest } from "../actions";

interface LoginForm {
  [key: string]: any;
  email: string;
  password: string;
}

const loginInitialState: LoginForm = {
  email: "",
  password: "",
};

interface Props {}

interface DispatchProps {
  loginRequest: (
    resolve: any,
    reject: any,
    email: string,
    password: string
  ) => void;
}

const Login: React.FunctionComponent<Props & DispatchProps> = (
  props: Props & DispatchProps
) => {
  const [fields, setFields] = useState(loginInitialState);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const _formIsValid = (): boolean => {
    let allFieldsComplete = true;
    for (const key in fields) {
      if (fields[key].length < 1) {
        allFieldsComplete = false;
        break;
      }
    }

    return allFieldsComplete;
  };

  const _handleLogin = async (): Promise<void> => {
    setProcessing(true);
    setError(null);
    await new Promise((resolve, reject) => {
      const { loginRequest } = props;

      loginRequest(resolve, reject, fields.email, fields.password);
    }).catch((errorMessage) => {
      setError(errorMessage);
      setProcessing(false);
    });
  };

  const disabled = !_formIsValid() || processing;

  return (
    <div className="fadeable-content flex_center_col login_container">
      <div>
        <h1 className="aligned_text">Admin Login</h1>
        <Input
          label="Email"
          onChange={(value: string) => setFields({ ...fields, email: value })}
        />
        <Input
          type="password"
          label="Password"
          onChange={(value: string) =>
            setFields({ ...fields, password: value })
          }
        />
        <div className="flex_center_col login_button_container">
          <Button
            title="Login"
            onClick={disabled ? () => null : _handleLogin}
            disabled={disabled}
            inverting
            round
          />
        </div>
        <Divider />
        <div className="app_version-text">{version}</div>
        {error && (
          <Badge
            className="fadeable-content"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.616)",
              margin: "10px",
            }}
            content={error}
          />
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loginRequest: (
      resolve: any,
      reject: any,
      email: string,
      password: string
    ) => dispatch(adminLoginRequest(resolve, reject, email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
