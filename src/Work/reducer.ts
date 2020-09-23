import * as t from "./actionTypes";
import { Action } from "./actions";

export interface WorkState {
  list: Array<any>; // TODO
  activeItemIndex: number;
}

const initialState: WorkState = {
  list: [],
  activeItemIndex: -1,
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

    case t.SET_ACTIVE_WORK_ITEM: {
      const { index } = action;

      return {
        ...state,
        activeItemIndex: index,
      };
    }

    default: {
      return state;
    }
  }
}
