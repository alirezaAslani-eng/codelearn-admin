import { useContext } from "react";
import { AuthContext } from "../../../context";

export default function useCreateSession() {
  const authContext = useContext(AuthContext);
  const createSession = (sessionInfo = {}, id = "") => {
    return fetch(
      `https://codelearn-backend.onrender.com/v1/courses/${id}/sessions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authContext.adminToken}`,
          // multipart/form-data
        },
        body: sessionInfo,
      }
    );
  };
  return { createSession };
}
