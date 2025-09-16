import { TextField } from "@mui/material";
import React, { useMemo } from "react";
import { InputWrapper, MuiButton } from "../../ui";
import { useCreateUser } from "../../../hook";
import Swal from "sweetalert2";
import { Form } from "../index";
import {
  newUser as inputName,
  newUserValidation as schema,
} from "../../../constant";
export default function NewUser() {
  const { createUser } = useCreateUser();

  const inputs = useMemo(
    () => [
      {
        type: "text",
        name: inputName.username,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              inputComponenet={
                <TextField
                  {...field}
                  error={!!props?.error}
                  label="نام کاربری"
                  variant="outlined"
                />
              }
              alertSection={props?.error || ""}
            />
          );
        },
      },
      {
        type: "text",
        name: inputName.name,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              inputComponenet={
                <TextField
                  {...field}
                  error={!!props?.error}
                  label="نام کامل"
                  variant="outlined"
                />
              }
              alertSection={props?.error || ""}
            />
          );
        },
      },
      {
        type: "text",
        name: inputName.email,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              inputComponenet={
                <TextField
                  {...field}
                  error={!!props?.error}
                  label="ایمیل"
                  variant="outlined"
                />
              }
              alertSection={props?.error || ""}
            />
          );
        },
      },
      {
        type: "text",
        name: inputName.password,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              inputComponenet={
                <TextField
                  {...field}
                  error={!!props?.error}
                  label="رمز"
                  variant="outlined"
                />
              }
              alertSection={props?.error || ""}
            />
          );
        },
      },
      {
        type: "text",
        name: inputName.confirmPassword,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              inputComponenet={
                <TextField
                  {...field}
                  error={!!props?.error}
                  label="تکرار رمز"
                  variant="outlined"
                />
              }
              alertSection={props?.error || ""}
            />
          );
        },
      },
      {
        type: "text",
        name: inputName.phone,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              inputComponenet={
                <TextField
                  {...field}
                  error={!!props?.error}
                  label="شماره تلفن"
                  variant="outlined"
                />
              }
              alertSection={props?.error || ""}
            />
          );
        },
      },
    ],
    []
  );

  const submited = async (form) => {
    const res = await createUser(form);
    const jsonResponse = await res.json();
    if (res.ok) {
      new Swal({ icon: "success", confirmButtonText: "باشه" });
    } else {
      // Show resoponse error on Swal >>
      new Swal({
        title: jsonResponse?.message || jsonResponse,
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  return (
    <div>
      <Form
        formTagClassName="grid grid-cols-2 gap-x-4 mt-4 font-dana-md"
        onSubmit={submited}
        schema={schema}
        submitButton={
          <MuiButton type="submit" size={"large"} variant={"contained"}>
            ثبت کاربر
          </MuiButton>
        }
        inputs={inputs}
      />
    </div>
  );
}
// this page shoud refactor to use hook from <<
