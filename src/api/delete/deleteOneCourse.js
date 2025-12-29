export default async function deleteOneCourse(headers, id) {
  if (!headers || !id)
    throw new Error("you might didn't send headers or id as a prop");
  const res = await fetch(`https://alireza-eng.ir/v1/courses/${id}`, {
    method: "DELETE",
    headers: headers,
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error({ response: jsonResponse, result: false });
  }
  return { response: jsonResponse, result: true };
}
