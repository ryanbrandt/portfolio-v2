import { createSelector } from "reselect";

import { RootState } from "../store/rootReducer";

export const getWorkList = (state: RootState) => state.work.list;

export const getWorkTab = (state: RootState) => state.work.activeTab;

export const getWorkQuery = (state: RootState) => state.work.query;

export const getActiveWorkIndex = (state: RootState) =>
  state.work.activeItemIndex;

export const getActiveWorkItem = createSelector(
  [getWorkList, getActiveWorkIndex],
  (list, activeIndex) => {
    if (activeIndex !== -1) {
      return list[activeIndex];
    }
  }
);

export const getFilteredWorkList = createSelector(
  [getWorkList, getWorkTab, getWorkQuery],
  (list, tab, query) => {
    const trimmedQuery = query.trim();
    const queryFilteredList = list.filter(item => item.name.toLowerCase().includes(trimmedQuery));

    if(tab !== "all") {
      return queryFilteredList.filter(item => item.tags?.includes(tab));
    }
    return queryFilteredList;
  }
);
