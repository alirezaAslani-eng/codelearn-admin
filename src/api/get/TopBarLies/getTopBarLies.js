export default async function getTopBarLies() {
  const res = await fetch("https://alireza-eng.ir/v1/menus");
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
