import axios from "axios";
import * as url from "../url";
import { config } from "../../Url";
import { get } from "../api";

export const getPurchase = () => {
  return get(url.purchase_url, config);
};
