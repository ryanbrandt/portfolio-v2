import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Divider, TabMenu, Row } from "handsome-ui";

import { workListRequest } from "../actions";
import { getWorkList } from "../selectors";

import EmptyResults from "../../Common/Components/EmptyResults";
import ContentCard from "../../Common/Components/ContentCard";
import { RootState } from "../../store/rootReducer";

interface Props {}

interface StateProps {
  workList: Array<any>; //TODO
}

interface DispatchProps {
  fetchWorkList: () => void;
}

const Work = (props: Props & StateProps & DispatchProps): JSX.Element => {
  useEffect(() => {
    const { fetchWorkList } = props;

    fetchWorkList();
  }, []);

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

    const work = [...workList];
    const workRows = [];
    while (work.length > 0) {
      workRows.push(work.splice(0, 4));
    }

    return workRows.map((row, i) => (
      <Row key={`row_${i}`}>
        {row.map((item) => (
          <ContentCard
            key={item.name}
            imgSrc={item.image ? item.image : "project-placeholder.jpg"}
            onClick={() => null}
            title={item.name}
          />
        ))}
      </Row>
    ));
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchWorkList: () => dispatch(workListRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Work);
