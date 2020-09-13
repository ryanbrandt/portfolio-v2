import { createSelector } from "reselect";
import { RootState } from "../store/rootReducer";

export const getResumeList = (state: RootState) => state.resume.list;

export const getEducationList = createSelector(getResumeList, (resumeList) => {
  return resumeList.filter((item) => item.tags?.includes("education"));
});

export const getExperienceList = createSelector(getResumeList, (resumeList) => {
  return resumeList.filter((item) => item.tags?.includes("experience"));
});
