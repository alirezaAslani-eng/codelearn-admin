const getUserInfo = async ({ headers }) => {
  const res = await fetch("https://codelearn-backend.onrender.com/v1/auth/me", {
    headers,
  });
  const jsonResponse = await res.json();
  if (!res.ok) {
    throw jsonResponse;
  }

  return jsonResponse;
};
export default getUserInfo;
