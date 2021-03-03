import { useState, useEffect } from "react";
import { RequestStatus } from "../types/requestStatus.types";

type Operation = "overview" | "search" | "quote";
type ErrorType = string | null;

export function useStockApi(
  operation: Operation,
  param: string
): [any, ErrorType, RequestStatus] {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [isIdle, setIsIdle] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!param) return setResponse(null);
    const getApi = async () => {
      setError(null);
      setIsIdle(false);
      setIsLoading(true);
      try {
        const endpoint = `${process.env.REACT_APP_API_URI}/${operation}/${param}`;
        const result = await fetch(endpoint);
        const json = await result.json();
        if (result.status === 200) {
          setResponse(json);
          setIsLoading(false);
          setIsIdle(true);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        setIsIdle(true);
      }
    };
    getApi();
  }, [operation, param]);

  return [response, error, { isLoading, isIdle, hasError: Boolean(error) }];
}
