import { useState, useEffect } from "react";
import { useAuth } from "../API/AuthContext";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const { refresh, setRefresh } = useAuth();
  const userToken = localStorage.getItem("lorchaintoken");

  const headers = {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
  };

  const options = {
    headers: headers,
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setPending(false);
        setError(null);
      })
      .catch((err) => {
        setPending(false);
        
        setError(err.message);
      });
    }, [url, refresh]);
    
    return { data, pending, error };
  };

export default useFetch;
