import { useContext } from "react";
import { AuthContext } from "../../../context";
// useDeleteUser hook >>
export default function useDeleteCategory() {
  // use context to send Authorization >>
  const authContext = useContext(AuthContext);
  // main method to delete a user by userInfo >>
  const deleteCategory = (id) => {
    const res = fetch(`https://alireza-eng.ir/v1/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authContext.adminToken}`,
      },
    });
    return res;
  };
  return { deleteCategory };
}
