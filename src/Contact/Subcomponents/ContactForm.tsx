import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { Input, Button, Text } from "handsome-ui";

interface Props {}

interface ContactForm {
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

const ContactForm: React.FunctionComponent<Props> = (props: Props) => {
  const [fields, setFields] = useState(initialState);
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
          onClick={() => null}
          disabled={disabled}
          inverting
          round
        />
      </div>
    );
  };

  return (
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
  );
};

export default ContactForm;
