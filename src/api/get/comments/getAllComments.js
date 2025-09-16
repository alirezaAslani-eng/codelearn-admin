export default async function getAllComments() {
  const res = await fetch("https://codelearn-backend.onrender.com/v1/comments");
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
