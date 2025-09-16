import React, { useContext } from "react";
import Form from "../Form/Form";
import { TextField } from "@mui/material";
import { InputWrapper } from "../../ui";
import {
  loginAdmin as inputName,
  loginValidation as schema,
} from "../../../constant";
import { getAdminInfo, postLoginAdmin } from "../../../api";
import { AuthContext } from "../../../context";
export default function LoginForm() {
  
  const authContext = useContext(AuthContext);

  const submited = async (form) => {
    try {
      const adminToken = await postLoginAdmin({ body: form });
      const adminInfo = await getAdminInfo({
        headers: { Authorization: `Bearer ${adminToken?.accessToken}` },
      });
      authContext.login(adminInfo, adminToken?.accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form
        schema={schema}
        onSubmit={submited}
        submitButton={<button className="bg-red-300">Login</button>}
        inputs={[
          {
            type: "text",
            name: inputName.identifier,
            InputComponent: (props) => {
              const { field } = props;
              return (
                <InputWrapper
                  inputComponenet={
                    <TextField
                      error={!!props?.error}
                      {...field}
                      label="Email"
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
                      error={!!props?.error}
                      {...field}
                      label="Email"
                    />
                  }
                  alertSection={props?.error || ""}
                />
              );
            },
          },
        ]}
      />
    </div>
  );
}
