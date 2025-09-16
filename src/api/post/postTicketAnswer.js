export default async function postTicketAnswer({ body, headers }) {
  const res = await fetch(
    "https://codelearn-backend.onrender.com/v1/tickets/answer",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }
  return jsonResponse;
}
