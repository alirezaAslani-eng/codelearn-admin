import { useContext } from "react";
import { AuthContext } from "../../../context";

// useDeleteUser hook >>
export default function useEditCategory() {
  // use context to send Authorization >>
  const authContext = useContext(AuthContext);
  // main method to edit a category by CategoryInfo and it's id >>
  const editCategory = (id, categoryInfo) => {
    const res = fetch(`https://alireza-eng.ir/v1/category/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authContext.adminToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryInfo),
    });
    return res;
  };
  return { editCategory };
}
