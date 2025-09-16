import React, { useContext } from "react";
// utils =========>>
// hook =======>>
import { useMutation, useQuery } from "@tanstack/react-query";
// Components ===>>
import { MuiButton, InputWrapper } from "../../ui";
import Swal from "sweetalert2";
// api section with ReactQuery ====== >
import { queryKeys } from "../../../libs/reactQuery";
import { postOneLiMenu } from "../../../api";
// Components / MUi ->

// constants =========>>
import {
  newLiMenuValidation as schema,
  newLiMenu as inputName,
} from "../../../constant";
import { AuthContext } from "../../../context";
import Form from "../Form/Form";

export default function CreateLiMenuForm({ parentId }) {
  // HOOKS ============================>
  const { mutateAsync: addLiMenu } = useMutation({
    mutationFn: postOneLiMenu,
  });
  const { refetch: refetchMenu } = useQuery({
    queryKey: queryKeys.topBarLies.all,
  });
  const authContext = useContext(AuthContext);
  // CONSTANTS ===============================>>

  const submited = async (form) => {
    try {
      await addLiMenu({
        headers: {
          Authorization: `Bearer ${authContext.adminToken}`,
          "Content-Type": "application/json",
        },
        body: { ...form, parent: parentId },
      });
      refetchMenu();
    } catch (err) {
      console.log(err);
    }
  };

  const inputs = [
    {
      type: "text",
      name: inputName.title,
      InputComponent: (props) => {
        const { field } = props;
        return (
          <InputWrapper
            inputComponenet={<input {...field} placeholder="title" />}
            alertSection={props?.error}
          />
        );
      },
    },
    {
      type: "text",
      name: inputName.href,
      InputComponent: (props) => {
        const { field } = props;
        return (
          <InputWrapper
            inputComponenet={<input {...field} placeholder="title" />}
            alertSection={props?.error}
          />
        );
      },
    },
  ];

  return (
    <Form
      inputs={inputs}
      onSubmit={submited}
      schema={schema}
      submitButton={
        <MuiButton variant="contained" type="submit">
          {"اپلود"}
        </MuiButton>
      }
    />
  );
}

// these tasks still are not completed :
// 1 . improving ui ux
// 2 . validating inputs by zod beside file input
