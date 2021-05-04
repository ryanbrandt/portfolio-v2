import React, { useContext } from "react";

import { AppContext } from "handsome-ui";

interface Props {
  html: string;
}

const MarkupPreview: React.FunctionComponent<Props> = (props: Props) => {
  const isMobile = useContext(AppContext);

  const { html } = props;

  let mobileModifier = "";
  if (isMobile) {
    mobileModifier = "markup-mobile";
  }

  return (
    <div
      className={`markup_preview-container ${mobileModifier}`}
      dangerouslySetInnerHTML={{
        __html: `<div style="max-width: inherit; word-wrap: break-word;">${html}</div>`,
      }}
    />
  );
};

export default MarkupPreview;
