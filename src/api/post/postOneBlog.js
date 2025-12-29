export default async function postOneBlog({ headers, body }) {
  if (!headers || !body)
    throw new Error("you might didn't send headers or body as a prop");
  const res = await fetch("https://alireza-eng.ir/v1/articles", {
    method: "POST",
    headers: headers,
    body: body, // multipart/form-data
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
