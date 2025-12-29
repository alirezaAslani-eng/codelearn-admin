import { useContext } from "react";
import { AuthContext } from "../../../context";

export default function useCreateCourse() {
  const authContext = useContext(AuthContext);
  const createCourse = (courseInfo = {}) => {
    return fetch("https://alireza-eng.ir/v1/courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authContext.adminToken}`,
      },
      body: courseInfo,
    });
  };
  return { createCourse };
}
