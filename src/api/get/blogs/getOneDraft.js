export default async function getOneDraft({ param, headers }) {
  const res = await fetch(
    `https://codelearn-backend.onrender.com/v1/articles/${param}`,
    {
      headers,
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
