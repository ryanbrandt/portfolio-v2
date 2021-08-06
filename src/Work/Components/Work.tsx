import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Divider, TabMenu, Row } from "handsome-ui";

import { history } from "../../routes";
import {
  workListRequest,
  setActiveWorkTab,
  setWorkQuery,
  setActiveWorkItem,
} from "../actions";
import {
  getFilteredWorkList,
  getActiveWorkItem,
  getWorkTab,
} from "../selectors";
import { RootState } from "../../store/rootReducer";
import { WorkItem } from "../../utils/types";
import { WorkTab } from "../types";

import EmptyResults from "../../Common/Components/EmptyResults";
import ContentCard from "../../Common/Components/ContentCard";

interface Props {}

interface StateProps {
  workList: Array<WorkItem>;
  activeItem: WorkItem;
  activeTab: WorkTab;
}

interface DispatchProps {
  fetchWorkList: () => void;
  setQuery: (query: string) => void;
  setTab: (tab: WorkTab) => void;
  setActiveItem: (id: number) => void;
}

const Work = (props: Props & StateProps & DispatchProps): JSX.Element => {
  useEffect(() => {
    const { fetchWorkList, setQuery, setTab } = props;

    fetchWorkList();

    return () => {
      setTab("all");
      setQuery("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    { title: "All", key: "all" },
    { title: "Web", key: "web" },
    { title: "Tools", key: "tools" },
    { title: "Contract", key: "contract" },
    { title: "Other", key: "other" },
  ];

  const handleCardSelection = (item: WorkItem): void => {
    const { setActiveItem } = props;
    setActiveItem(item.id);

    history.push(`/work/${item.id}`);
  };

  const _renderCards = (): React.ReactNode => {
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
      <Row version="space-evenly" key={`row_${i}`}>
        {row.map((item) => (
          <ContentCard
            key={item.name}
            imgSrc={item.secondaryImage ?? "project-placeholder.jpg"}
            onClick={() => handleCardSelection(item)}
            title={item.name}
          />
        ))}
      </Row>
    ));
  };

  const { setTab, setQuery, activeTab } = props;

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">Work</h1>
        <Divider />
        <div className="app_wide_container">
          <TabMenu
            tabs={tabs.map((tab) => ({
              ...tab,
              active: tab.key === activeTab,
            }))}
            onTab={(tab: string) => setTab(tab as WorkTab)}
            onSearch={(query: string) => setQuery(query)}
          />
          {_renderCards()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    workList: getFilteredWorkList(state),
    activeItem: getActiveWorkItem(state),
    activeTab: getWorkTab(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchWorkList: () => dispatch(workListRequest()),
    setQuery: (query: string) => dispatch(setWorkQuery(query)),
    setTab: (tab: WorkTab) => dispatch(setActiveWorkTab(tab)),
    setActiveItem: (id: number) => dispatch(setActiveWorkItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Work);
