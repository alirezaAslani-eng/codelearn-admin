import Swal from "sweetalert2";
const showResult = ({
  isError,
  successText = "موفقیت آمیز",
  errorText = "مشکلی رخ داده",
  buttonText = "باشه",
} = {}) => {
  new Swal({
    title: `${isError ? errorText : successText}`,
    icon: `${isError ? "error" : "success"}`,
    confirmButtonText: buttonText,
  });
};
export default showResult;
// isError, successText, errorText, buttonText use them to handle a result modal
