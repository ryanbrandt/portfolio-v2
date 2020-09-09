import React from "react";
import { connect } from "react-redux";

import { Divider, TabMenu, Row } from "handsome-ui";

import { getWorkList } from "../selectors";

import EmptyResults from "../../Common/Components/EmptyResults";
import ContentCard from "../../Common/Components/ContentCard";
import { RootState } from "../../store/rootReducer";

interface Props {}

interface StateProps {
  workList: Array<any>; //TODO
}

const Work = (props: Props & StateProps): JSX.Element => {
  const tabs = [
    { title: "All", key: "all" },
    { title: "Full Stack Web", key: "fullStack" },
    { title: "Tools", key: "tools" },
    { title: "Other", key: "other" },
  ];

  const _renderCards = () => {
    const { workList } = props;
    if (workList.length < 1) {
      return <EmptyResults />;
    }

    const work = Object.assign([], workList);
    const cards = new Array<React.ReactNode>();
    while (work.length > 0) {
      const currentItems = work.splice(4);
      cards.push(
        <Row>
          <ContentCard
            imgSrc="project-placeholder.jpg"
            onClick={() => null}
            title="Test"
          />
          <ContentCard
            imgSrc="project-placeholder.jpg"
            onClick={() => null}
            title="Test"
          />
          <ContentCard
            imgSrc="project-placeholder.jpg"
            onClick={() => null}
            title="Test"
          />
          <ContentCard
            imgSrc="project-placeholder.jpg"
            onClick={() => null}
            title="Test"
          />
        </Row>
      );
    }

    return cards;
  };

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Work</h1>
        <Divider />
        <div className="app_wide_container">
          <TabMenu tabs={tabs} onTab={() => null} onSearch={() => null} />
          {_renderCards()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    workList: getWorkList(state),
  };
};

export default connect(mapStateToProps, null)(Work);
