export default async function postOneSession({ headers, body, urlId } = {}) {
  // Required props <<
  if (!headers || !body || !urlId)
    throw new Error("you might didn't send headers , body , or id as a prop");
  const res = await fetch(
    `https://alireza-eng.ir/v1/courses/${urlId}/sessions`,
    {
      method: "POST",
      headers: headers,
      body: body, // multipart/form-data
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw new Error({ response: jsonResponse, result: false });
  }
  return { response: jsonResponse, result: true };
}
