import { useContext } from "react";
import { AuthContext } from "../../../context";

// useDeleteUser hook >>
export default function useDlUser() {
  // use context to send Authorization >>
  const authContext = useContext(AuthContext);
  // main method to delete a user by userInfo >>
  const deleteUser = (id) => {
    const res = fetch(`https://codelearn-backend.onrender.com/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authContext.adminToken}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  };
  return { deleteUser };
}
