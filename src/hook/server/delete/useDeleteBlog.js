import React, { useContext } from "react";
import { AuthContext } from "../../../context";
export default function useDeleteBlog() {
  const authContext = useContext(AuthContext);
  const deleteBlog = (id) => {
    const res = fetch(
      `https://codelearn-backend.onrender.com/v1/articles/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authContext.adminToken}`,
        },
      }
    );
    return res;
  };
  return { deleteBlog };
}
