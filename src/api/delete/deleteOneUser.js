export default async function deleteOneUser({ headers, param }) {
  if (!headers || !param)
    throw new Error("you might didn't send headers or id as a prop");
  const res = await fetch(
    `https://codelearn-backend.onrender.com/v1/users/${param}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json", ...headers },
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
