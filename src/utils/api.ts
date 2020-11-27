import Apisauce from "apisauce";

import { BACKEND_BASE_URL } from "./secrets";

export default Apisauce.create({
  baseURL: BACKEND_BASE_URL,
});
