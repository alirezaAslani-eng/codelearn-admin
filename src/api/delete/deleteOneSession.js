export default async function deleteOneCourse({ param, headers }) {
  console.log(param, headers);

  if (!headers || !param)
    throw new Error(
      "error in taking prop -> deleteOneCourse({ param, headers })"
    );
  const res = await fetch(
    `https://codelearn-backend.onrender.com/v1/courses/sessions/${param}`,
    {
      method: "DELETE",
      headers: headers,
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error({ response: jsonResponse, result: false });
  }
  return { response: jsonResponse, result: true };
}
