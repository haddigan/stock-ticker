import fetch from "node-fetch";

import { ApiFunction } from "../types";
import { SYMBOL_SEARCH, API_KEY, API_URI } from "./constants";

export const makeApiRequest = async (
  apiFunction: ApiFunction,
  params: string
) => {
  const paramName = apiFunction === SYMBOL_SEARCH ? "keywords" : "symbol";
  const endpoint = `${API_URI}?function=${apiFunction}&${paramName}=${params}&apikey=${API_KEY}`;
  try {
    const apiData = await fetch(endpoint);
    const apiJson = await apiData.json();
    return apiJson;
  } catch (err) {
    throw new Error(err.message);
  }
};
