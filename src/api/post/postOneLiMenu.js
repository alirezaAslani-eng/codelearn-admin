export default async function postOneLiMenu({ headers, body }) {
  console.log({ headers, body });

  if (!headers || !body)
    throw new Error("you might didn't send headers or body as a prop");
  const res = await fetch("https://codelearn-backend.onrender.com/v1/menus/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body), // multipart/form-data
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
