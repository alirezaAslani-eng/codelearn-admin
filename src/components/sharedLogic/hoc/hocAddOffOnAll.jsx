import { useMutation } from "@tanstack/react-query";
import postOneOffOnAll from "../../../api/post/postOneOffOnAll";
import {
  addOffOnAll as inputName,
  addOffOnAllValidation,
} from "../../../constant";
import { memo } from "react";
function hocAddOffOnAll(Component) {
  function WithLogic(props) {
    const {
      mutate,
      isPending: pendingWhileAddOff,
      isError,
      isSuccess,
    } = useMutation({ mutationFn: postOneOffOnAll });

    const submiter = (form) => {
      mutate({ body: form });
    };
    return (
      <Component
        {...props}
        // input requierments
        name={inputName.discount}
        schema={addOffOnAllValidation}
        // state
        isPending={pendingWhileAddOff}
        isError={isError}
        isSuccess={isSuccess}
        // Events
        onSubmit={submiter}
      />
    );
  }
  return memo(WithLogic);
}

export default hocAddOffOnAll;
