import React, { useState } from "react";

import { Column, Text } from "handsome-ui";

import MarkupPreview from "./MarkupPreview";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const AdminMarkupTextField: React.FunctionComponent<Props> = (props: Props) => {
  const { label, value, onChange, error } = props;

  const [showMarkup, setShowMarkup] = useState(false);

  const _renderMarkup = (): React.ReactElement => {
    let toggleText = "Preview Markup";
    if (showMarkup) {
      toggleText = "Hide Preview";
    }

    return (
      <div className="admin_markup-container">
        {showMarkup && <MarkupPreview html={value} />}
        <div
          className="admin_markup-toggle app_footer-link"
          onClick={() => setShowMarkup(!showMarkup)}
        >
          {toggleText}
        </div>
      </div>
    );
  };

  return (
    <Column>
      <Text label={label} value={value} error={error} onChange={onChange} />
      {value && _renderMarkup()}
    </Column>
  );
};

export default AdminMarkupTextField;
