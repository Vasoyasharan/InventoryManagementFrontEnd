import axios from "axios";
import { base_URL } from "./url";

const createBaseUrl = axios.create({
  baseURL: `${base_URL}/api/v1`,
});

export const get = (url, config) => {
  return createBaseUrl.get(url, config);
};
