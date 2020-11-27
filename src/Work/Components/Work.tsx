import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Divider, TabMenu, Row, AppContext, Modal } from "handsome-ui";

import { history } from "../../routes";
import {
  workListRequest,
  setActiveWorkTab,
  setWorkQuery,
  setActiveWorkItem,
} from "../actions";
import { getFilteredWorkList, getActiveWorkItem } from "../selectors";

import WorkContent from "../Subcomponents/WorkContent";
import EmptyResults from "../../Common/Components/EmptyResults";
import ContentCard from "../../Common/Components/ContentCard";
import { RootState } from "../../store/rootReducer";

interface Props {}

interface StateProps {
  workList: Array<any>; // TODO
  activeItem: any; // TODO
}

interface DispatchProps {
  fetchWorkList: () => void;
  setQuery: (query: string) => void;
  setTab: (tab: string) => void;
  setActiveItem: (item: any) => void; // TODO
}

const Work = (props: Props & StateProps & DispatchProps): JSX.Element => {
  const isMobile = useContext(AppContext);
  const [contentModalOpen, setContentModalOpen] = useState(false);

  useEffect(() => {
    if (isMobile && contentModalOpen) {
      setContentModalOpen(false);
    }
  }, [isMobile, contentModalOpen]);

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
    { title: "Other", key: "other" },
  ];

  const _handleCardSelection = (item: any) => {
    const { setActiveItem } = props;
    setActiveItem(item.id);

    if (isMobile) {
      history.push(`/work/${item.id}`);
    } else {
      setContentModalOpen(true);
    }
  };

  const _renderContentModal = () => {
    const { activeItem } = props;

    return (
      <Modal
        heading={<h1 className="aligned_text">{activeItem.name}</h1>}
        open={contentModalOpen}
        onClose={() => setContentModalOpen(false)}
      >
        <WorkContent />
      </Modal>
    );
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
            onClick={() => _handleCardSelection(item)}
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
          <TabMenu
            tabs={tabs}
            onTab={(tab: string) => setTab(tab)}
            onSearch={(query: string) => setQuery(query)}
          />
          {_renderCards()}
        </div>
      </div>
      {_renderContentModal()}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    workList: getFilteredWorkList(state),
    activeItem: getActiveWorkItem(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchWorkList: () => dispatch(workListRequest()),
    setQuery: (query: string) => dispatch(setWorkQuery(query)),
    setTab: (tab: string) => dispatch(setActiveWorkTab(tab)),
    setActiveItem: (item: any) => dispatch(setActiveWorkItem(item)), // TODO
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Work);
