import React, { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postOneOffCode } from "../../../api";
import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
// Form config -- >
import {
  newOffCode as inputNames,
  newOffCodeValidation as schema,
} from "../../../constant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputWrapper, MuiButton } from "../../ui";
import { AuthContext } from "../../../context";
import { showResult } from "../../../utils";
import { queryKeys } from "../../../libs/reactQuery";
export default function CreateOffCodeForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    isSubmiting,
  } = useForm({ resolver: zodResolver(schema) });
  
  // access to this query cache to get properties  (id and title) for dropDown input
  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useQuery({ queryKey: queryKeys.courses.all });

  const authContext = useContext(AuthContext);

  const inputs = {
    code: (
      <TextField
        {...register(inputNames.code)}
        label="کد تخفیف"
        variant="outlined"
        error={!!errors[inputNames.code]}
      />
    ),
    percent: (
      <TextField
        {...register(inputNames.percent)}
        label="درصد تخفیف"
        variant="outlined"
        error={!!errors[inputNames.percent]}
      />
    ),
    max: (
      <TextField
        {...register(inputNames.max)}
        label="برای چند کاربر"
        variant="outlined"
        error={!!errors[inputNames.max]}
      />
    ),
    course: (
      <Controller
        name={inputNames.course}
        control={control}
        render={({ field }) => {
          return (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                برا کدوم دوره میخوای
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                label="دسته بندی"
                value={field.value ?? ""}
              >
                {coursesLoading ? (
                  <MenuItem value={""}>{"loading..."}</MenuItem>
                ) : coursesError ? (
                  "error"
                ) : courses.length ? (
                  courses.map((item) => {
                    return (
                      <MenuItem key={item?._id} value={item?._id}>
                        {item?.name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value={""}>{"no-options"}</MenuItem>
                )}
              </Select>
            </FormControl>
          );
        }}
      />
    ),
  };

  const submited = async (form) => {
    try {
      await postOneOffCode({
        body: form,
        headers: { Authorization: `Bearer ${authContext.adminToken}` },
      });
      refetchOffs();
      showResult({
        isError: false,
        successText: "success",
        errorText: "error",
        buttonText: "ok",
      });
    } catch (err) {
      showResult({
        isError: true,
        successText: "error",
        errorText: "error",
        buttonText: "ok",
      });
    }
  };

  return (
    <div>
      <fieldset disabled={isSubmiting}>
        <form onSubmit={handleSubmit(submited)}>
          <InputWrapper
            inputComponenet={inputs.code}
            alertSection={errors[inputNames.code]?.message}
          />
          <InputWrapper
            inputComponenet={inputs.course}
            alertSection={errors[inputNames.course]?.message}
          />
          <InputWrapper
            inputComponenet={inputs.percent}
            alertSection={errors[inputNames.percent]?.message}
          />
          <InputWrapper
            inputComponenet={inputs.max}
            alertSection={errors[inputNames.max]?.message}
          />
          <MuiButton type="onsubmit">Save</MuiButton>
        </form>
      </fieldset>
    </div>
  );
}
