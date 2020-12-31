import * as t from "./actionTypes";
import { Action } from "./actions";

export interface AppState {
  contentLoading: boolean;
}

const initialState: AppState = {
  contentLoading: false,
};

export default function (state = initialState, action: Action): AppState {
  switch (action.type) {
    case t.SET_CONTENT_LOADING: {
      const { loading } = action;

      return {
        ...state,
        contentLoading: loading,
      };
    }

    default: {
      return state;
    }
  }
}
