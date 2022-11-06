/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react"

export const useAxios = (config) => {
  const [response, setResponse] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const callApi = async (config) => {
    try {
      const rawResponse = await axios(config);
      setResponse(rawResponse.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    callApi(config)
  }, [])

  return { response, error, loading }
}