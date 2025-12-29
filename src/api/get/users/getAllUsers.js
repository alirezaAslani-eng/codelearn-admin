export default async function getAllUsers({ headers }) {
  if (!headers) throw new Error("send headers to authorization");
  const res = await fetch("https://alireza-eng.ir/v1/users", {
    headers: headers,
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
