import { combineReducers } from "redux";

import resumeReducer, { ResumeState } from "../Resumé/reducer";
import blogReducer, { BlogState } from "../Blog/reducer";
import workReducer, { WorkState } from "../Work/reducer";

export interface RootState {
  resume: ResumeState;
  blog: BlogState;
  work: WorkState;
}

export default combineReducers({
  resume: resumeReducer,
  blog: blogReducer,
  work: workReducer,
});
