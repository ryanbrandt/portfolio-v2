import React from "react";

import { Divider, TabMenu } from "handsome-ui";

import EmptyResults from "../../Common/Components/EmptyResults";

interface Props {}

const Blog: React.FunctionComponent<Props> = (): JSX.Element => {
  const tabs = [
    { title: "All", key: "all" },
    { title: "Technology", key: "tech" },
    { title: "Other", key: "other" },
  ];

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Blog</h1>
        <Divider />
        <div className="app_wide_container">
          <TabMenu tabs={tabs} onTab={() => null} onSearch={() => null} />
          <EmptyResults />
        </div>
      </div>
    </div>
  );
};

export default Blog;
