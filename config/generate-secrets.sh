#!/bin/bash

cd ./src/utils

echo export const BACKEND_BASE_URL = "\"${PORTFOLIO_API}\";" export const RECAPTCHA_KEY = "\"${PORTFOLIO_RECAPTCHA_KEY}\";" > secrets.ts