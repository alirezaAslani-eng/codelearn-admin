import React from "react";

export default async function get(
  url = "",
  requestInfo = { method: "GET", headers: {} }
) {
  const res = await fetch(url, {
    ...requestInfo,
  });
  if (!res.ok) throw new Error("request Error : ", res);
  const data = await res.json();
  return data;
}
