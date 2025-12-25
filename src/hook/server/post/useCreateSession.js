import { cache, useContext } from "react";
import { AuthContext } from "../../../context";
import { useMutation } from "@tanstack/react-query";
import { postOneSession } from "../../../api";

export default function useCreateSession() {
  const authContext = useContext(AuthContext);
  const { mutateAsync } = useMutation({ mutationFn: postOneSession });
  const createSession = async (sessionInfo = {}, id = "") => {
    try {
      const x = await mutateAsync({
        headers: {
          Authorization: `Bearer ${authContext.adminToken}`,
          // multipart/form-data
        },
        body: sessionInfo,
        urlId: id,
      });
      console.log("cerate-session-res", x);
    } catch (err) {
      console.log(err);
    }
  };
  return { createSession };
}
