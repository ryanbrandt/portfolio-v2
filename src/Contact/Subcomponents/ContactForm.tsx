import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ReCAPTCHA from "react-google-recaptcha";

import { Input, Button, Text, LoadingOverlay, Badge } from "handsome-ui";

import { sendMessageRequest } from "../actions";

interface DispatchProps {
  sendMessage: (payload: ContactForm, resolve: any, reject: any) => void;
}

interface Props {}

export interface ContactForm {
  [key: string]: any;
  name: string;
  email: string;
  content: string;
}

const initialState: ContactForm = {
  name: "",
  email: "",
  content: "",
};

const ContactForm = (props: Props & DispatchProps) => {
  const [fields, setFields] = useState(initialState);
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [captchaValidated, setCaptchaValidated] = useState(false);

  const _formIsValid = (): boolean => {
    let allFieldsComplete = true;
    for (const key in fields) {
      if (fields[key].length < 1) {
        allFieldsComplete = false;
        break;
      }
    }

    return captchaValidated && allFieldsComplete;
  };

  const _handleFormSubmit = async (): Promise<void> => {
    setProcessing(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    await new Promise<string>((resolve, reject) => {
      const { sendMessage } = props;

      sendMessage(fields, resolve, reject);
    })
      .then((successMessage) => setSuccessMessage(successMessage))
      .catch((errorMessage) => setErrorMessage(errorMessage));

    setProcessing(false);
  };

  const _renderRecaptcha = (): React.ReactNode => {
    return (
      <div className="contact_recaptcha">
        <ReCAPTCHA
          sitekey={"6LeFKr8UAAAAAL-jfBu2qlyDzwySnEDXA4dNJcoA"}
          onChange={(token: string | null) =>
            setCaptchaValidated(token ? true : false)
          }
        />
      </div>
    );
  };

  const _renderSubmitButton = (): React.ReactNode => {
    const disabled = !_formIsValid();

    return (
      <div className="flex_center_col contact_submit">
        <Button
          title="Send Message"
          onClick={_handleFormSubmit}
          disabled={disabled}
          inverting
          round
        />
      </div>
    );
  };

  const _renderMessageSection = (): React.ReactNode => {
    return (
      <div className="flex_center_col">
        {errorMessage && <Badge content={errorMessage} />}
        {successMessage && <Badge content={successMessage} />}
      </div>
    );
  };

  return (
    <Fragment>
      <div className="contact_form">
        <Input
          label="Name"
          placeholder="Your Full Name"
          value={fields.name}
          containerClassName="contact_input"
          onChange={(value: string) => setFields({ ...fields, name: value })}
        />
        <Input
          label="Email"
          placeholder="Your Email Address"
          value={fields.email}
          containerClassName="contact_input"
          onChange={(value: string) => setFields({ ...fields, email: value })}
        />
        <Text
          label="How Can I Help You?"
          containerClassName="contact_input"
          onChange={(value: string) => setFields({ ...fields, content: value })}
        />
        {_renderRecaptcha()}
        {_renderSubmitButton()}
      </div>
      {_renderMessageSection()}
      <LoadingOverlay show={processing} />
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    sendMessage: (payload: ContactForm, resolve: any, reject: any) =>
      dispatch(sendMessageRequest(payload, resolve, reject)),
  };
};

export default connect<void, DispatchProps, Props, any>(
  undefined,
  mapDispatchToProps
)(ContactForm);
