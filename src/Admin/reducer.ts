import { Action } from "./actions";
import * as t from "./actionTypes";
import { AdminTab } from "./types";

export interface AdminState {
  activeTab: AdminTab;
  query: string;
  activeItemId: number;
}

const initialState: AdminState = {
  activeTab: "resume",
  query: "",
  activeItemId: -1,
};

export default function (state = initialState, action: Action): AdminState {
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

    case t.ADMIN_SET_ACTIVE_ITEM_ID: {
      const { id } = action;

      return {
        ...state,
        activeItemId: id,
      };
    }

    default: {
      return state;
    }
  }
}
