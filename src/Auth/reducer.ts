import { CognitoUser } from "@aws-amplify/auth";

import { Action } from "./actions";
import * as t from "./actionTypes";

export interface AuthState {
  user: CognitoUser | null;
}

const initialState: AuthState = {
  user: null,
};

export default function (state: AuthState = initialState, action: Action) {
  switch (action.type) {
    case t.ADMIN_LOGIN_SUCCESS: {
      const { user } = action;

      return {
        ...state,
        user,
      };
    }

    case t.DESTROY_ADMIN_SESSION: {
      return {
        ...state,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
}
