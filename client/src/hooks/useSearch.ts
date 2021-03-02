import { useState, useEffect } from "react";
import { SearchResult } from "../types/searchResult.types";
import { RequestStatus } from "../types/requestStatus.types";

const URI = `${process.env.REACT_APP_API_URI}`;

type UseSearch = (
  term: string
) => [SearchResult[] | null, string | null, RequestStatus];

export const useSearch: UseSearch = (term) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isIdle, setIsIdle] = useState(true);
  const [response, setResponse] = useState<SearchResult[] | null>(null);

  useEffect(() => {
    if (!term) return setResponse(null);
    const getApi = async () => {
      setIsIdle(false);
      setIsLoading(true);
      try {
        const result = await fetch(`${URI}/search/${term}`);
        const json = await result.json();
        setResponse(json);
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
