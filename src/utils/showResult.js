import Swal from "sweetalert2";
const showResult = (props) => {
  const { isError, successText="", errorText="", buttonText="" } = props;
  new Swal({
    title: `${isError ? errorText : successText}`,
    icon: `${isError ? "error" : "success"}`,
    confirmButtonText: buttonText,
  });
};
export default showResult;
// isError, successText, errorText, buttonText use them to handle a result modal
