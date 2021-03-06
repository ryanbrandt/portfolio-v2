import * as t from "./actionTypes";
import { Action } from "./actions";
import { ResumeItem } from "../utils/types";

export interface ResumeState {
  list: Array<ResumeItem>;
}

const initalState: ResumeState = {
  list: [],
};

export default function (
  state: ResumeState = initalState,
  action: Action
): ResumeState {
  switch (action.type) {
    case t.RESUME_LIST_SUCCESS: {
      const { resumeList } = action;

      return {
        ...state,
        list: resumeList,
      };
    }

    default: {
      return state;
    }
  }
}
