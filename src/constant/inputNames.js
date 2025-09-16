const newCourse = {
  // body
  name: "name",
  cover: "cover",
  description: "description",
  shortName: "shortName",
  price: "price",
  status: "status",
  categoryID: "categoryID",
};
const newSession = {
  // body
  video: "video",
  title: "title",
  time: "time",
  free: "free",
  // parametr
  courseId: "courseId", // as a parametr to -> /v1/courses/{courseId}/sessions
};
const newCategory = {
  // body
  title: "title",
  name: "name",
};
const newBlog = {
  // body of request :
  cover: "cover",
  body: "body",
  title: "title",
  description: "description",

  shortName: "shortName",
  categoryID: "categoryID",
};
const newLiMenu = {
  // body of request :
  title: "title",
  href: "href",
};
const newOffCode = {
  // body of request :
  code: "code",
  percent: "percent",
  course: "course",
  max: "max",
};
const newUser = {
  username: "username",
  email: "email",
  password: "password",
  confirmPassword: "confirmPassword",
  name: "name",
  phone: "phone",
};
const loginAdmin = {
  identifier: "identifier",
  password: "password",
};
const answerTicket = {
  body: "body",
};
const addOffOnAll = {
  discount: "discount",
};
export {
  addOffOnAll,
  answerTicket,
  newCourse,
  newSession,
  newCategory,
  newBlog,
  newLiMenu,
  newOffCode,
  newUser,
  loginAdmin,
};
