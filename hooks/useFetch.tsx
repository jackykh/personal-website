import { useState, useCallback } from "react";
import fetchApi from "../utils/fetchApi";

const useFetch = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const trigger = useCallback(async (url: string, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchApi(url, options);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, trigger };
};

export default useFetch;
