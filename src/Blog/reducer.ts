import * as t from "./actionTypes";
import { Action } from "./actions";

export interface BlogState {
  list: Array<any>; // TODO
}

const initialState: BlogState = {
  list: [],
};

export default function (
  state: BlogState = initialState,
  action: Action
): BlogState {
  switch (action.type) {
    case t.BLOG_LIST_SUCCESS: {
      const { blogList } = action;

      return {
        ...state,
        list: blogList,
      };
    }

    default: {
      return state;
    }
  }
}
