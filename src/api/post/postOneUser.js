export default async function postOneUser(body) {
  if (!body) throw new Error("you might didn't send body as a prop");
  const res = await fetch("https://alireza-eng.ir/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error({ response: jsonResponse, result: false });
  }
  return { response: jsonResponse, result: true };
}
