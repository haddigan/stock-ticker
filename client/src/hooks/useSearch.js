import { useState, useEffect } from "react";

const URI = `${process.env.REACT_APP_API_URI}`;

const SYMBOL_KEY = "1. symbol";
const NAME_KEY = "2. name";

const formatResults = (results) => {
  return results.map((result) => {
    const symbol = result[SYMBOL_KEY];
    const name = result[NAME_KEY];
    return { symbol, name };
  });
};

export const useSearch = (term) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isIdle, setIsIdle] = useState(true);
  const [response, setResponse] = useState(null);

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
