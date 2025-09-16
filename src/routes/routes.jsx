import {
  Categories,
  Home,
  NewCourse,
  Notifications,
  UploadedCourses,
  UserInfo,
  Users,
  Contact,
  UploadedBlogs,
  NewUser,
  NewBlog,
  NewSession,
  UploadedSessions,
  Comments,
  OffCodes,
  UserTickets,
} from "../pages";
// Context -- >
import { SessionActionsProvider } from "../context";
// container -- >
import {
  
  UiSectionContiner,
} from "../container/pageContiner";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/users", element: <Users /> },
  { path: "/user-info", element: <UserInfo /> },
  { path: "/notif", element: <Notifications /> },
  { path: "/add-user", element: <NewUser /> },
  { path: "/add-blog", element: <NewBlog /> },
  { path: "/add-course", element: <NewCourse /> },
  { path: "/add-session", element: <NewSession /> },
  { path: "/up-courses", element: <UploadedCourses /> },
  {
    path: "/add-off-code",
    element: <OffCodes />,
  },
  {
    path: "/add-off-all",
    element: <OffCodes />,
  },
  {
    path: "/up-sessions",
    element: (
      <SessionActionsProvider>
        <UploadedSessions />
      </SessionActionsProvider>
    ),
  },
  { path: "/up-blogs", element: <UploadedBlogs /> },
  { path: "/categories", element: <Categories /> },
  { path: "/contact", element: <Contact /> },
  { path: "/web-details", element: <UiSectionContiner /> },
  { path: "/up-comments", element: <Comments /> },
  { path: "/user-tickets", element: <UserTickets /> },
];
export { routes };
