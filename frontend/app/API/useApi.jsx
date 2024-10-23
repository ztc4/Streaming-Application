import { useState, useEffect } from 'react';
import axios from "axios"

const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    
    const fetchData = async () => {
      try {
        const response = await axios(url);
        console.log(1,response)
        setData(response.data);
      } 
      catch (error) {  setError(error); } 
      finally { setLoading(false); }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useApi;
