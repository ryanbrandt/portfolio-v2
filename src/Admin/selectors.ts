import { createSelector } from "reselect";

import { PLACEHOLDER_RESUME_ITEM } from "../Resumé/constants";
import { getResumeList } from "../Resumé/selectors";
import { RootState } from "../store/rootReducer";
import { ResumeItem, WorkItem } from "../utils/types";
import { PLACEHOLDER_WORK_ITEM } from "../Work/constants";
import { getWorkList } from "../Work/selectors";

export const getAdminActiveTab = (state: RootState) => state.admin.activeTab;
export const getAdminQuery = (state: RootState) => state.admin.query;
export const getAdminActiveItemId = (state: RootState) =>
  state.admin.activeItemId;

export const getFilteredAdminData = createSelector(
  [getAdminActiveTab, getAdminQuery, getWorkList, getResumeList],
  (tab, query, work, resume) => {
    let data: Array<ResumeItem | WorkItem> = resume;
    if (tab === "work") {
      data = work;
    }

    if (tab === "blog") {
      data = [];
    }

    return data.filter((item) =>
      item.name?.toLowerCase().includes(query.toLowerCase())
    );
  }
);

export const getAdminResumeActiveItem = createSelector(
  [getAdminActiveItemId, getResumeList],
  (id, resume) => {
    const activeItem = resume.find((item) => item.id === id);

    if (activeItem) {
      return activeItem;
    }

    return PLACEHOLDER_RESUME_ITEM;
  }
);

export const getAdminWorkActiveItem = createSelector(
  [getAdminActiveItemId, getWorkList],
  (id, work) => {
    const activeItem = work.find((item) => item.id === id);

    if (activeItem) {
      return activeItem;
    }

    return PLACEHOLDER_WORK_ITEM;
  }
);
