export default async function getAllBlogs() {
  const res = await fetch("https://alireza-eng.ir/v1/articles");
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
