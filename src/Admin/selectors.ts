import { createSelector } from "reselect";
import { getResumeList } from "../Resumé/selectors";

import { RootState } from "../store/rootReducer";
import { getWorkList } from "../Work/selectors";

export const getAdminActiveTab = (state: RootState) => state.admin.activeTab;
export const getAdminQuery = (state: RootState) => state.admin.query;

export const getFilteredAdminData = createSelector(
  [getAdminActiveTab, getAdminQuery, getWorkList, getResumeList],
  (tab, query, work, resume) => {
    let data = resume;
    if (tab === "work") {
      data = work;
    }

    if (tab === "blog") {
      data = [];
    }

    return data.filter((item) => item.name?.toLowerCase().includes(query));
  }
);
