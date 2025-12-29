import { useContext } from "react";
import { AuthContext } from "../../../context";

// change role of user hook >>
export default function useChangeRole() {
  // use context to send Authorization >>
  const authContext = useContext(AuthContext);
  // main method to change role by userInfo >>
  const changeRole = (idAndRole) => {
    const res = fetch("https://alireza-eng.ir/v1/users/role", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authContext.adminToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idAndRole),
    });
    return res;
  };
  return { changeRole };
}
