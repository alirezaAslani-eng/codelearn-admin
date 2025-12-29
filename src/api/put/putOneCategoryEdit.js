export default async function putOneCategoryEdit(headers, body, id) {
  if (!headers || !body || !id)
    throw new Error("you might didn't send headers , id or body as a prop");
  const res = await fetch(`https://alireza-eng.ir/v1/category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error({ response: jsonResponse, result: false });
  }
  return { response: jsonResponse, result: true };
}
