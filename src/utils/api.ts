import Apisauce from "apisauce";

import { BACKEND_URL } from "./secrets";

export default Apisauce.create({
  baseURL: BACKEND_URL,
});
