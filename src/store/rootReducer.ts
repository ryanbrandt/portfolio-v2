import { combineReducers } from "redux";

import appReducer, { AppState } from "../App/reducer";
import resumeReducer, { ResumeState } from "../Resumé/reducer";
import blogReducer, { BlogState } from "../Blog/reducer";
import workReducer, { WorkState } from "../Work/reducer";
import authReducer, { AuthState } from "../Auth/reducer";
import adminReducer, { AdminState } from "../Admin/reducer";
export interface RootState {
  app: AppState;
  auth: AuthState;
  admin: AdminState;
  resume: ResumeState;
  blog: BlogState;
  work: WorkState;
}

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  admin: adminReducer,
  resume: resumeReducer,
  blog: blogReducer,
  work: workReducer,
});
