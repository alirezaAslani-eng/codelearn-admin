export default async function postOneOffOnAll({ body }) {
  const adminToken = JSON.parse(localStorage.getItem("admin"))?.token;
  if (!body) throw "you might didn't send headers or body as a prop";
  const res = await fetch(
    "https://codelearn-backend.onrender.com/v1/offs/all",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
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
