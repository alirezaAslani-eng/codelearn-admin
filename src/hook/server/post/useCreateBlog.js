import { useContext } from "react";
import { AuthContext } from "../../../context";

export default function useCreateBlog() {
  const authContext = useContext(AuthContext);
  const createBlog = (categoryInfo = {}) => {
    return fetch("https://codelearn-backend.onrender.com/v1/articles", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authContext.adminToken}`,
      },
      body: categoryInfo,
    });
  };
  return { createBlog };
}
