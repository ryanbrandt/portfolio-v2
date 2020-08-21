import * as t from "./actionTypes";
import { Action } from "./actions";

export interface WorkState {
  list: Array<any>; // TODO
}

const initialState: WorkState = {
  list: [],
};

export default function (
  state: WorkState = initialState,
  action: Action
): WorkState {
  switch (action.type) {
    case t.WORK_LIST_SUCCESS: {
      const { workList } = action;

      return {
        ...state,
        list: workList,
      };
    }

    default: {
      return state;
    }
  }
}
