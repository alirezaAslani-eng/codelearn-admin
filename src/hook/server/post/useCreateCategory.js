import { useContext } from "react";
import { AuthContext } from "../../../context";

export default function useCreateCategory() {
  const authContext = useContext(AuthContext);
  const createCategory = (categoryInfo = {}) => {
    return fetch("https://codelearn-backend.onrender.com/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext.adminToken}`,
      },
      body: JSON.stringify(categoryInfo),
    });
  };
  return { createCategory };
}
