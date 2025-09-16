export default async function getAllCourses() {
  const res = await fetch("https://codelearn-backend.onrender.com/v1/courses");
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error(jsonResponse);
  }
  return jsonResponse;
}
