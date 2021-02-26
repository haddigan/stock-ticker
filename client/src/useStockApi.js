import { useState, useEffect } from "react";

const URI = `${process.env.REACT_APP_API_URI}`;

console.log(URI);

export const useStockApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isIdle, setIsIdle] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getApi = async () => {
      setIsIdle(false);
      setIsLoading(true);
      try {
        const result = await fetch(URI);
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
  }, []);

  return { response, error, isLoading, isIdle };
};
