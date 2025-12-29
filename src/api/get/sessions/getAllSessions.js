export default async function getAllSessions() {
  const res = await fetch("https://alireza-eng.ir/v1/courses/sessions");
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
