export default async function getAllContacts() {
  const res = await fetch("https://alireza-eng.ir/v1/contact");
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
