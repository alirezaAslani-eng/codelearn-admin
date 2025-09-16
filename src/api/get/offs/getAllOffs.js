export default async function getAllOffs() {
  const adminToken = JSON.parse(localStorage.getItem("admin"))?.token;

  const res = await fetch("https://codelearn-backend.onrender.com/v1/offs", {
    headers: {
      Authorization: `Beare ${adminToken || null}`,
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new jsonResponse();
  }
  return jsonResponse;
}
