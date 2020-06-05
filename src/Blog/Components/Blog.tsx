import React from "react";

import { Divider } from "handsome-ui";

interface Props {}

const Blog: React.FunctionComponent<Props> = (): JSX.Element => {
  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Blog</h1>
        <Divider />
      </div>
    </div>
  );
};

export default Blog;
