import React, { Fragment, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { Input, Button, Text } from "handsome-ui";

import { RECAPTCHA_KEY } from "../../utils/secrets";
import { ContactForm as IContactForm } from "../types";
import { EMAIL_REGEX, EMAIL_VALIDATION_ERROR } from "../constants";

interface Props {
  onSubmit: (form: IContactForm) => void;
}

const initialState: IContactForm = {
  name: "",
  email: "",
  content: "",
};

const ContactForm = (props: Props): JSX.Element => {
  const recaptchaRef: React.MutableRefObject<ReCAPTCHA | null> = useRef(null);

  const [fields, setFields] = useState(initialState);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [captchaValidated, setCaptchaValidated] = useState(false);

  const _formIsValid = (): boolean => {
    let allFieldsComplete = true;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in fields) {
      if (fields[key].length < 1) {
        allFieldsComplete = false;
        break;
      }
    }

    return captchaValidated && allFieldsComplete && !invalidEmail;
  };

  const _resetRecaptcha = (): void => {
    const { current: recaptcha } = recaptchaRef;
    if (recaptcha) {
      recaptcha.reset();
      setCaptchaValidated(false);
    }
  };

  const handleFormSubmit = (): void => {
    if (_formIsValid()) {
      const { onSubmit } = props;

      onSubmit(fields);
      _resetRecaptcha();
    }
  };

  const handleEmailChange = (value: string): void => {
    let invalidEmailValue = false;
    if (!EMAIL_REGEX.test(value)) {
      invalidEmailValue = true;
    }

    setFields({ ...fields, email: value });
    setInvalidEmail(invalidEmailValue);
  };

  const _renderRecaptcha = (): React.ReactNode => {
    return (
      <div className="contact_recaptcha">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_KEY}
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
          onClick={disabled ? () => null : handleFormSubmit}
          disabled={disabled}
          inverting
          round
        />
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
          error={invalidEmail ? EMAIL_VALIDATION_ERROR : undefined}
          containerClassName="contact_input"
          onChange={handleEmailChange}
        />
        <Text
          label="How Can I Help You?"
          containerClassName="contact_input"
          value={fields.content}
          onChange={(value: string) => setFields({ ...fields, content: value })}
        />
        {_renderRecaptcha()}
        {_renderSubmitButton()}
      </div>
    </Fragment>
  );
};

export default ContactForm;
