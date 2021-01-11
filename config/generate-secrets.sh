#!/bin/bash

cd ./src/utils

echo export const BACKEND_UPLOAD_BUCKET =  "\"${PORTFOLIO_UPLOAD_BUCKET}\";" export const BACKEND_BASE_URL = "\"${PORTFOLIO_API}\";" export const RECAPTCHA_KEY = "\"${PORTFOLIO_RECAPTCHA_KEY}\";" export const COGNITO_POOL_ID = "\"${COGNITO_POOL_ID}\";" export const APP_CLIENT_ID = "\"${APP_CLIENT_ID}\";"   > secrets.ts