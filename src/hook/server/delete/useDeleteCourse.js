import { useContext } from "react";
import { AuthContext } from "../../../context";

// usedeleteCourse hook >>
export default function useDeleteCourse() {
  // use context to send Authorization >>
  const authContext = useContext(AuthContext);
  // main method to delete a course by courseId >>
  const deleteCourse = (id) => {
    const res = fetch(`https://alireza-eng.ir/v1/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authContext.adminToken}`,
      },
    });
    return res;
  };
  return { deleteCourse };
}
