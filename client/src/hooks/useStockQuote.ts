import { useState, useEffect } from "react";
import { RequestStatus } from "../types/requestStatus";

const URI = `${process.env.REACT_APP_API_URI}`;

const GLOBAL_QUOTE = "Global Quote";
const OPEN = "02. open";
const HIGH = "03. high";
const LOW = "04. low";
const PRICE = "05. price";
const CHANGE_PERCENT = "10. change percent";

export const useStockQuote = (
  symbol: string
): [any, Error | null, RequestStatus] => {
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
        const quote = json[GLOBAL_QUOTE];
        const price = quote[PRICE];
        const open = quote[OPEN];
        const high = quote[HIGH];
        const low = quote[LOW];
        const changePercent = quote[CHANGE_PERCENT];
        setResponse({ price, open, high, low, changePercent });
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
