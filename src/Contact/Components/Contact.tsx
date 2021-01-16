import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Badge, Divider, Party } from "handsome-ui";

import { sendMessageRequest } from "../actions";
import { ContactForm as IContactForm } from "../types";

import ContactForm from "../Subcomponents/ContactForm";

interface Props {}

interface DispatchProps {
  sendMessage: (payload: IContactForm, resolve: any, reject: any) => void;
}

const Contact = (props: Props & DispatchProps): JSX.Element => {
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (form: IContactForm): Promise<void> => {
    setErrorMessage(null);

    await new Promise<void>((resolve, reject) => {
      const { sendMessage } = props;

      sendMessage(form, resolve, reject);
    })
      .then(() => {
        setMessageSent(true);
      })
      .catch((errorString: string) => {
        setErrorMessage(errorString);
      });
  };

  const _renderError = (): React.ReactNode => {
    if (errorMessage) {
      return (
        <div className="flex_center_col">
          <Badge
            className="fadeable-content app-error"
            content={errorMessage}
          />
        </div>
      );
    }

    return null;
  };

  const _renderMessageSentSection = (): React.ReactNode => {
    return (
      <div className="fadeable-content">
        <h1 className="aligned_text">Thanks for Reaching Out!</h1>
        <div className="flex_center_col contact_party">
          <Party height={150} width={150} />
        </div>
        <Badge content="Your message has been sent! I will be in touch!" />
      </div>
    );
  };

  const _renderMessageUnsetSection = (): React.ReactNode => {
    return (
      <Fragment>
        <h1 className="aligned_text">Start the Conversation</h1>
        <Divider />
        <ContactForm onSubmit={handleFormSubmit} />
        {_renderError()}
      </Fragment>
    );
  };

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        {messageSent
          ? _renderMessageSentSection()
          : _renderMessageUnsetSection()}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    sendMessage: (payload: IContactForm, resolve: any, reject: any) =>
      dispatch(sendMessageRequest(payload, resolve, reject)),
  };
};

export default connect(null, mapDispatchToProps)(Contact);
