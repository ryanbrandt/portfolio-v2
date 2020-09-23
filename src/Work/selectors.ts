import { createSelector } from "reselect";

import { RootState } from "../store/rootReducer";

export const getWorkList = (state: RootState) => state.work.list;

export const getActiveWorkIndex = (state: RootState) =>
  state.work.activeItemIndex;

export const getActiveWorkItem = createSelector(
  [getWorkList, getActiveWorkIndex],
  (list, activeIndex) => {
    if (activeIndex != -1) {
      return list[activeIndex];
    }
  }
);
