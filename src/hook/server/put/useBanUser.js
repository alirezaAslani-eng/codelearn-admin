import { useContext } from "react";
import { AuthContext } from "../../../context";

// useDeleteUser hook >>
export default function useDlUser() {
  // use context to send Authorization >>
  const authContext = useContext(AuthContext);
  // main method to delete a user by userInfo >>
  const banUser = (id) => {
    const res = fetch(`https://alireza-eng.ir/v1/users/ban/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authContext.adminToken}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  };
  return { banUser };
}
