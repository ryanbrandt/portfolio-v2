import React, { Component } from "react";

import ErrorScreen from "../Subcomponents/ErrorScreen";

interface Props {}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error: any, info: any): void {
    this.setState({ hasError: true });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <ErrorScreen onResolve={() => this.setState({ hasError: false })} />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
