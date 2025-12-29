export default async function deleteOneOff({ param }) {
  const { token } = JSON.parse(localStorage.getItem("admin"));

  if (!param)
    throw new Error(
      "error in taking prop -> deleteOneCourse({ param, headers })"
    );
  const res = await fetch(`https://alireza-eng.ir/v1/offs/${param}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
