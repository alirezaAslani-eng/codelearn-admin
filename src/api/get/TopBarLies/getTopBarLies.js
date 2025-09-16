export default async function getTopBarLies() {
  const res = await fetch("https://codelearn-backend.onrender.com/v1/menus");
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
