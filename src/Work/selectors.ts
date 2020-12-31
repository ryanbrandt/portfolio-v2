import { createSelector } from "reselect";

import { RootState } from "../store/rootReducer";
import { PLACEHOLDER_WORK_ITEM } from "./constants";

export const getWorkList = (state: RootState) => state.work.list;

export const getWorkTab = (state: RootState) => state.work.activeTab;

export const getWorkQuery = (state: RootState) => state.work.query;

export const getActiveWorkId = (state: RootState) => state.work.activeItemId;

export const getActiveWorkItem = createSelector(
  [getWorkList, getActiveWorkId],
  (list, activeId) => {
    const activeItem = list.find((item) => item.id === activeId);

    if (activeItem) {
      return activeItem;
    }

    return PLACEHOLDER_WORK_ITEM;
  }
);

export const getFilteredWorkList = createSelector(
  [getWorkList, getWorkTab, getWorkQuery],
  (list, tab, query) => {
    const trimmedQuery = query.trim().toLowerCase();
    const queryFilteredList = list.filter((item) =>
      item.name.toLowerCase().includes(trimmedQuery)
    );

    if (tab !== "all") {
      return queryFilteredList.filter((item) => item.tags?.includes(tab));
    }
    return queryFilteredList;
  }
);
