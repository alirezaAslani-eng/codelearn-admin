export default async function deleteOneComment({ headers, param }) {
  if (!headers || !param)
    throw new Error("you might didn't send headers or id as a prop");
  const res = await fetch(`https://alireza-eng.ir/v1/comments/${param}`, {
    method: "DELETE",
    headers: headers,
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new jsonResponse();
  }
  return jsonResponse;
}
