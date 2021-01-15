import React from "react";

import { Button, Countdown } from "handsome-ui";

import { history } from "../../routes/index";

interface Props {
  onResolve?: Function;
}

const ErrorScreen: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const handleRecovery = () => {
    const { onResolve } = props;

    history.push("/");

    if (onResolve) {
      onResolve();
    }
  };

  return (
    <div className="fadeable-content app-error-screen">
      <h1>An Unexpected Error has Occured</h1>
      <p>Don't worry, we'll fix this in:</p>
      <Countdown initialCount={10} onCompletion={handleRecovery} />
      <p>Or you can continue manually</p>
      <Button title="Continue" onClick={handleRecovery} inverting />
    </div>
  );
};

export default ErrorScreen;
