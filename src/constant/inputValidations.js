import z from "zod";
import {
  newCourse,
  newCategory,
  newSession,
  newBlog,
  newLiMenu,
  newOffCode,
  newUser,
  loginAdmin,
  answerTicket,
  addOffOnAll,
} from "./index";
const newCoursValidations = z.object({
  [newCourse.name]: z.string().min("5", "طول فیلد حداقل 5"),
  [newCourse.description]: z.string().min("5", "طول فیلد حداقل 5"),
  [newCourse.price]: z.string(),
  [newCourse.shortName]: z.string().min("5", "طول فیلد حداقل 5"),
  [newCourse.status]: z.string(),
  [newCourse.categoryID]: z.string(),
  [newCourse.cover]: z.any(),
});
const newCategoryValidation = z.object({
  [newCategory.title]: z.string("مقدار معتبر نیست").min("5", "طول حدافل 5"),
  [newCategory.name]: z.string("مقدار معتبر نیست").min("5", "طول حدافل 5"),
});
const newSessionValidation = z.object({
  [newSession.title]: z.string("مقدار معتبر نیست").min("5", "طول حدافل 5"),
  [newSession.video]: z.any(),
  [newSession.free]: z.any(),
  [newSession.time]: z.string("مقدار معتبر نیست").min("1", "طول حدافل 1"),
  [newSession.courseId]: z.string("مقدار معتبر نیست"),
});
const newBlogValidation = z.object({
  [newBlog.cover]: z.any(),
  [newBlog.title]: z.any(),
  [newBlog.categoryID]: z.any(),
  [newBlog.description]: z.any(),
  [newBlog.shortName]: z.any(),
});
const newLiMenuValidation = z.object({
  [newLiMenu.title]: z.any(),
  [newLiMenu.href]: z.any(),
});
const newOffCodeValidation = z.object({
  [newOffCode.code]: z.any(),
  [newOffCode.percent]: z.any(),
  [newOffCode.course]: z.any(),
  [newOffCode.max]: z.any(),
});
const newUserValidation = z.object({
  [newUser.name]: z.string(),
  [newUser.email]: z.any(),
  [newUser.username]: z.any(),
  [newUser.confirmPassword]: z.any(),
  [newUser.password]: z.any(),
  [newUser.phone]: z.any(),
});
const addOffOnAllValidation = z.object({
  [addOffOnAll.discount]: z.string().min("1","متن تستی"),
});

// login form -- >
const loginValidation = z.object({
  [loginAdmin.identifier]: z.string(),
  [loginAdmin.password]: z.string(),
});
const answeValidation = z.object({
  [answerTicket.body]: z.string().min("1", "مقدار خالی هست"),
});
export {
  answeValidation,
  newCoursValidations,
  newCategoryValidation,
  newSessionValidation,
  newBlogValidation,
  newLiMenuValidation,
  newOffCodeValidation,
  newUserValidation,
  loginValidation,
  addOffOnAllValidation
};
