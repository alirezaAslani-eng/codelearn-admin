export default async function postOneCategory({ body, param, headers }) {
  if (!headers || !body || !param)
    throw new Error("you might didn't send headers or body as a prop");
  const res = await fetch(
    `https://alireza-eng.ir/v1/comments/answer/${param}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
