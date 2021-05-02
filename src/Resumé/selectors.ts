import { createSelector } from "reselect";

import { RootState } from "../store/rootReducer";
import { sortByTimestamp } from "../utils/helpers";
import { ResumeItem } from "../utils/types";

export const getResumeList = (state: RootState): Array<ResumeItem> =>
  state.resume.list;

export const getEducationList = createSelector(getResumeList, (resumeList) => {
  return resumeList.filter((item) => item.tags?.includes("education"));
});

export const getExperienceList = createSelector(getResumeList, (resumeList) => {
  return sortByTimestamp(
    resumeList.filter((item) => item.tags?.includes("experience")),
    true,
    true
  );
});
