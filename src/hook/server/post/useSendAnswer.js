import { AuthContext } from "../../../context";
import { useContext } from "react";
export default function useSendAnswer() {
  const authContext = useContext(AuthContext);
  const sendAnswer = (answerInfo) => {
    return fetch("https://codelearn-backend.onrender.com/v1/contact/answer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authContext.adminToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerInfo),
    });
  };
  return { sendAnswer };
}
