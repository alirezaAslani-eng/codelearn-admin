import { queryClient } from "./index";
import { queryKeys } from "./index";
import {
  getAllSessions,
  getAllBlogs,
  getAllContacts,
  getAllCategories,
  getAllCourses,
  getAllUsers,
  getTopBarLies,
  getAllComments,
  getAllOffs,
} from "../../api";

const setQueryDefaults = () => {
  queryClient.setQueryDefaults(queryKeys.users.all, {
    staleTime: 20000,
    queryFn: getAllUsers,
  });
  queryClient.setQueryDefaults(queryKeys.courses.all, {
    staleTime: 20000,
    queryFn: getAllCourses,
  });
  queryClient.setQueryDefaults(queryKeys.categories.all, {
    staleTime: 20000,
    queryFn: getAllCategories,
  });
  queryClient.setQueryDefaults(queryKeys.contacts.all, {
    staleTime: 20000,
    queryFn: getAllContacts,
  });
  queryClient.setQueryDefaults(queryKeys.blogs.all, {
    staleTime: 20000,
    queryFn: getAllBlogs,
  });
  queryClient.setQueryDefaults(queryKeys.sessions.all, {
    staleTime: 20000,
    queryFn: getAllSessions,
  });
  queryClient.setQueryDefaults(queryKeys.topBarLies.all, {
    staleTime: 20000,
    queryFn: getTopBarLies,
  });
  queryClient.setQueryDefaults(queryKeys.comments.all, {
    staleTime: 20000,
    queryFn: getAllComments,
  });
  queryClient.setQueryDefaults(queryKeys.offs.all, {
    staleTime: 20000,
    queryFn: getAllOffs,
  });
};

export default setQueryDefaults;
