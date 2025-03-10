import { useState, useEffect } from 'react';

const useApi = (url, method = 'GET', bodyData = null, headers = { 'Content-Type': 'application/json' }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {method, headers,};

        // Add body data only if it's a POST, PUT, etc.
        if (bodyData) {
          options.body = JSON.stringify(bodyData);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Request failed');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, bodyData, headers]);

  return { data, loading, error };
};

export default useApi;
