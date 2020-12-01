import { COGNITO_POOL_ID, APP_CLIENT_ID } from "./secrets";

export default {
  region: "us-east-2",
  userPoolId: COGNITO_POOL_ID,
  userPoolWebClientId: APP_CLIENT_ID,
};
