
function themeHandler(theme = "dark") {
  localStorage.setItem("theme", theme);
  document.querySelector("html").setAttribute("class", theme);
}
function initialSetTheme() {
  const localstorage_theme = localStorage.getItem("theme");
  if (localstorage_theme) {
    localStorage.setItem("theme", localstorage_theme);
  } else {
    localStorage.setItem("theme", "dark");
  }
  document.querySelector("html").setAttribute("class", localstorage_theme);
}
export { themeHandler, initialSetTheme };
