import React from "react";

import { Input, Text, Button } from "handsome-ui";

import {} from "handsome-ui";

interface Props {}

const ResumeForm = (props: Props) => {
  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <Input label="Title" onChange={() => null} />
        <Input label="Date String" onChange={() => null} />
        <Text label="Description" onChange={() => null} />
        <Button title="Update Item" onClick={() => null} />
      </div>
    </div>
  );
};

export default ResumeForm;
