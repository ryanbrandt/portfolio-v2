import React from "react";

import { Divider, Github, Linkedin } from "handsome-ui";

import { safeOpenWindow } from "../../utils/helpers";
import { version } from "../../utils/gitVersion";

interface Props {}

const Home: React.FunctionComponent<Props> = (): JSX.Element => {
  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Hello, World!</h1>
        <Divider />
        <p className="aligned_text medium_text">
          My name is Ryan Brandt. I'm a Software Engineer based out of
          Philadelphia.
        </p>
        <div className="aligned_text">
          <Github
            className="icon home_icon"
            width={42}
            height={42}
            onClick={() => safeOpenWindow("https://www.github.com/ryanbrandt")}
          />
          <Linkedin
            className="icon home_icon"
            width={42}
            height={42}
            onClick={() =>
              safeOpenWindow("https://www.linkedin.com/in/ryan-brandt1996/")
            }
          />
        </div>
        <div className="aligned_text version_string">portfolio-{version}</div>
      </div>
    </div>
  );
};

export default Home;
