import { useState, useEffect } from "react";
import {
  SearchResult,
  SimplifiedResult,
  SYMBOL_KEY,
  NAME_KEY,
} from "../types/searchResponse";
import { RequestStatus } from "../types/requestStatus";

const URI = `${process.env.REACT_APP_API_URI}`;

const formatResults = (results: Array<SearchResult>): SimplifiedResult[] => {
  return results.map((result) => {
    const symbol = result[SYMBOL_KEY];
    const name = result[NAME_KEY];
    return { symbol, name };
  });
};

export const useSearch = (
  term: string
): [SimplifiedResult[] | null, Error | null, RequestStatus] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isIdle, setIsIdle] = useState(true);
  const [response, setResponse] = useState<SimplifiedResult[] | null>(null);

  useEffect(() => {
    if (!term) return;
    const getApi = async () => {
      setIsIdle(false);
      setIsLoading(true);
      try {
        const result = await fetch(`${URI}/search/${term}`);
        const json = await result.json();
        const { bestMatches } = json;
        const formattedResults = formatResults(bestMatches);
        setResponse(formattedResults);
        setIsLoading(false);
        setIsIdle(true);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        setIsIdle(true);
      }
    };
    getApi();
  }, [term]);

  return [response, error, { isLoading, isIdle, hasError: Boolean(error) }];
};
