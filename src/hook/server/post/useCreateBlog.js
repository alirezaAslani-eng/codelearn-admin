import { useContext } from "react";
import { AuthContext } from "../../../context";

export default function useCreateBlog() {
  const authContext = useContext(AuthContext);
  const createBlog = (categoryInfo = {}) => {
    return fetch("https://alireza-eng.ir/v1/articles", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authContext.adminToken}`,
      },
      body: categoryInfo,
    });
  };
  return { createBlog };
}
