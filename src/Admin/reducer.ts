import { Action } from "./actions";
import * as t from "./actionTypes";
import { AdminTab } from "./types";

export interface AdminState {
  activeTab: AdminTab;
  query: string;
}

const initialState: AdminState = {
  activeTab: "resume",
  query: "",
};

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case t.ADMIN_SET_ACTIVE_TAB: {
      const { tab } = action;

      return {
        ...state,
        activeTab: tab,
      };
    }

    case t.ADMIN_SET_QUERY: {
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
