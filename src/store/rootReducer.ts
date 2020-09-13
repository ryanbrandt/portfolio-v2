import { combineReducers } from "redux";

import appReducer, { AppState } from "../App/reducer";
import resumeReducer, { ResumeState } from "../Resumé/reducer";
import blogReducer, { BlogState } from "../Blog/reducer";
import workReducer, { WorkState } from "../Work/reducer";

export interface RootState {
  app: AppState;
  resume: ResumeState;
  blog: BlogState;
  work: WorkState;
}

export default combineReducers({
  app: appReducer,
  resume: resumeReducer,
  blog: blogReducer,
  work: workReducer,
});
