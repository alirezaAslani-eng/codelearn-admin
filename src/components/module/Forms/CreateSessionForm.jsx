import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputWrapper, MuiButton } from "../../ui";
import { useQuery } from "@tanstack/react-query";
import { useCreateSession } from "../../../hook";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { newSession } from "../../../constant";
import { newSessionValidation as schema } from "../../../constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { showResult } from "../../../utils";
import { queryKeys } from "../../../libs/reactQuery";
import { getAllCourses } from "../../../api";
export default function CreateSessionForm() {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.courses.all,
    queryFn: getAllCourses,
  });
  // Api Section -- >
  const { createSession } = useCreateSession();
  // Form Handling -- >
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  // Submit -- >
  const submited = async (form) => {
    const formData = new FormData();
    formData.append("video", form.video[0]);
    formData.append("title", form.title);
    formData.append("time", form.time);
    formData.append("free", form.free ? "0" : "1 ");
    try {
      const res = await createSession(formData, form.courseId);
      showResult({
        // do i use try catch
        isError: !res.ok,
        successText: "موفق",
        errorText: "ناموفق",
        buttonText: "اوکی",
      });
    } catch (err) {
      console.log(res);
    }
  };
  // __________________________________!!!

  const inputs = {
    title: (
      <TextField
        {...register(newSession.title)}
        label="عنوان"
        variant="outlined"
        error={!!errors[newSession.title]}
      />
    ),
    video: (
      <Controller
        name={newSession.video}
        control={control}
        render={({ field }) => {
          return (
            <TextField
              onChange={(e) => field.onChange(e.target.files)}
              type="file"
              label="ویدیو"
              variant="outlined"
            />
          );
        }}
      />
    ),
    time: (
      <TextField
        {...register(newSession.time)}
        label="زمان"
        variant="outlined"
      />
    ),
    free: (
      <Controller
        name={newSession.free}
        control={control}
        render={({ field }) => {
          return (
            <Checkbox
              lable="privet or public"
              {...field}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          );
        }}
      />
    ),
    courseId: (
      <Controller
        name={newSession.courseId}
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
                {isLoading ? (
                  <MenuItem value={""}>{"loading..."}</MenuItem>
                ) : isError ? (
                  "error"
                ) : data.length ? (
                  data.map((item) => {
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
  return (
    <form
      className="font-dana-md s_text_color"
      onSubmit={handleSubmit(submited)}
    >
      <InputWrapper
        inputComponenet={inputs.title}
        alertSection={errors[newSession.title]?.message}
      />
      <InputWrapper
        inputComponenet={inputs.time}
        alertSection={errors[newSession.time]?.message}
      />
      <InputWrapper
        inputComponenet={
          <div className="w-fit flex items-center">
            {inputs.free}
            {"پولی"}
          </div>
        }
        alertSection={errors[newSession.free]?.message}
      />
      <InputWrapper
        inputComponenet={inputs.video}
        alertSection={errors[newSession.video]?.message}
      />
      <InputWrapper
        inputComponenet={inputs.courseId}
        alertSection={errors[newSession.courseId]?.message}
      />
      <MuiButton type="submit " variant="contained">
        آپلود
      </MuiButton>
    </form>
  );
}
