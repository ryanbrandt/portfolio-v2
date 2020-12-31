import * as t from "./actionTypes";
import { Action } from "./actions";
import { WorkItem } from "../utils/types";
import { WorkTab } from "./types";

export interface WorkState {
  list: Array<WorkItem>;
  activeItemId: number;
  activeTab: WorkTab;
  query: string;
}

const initialState: WorkState = {
  list: [],
  activeItemId: -1,
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
      const { id } = action;

      return {
        ...state,
        activeItemId: id,
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
      };
    }

    default: {
      return state;
    }
  }
}
