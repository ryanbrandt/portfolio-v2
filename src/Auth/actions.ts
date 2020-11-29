import { CognitoUser } from "@aws-amplify/auth";

import * as t from "./actionTypes";

export interface adminLoginRequest {
  resolve: any;
  reject: any;
  email: string;
  password: string;
  type: t.ADMIN_LOGIN_REQUEST;
}

export function adminLoginRequest(
  resolve: any,
  reject: any,
  email: string,
  password: string
): adminLoginRequest {
  return {
    resolve,
    reject,
    email,
    password,
    type: t.ADMIN_LOGIN_REQUEST,
  };
}

export interface adminLoginSuccess {
  user: CognitoUser;
  type: t.ADMIN_LOGIN_SUCCESS;
}

export function adminLoginSuccess(user: CognitoUser): adminLoginSuccess {
  return {
    user,
    type: t.ADMIN_LOGIN_SUCCESS,
  };
}

export type Action = adminLoginRequest | adminLoginSuccess;
