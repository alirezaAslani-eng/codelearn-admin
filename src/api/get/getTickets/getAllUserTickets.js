const getAllTickets = async ({ headers }) => {
  const res = await fetch(
    "https://codelearn-backend.onrender.com/v1/tickets/user",
    {
      headers,
    }
  );
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }

  return jsonResponse;
};
export default getAllTickets;
