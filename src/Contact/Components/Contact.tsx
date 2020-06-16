import React from "react";

import { Divider } from "handsome-ui";

import ContactForm from "../Subcomponents/ContactForm";

interface Props {}

const Contact: React.FunctionComponent<Props> = (): JSX.Element => {
  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Start the Conversation</h1>
        <Divider />
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
