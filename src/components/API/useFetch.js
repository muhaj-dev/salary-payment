import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

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
        // console.log(res);
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setPending(false);
        setError(null);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
        setPending(false);

        setError(err.message);
      });
  }, [url]);

  return { data, pending, error };
};

export default useFetch;
