import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Divider, TabMenu, Row } from "handsome-ui";

import { workListRequest, setActiveWorkItem, setActiveWorkTab, setWorkQuery } from "../actions";
import { getFilteredWorkList} from "../selectors";

import WorkContent from "../Subcomponents/WorkContent";
import EmptyResults from "../../Common/Components/EmptyResults";
import ContentCard from "../../Common/Components/ContentCard";
import { RootState } from "../../store/rootReducer";

interface Props {}

interface StateProps {
  workList: Array<any>; //TODO
}

interface DispatchProps {
  fetchWorkList: () => void;
  setActiveItem: (index: number) => void;
  setQuery: (query: string) => void;
  setTab: (tab: string) => void;
}

const Work = (props: Props & StateProps & DispatchProps): JSX.Element => {
  const [contentOpen, setContentOpen] = useState(false);
  useEffect(() => {
    const { fetchWorkList, setQuery, setTab } = props;

    fetchWorkList();

    return () => {
      setTab("all");
      setQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    { title: "All", key: "all" },
    { title: "Full Stack Web", key: "web" },
    { title: "Tools", key: "tools" },
    { title: "Other", key: "other" },
  ];

  const _handleCardSelection = (id: number) => {
    const { setActiveItem } = props;
    setActiveItem(id);
    setContentOpen(true);
  };
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
        {row.map((item, n) => (
          <ContentCard
            key={item.name}
            imgSrc={item.image ? item.image : "project-placeholder.jpg"}
            onClick={() => _handleCardSelection(item.id)}
            title={item.name}
          />
        ))}
      </Row>
    ));
  };

  const { setTab, setQuery } = props;

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Work</h1>
        <Divider />
        <div className="app_wide_container">
          <TabMenu tabs={tabs} onTab={(tab: string) => setTab(tab)} onSearch={(query: string) => setQuery(query)} />
          {_renderCards()}
        </div>
        <WorkContent open={contentOpen} onClose={() => setContentOpen(false)} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    workList: getFilteredWorkList(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchWorkList: () => dispatch(workListRequest()),
    setActiveItem: (index: number) => dispatch(setActiveWorkItem(index)),
    setQuery: (query: string) => dispatch(setWorkQuery(query)),
    setTab: (tab: string) => dispatch(setActiveWorkTab(tab)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Work);
