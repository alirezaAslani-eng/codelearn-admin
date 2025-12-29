export default async function deleteOneCourse({ param, headers }) {
  console.log({ param, headers });

  if (!param) throw new Error("you might didn't send headers or id as a prop");
  const res = await fetch(`https://alireza-eng.ir/v1/menus/${param}`, {
    method: "DELETE",
    headers,
  });
  const jsonResponse = await res.json();
  if (!res.ok) throw jsonResponse;

  return jsonResponse;
}
