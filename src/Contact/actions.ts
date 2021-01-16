import * as t from "./actionTypes";

import { ContactForm } from "./types";

export interface sendMessageRequest {
  type: t.SEND_MESSAGE_REQUEST;
  payload: ContactForm;
  resolve: any;
  reject: any;
}

export function sendMessageRequest(
  payload: ContactForm,
  resolve: any,
  reject: any
): sendMessageRequest {
  return {
    type: t.SEND_MESSAGE_REQUEST,
    payload,
    resolve,
    reject,
  };
}

export type Action = typeof sendMessageRequest;
