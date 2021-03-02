import { useState, useEffect } from "react";
import { RequestStatus } from "../types/requestStatus.types";
import { Quote } from "../types/stockQuote.types";

const URI = `${process.env.REACT_APP_API_URI}`;

type UseStockQuote = (
  symbol: string
) => [Quote | null, Error | null, RequestStatus];

export const useStockQuote: UseStockQuote = (symbol) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isIdle, setIsIdle] = useState(true);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    if (!symbol) return;
    const getApi = async () => {
      setIsIdle(false);
      setIsLoading(true);
      try {
        const result = await fetch(`${URI}/quote/${symbol}`);
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
  }, [symbol]);

  return [response, error, { isLoading, isIdle, hasError: Boolean(error) }];
};
