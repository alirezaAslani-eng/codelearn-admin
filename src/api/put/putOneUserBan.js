export default async function putOneUserBan({ headers, param }) {
  if (!headers || !param)
    throw new Error("you might didn't send headers or id as a prop");
  const res = await fetch(`https://alireza-eng.ir/v1/users/ban/${param}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
