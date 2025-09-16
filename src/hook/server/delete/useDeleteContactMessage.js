import { AuthContext } from "../../../context";
import { useContext } from "react";
export default function useDeleteContactMessage() {
  const authContext = useContext(AuthContext);
  const deleteContact = (id) => {
    const res = fetch(
      `https://codelearn-backend.onrender.com/v1/contact/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authContext.adminToken}`,
        },
      }
    );
    return res;
  };
  return { deleteContact };
}
