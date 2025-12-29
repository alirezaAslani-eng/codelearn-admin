export default async function putRejectOneComment({ headers, body, param }) {
  if (!headers || !body || !param)
    throw new Error("you might didn't send headers , id or body as a prop");
  const res = await fetch(
    `https://alireza-eng.ir/v1/comments/reject/${param}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
