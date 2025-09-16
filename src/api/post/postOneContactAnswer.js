export default async function postOneCategory(headers, body) {
  if (!headers || !body)
    throw new Error("you might didn't send headers or body as a prop");
  const res = await fetch(
    "https://codelearn-backend.onrender.com/v1/contact/answer",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error({ response: jsonResponse, result: false });
  }
  return { response: jsonResponse, result: true };
}
