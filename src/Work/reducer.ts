import * as t from "./actionTypes";
import { Action } from "./actions";

export interface WorkState {
  list: Array<any>; // TODO
  activeItemIndex: number;
  activeTab: string;
  query: string;
}

const initialState: WorkState = {
  list: [],
  activeItemIndex: -1,
  activeTab: "all",
  query: "",
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

    case t.SET_ACTIVE_WORK_TAB: {
      const { tab } = action;

      return {
        ...state,
        activeTab: tab,
      };
    }

    case t.SET_WORK_QUERY: {
      const { query } = action;

      return {
        ...state,
        query,
      }
    }

    default: {
      return state;
    }
  }
}
