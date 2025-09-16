import { useState } from "react";

export default function usePost(
  url,
  headers = { "Content-Type": "application/json" },
  method = "POST"
) {
  const [isError, setError] = useState(false);
  const [isPending, setPendung] = useState(true);
  const [data, setData] = useState([]);
  const postData = async (info) => {
    setPendung(true);
    setError(false);
    try {
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(info),
        headers: headers,
      });
      const status = res.ok;
      setError(!status);
      const json_response = await res.json();
      setData(json_response); // JSON RESPONSE
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setPendung(false);
    }
  };

  return [postData, isError, isPending, data];
}
