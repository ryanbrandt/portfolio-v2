import React, { useState } from "react";

import { Badge } from "handsome-ui";

interface Props {
  appRef: React.RefObject<HTMLDivElement>;
}

const ScrollTopIcon: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element | null => {
  const [visible, setVisible] = useState(false);

  const _handleScroll = (): void => {
    if (window.pageYOffset > 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", _handleScroll);

    return () => window.removeEventListener("scroll", _handleScroll);
  }, []);

  const _handleClick = () => {
    const { appRef } = props;
    if (visible && appRef && appRef.current) {
      appRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeModifier = visible ? "fadeable-content" : "";
  const className = visible ? "app_scroll-top" : "app_scroll-top-hidden";

  return (
    <div onClick={_handleClick} className={`${fadeModifier} ${className}`}>
      <Badge content="Back to Top" />
    </div>
  );
};

export default ScrollTopIcon;
