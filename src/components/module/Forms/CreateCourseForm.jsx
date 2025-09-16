import React, { useMemo } from "react";

// utils =========>>
import { showResult } from "../../../utils";
// hook =======>>
import { useCreateCourse } from "../../../hook";
import { useQuery } from "@tanstack/react-query";
// Components ===>>
import { MuiButton, InputWrapper } from "../../ui";
// api section with ReactQuery ====== >
import { queryKeys } from "../../../libs/reactQuery";
import { getAllCategories } from "../../../api";
// Components / MUi ->
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
// constants =========>>
import {
  newCoursValidations as schema,
  newCourse as inputName,
} from "../../../constant";
import { Form } from "../index";
// finish import process -------------------------------------------- <<
export default function CreateCourseForm() {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: queryKeys.courses.all,
    queryFn: getAllCategories,
  });

  const { createCourse } = useCreateCourse();

  // Method ============= >>
  const submited = async (data) => {
    const entriesdData = [...Object.entries(data)];
    // go to >> formData
    const formData = new FormData();
    for (const arr of entriesdData) {
      formData.append(arr[0], arr[1]);
    }
    // get from formData and start request <<
    const res = await createCourse(formData);
    showResult({
      isError: !res.ok,
      successText: "success",
      errorText: "error",
      buttonText: "باشه",
    });
  };
  // __________________________________________________<<

  // CONSTANTS ===============================>>

  const memoizedInput = useMemo(() => {
    return [
      {
        type: "text",
        name: inputName.name,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <TextField
                  error={!!props?.error}
                  {...field}
                  label="عنوان دوره"
                  variant="outlined"
                  
                />
              }
            />
          );
        },
      },

      {
        type: "file",
        name: inputName.cover,
        InputComponent: (props) => {
          const { field } = props;

          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <TextField
                  {...field}
                  error={!!props?.error}
                  label="کاور دوره"
                  variant="outlined"
                />
              }
            />
          );
        },
      },
      {
        type: "text",
        name: inputName.description,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <TextField
                  error={!!props?.error}
                  {...field}
                  label="توضیحات دوره"
                  variant="outlined"
                  multiline={true}
                  maxRows={4}
                />
              }
            />
          );
        },
      },

      {
        type: "text",
        name: inputName.shortName,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <TextField
                  error={!!props?.error}
                  {...field}
                  label="نام کوتاه (ShortName)"
                  variant="outlined"
                />
              }
            />
          );
        },
      },

      {
        type: "text",
        name: inputName.price,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <TextField
                  error={!!props?.error}
                  {...field}
                  label="قیمت"
                  variant="outlined"
                />
              }
            />
          );
        },
      },
      {
        type: null,
        name: inputName.status,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <FormControl error={!!props?.error}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    وضعیت فعلی
                  </FormLabel>
                  <RadioGroup
                    {...field}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="start"
                      control={<Radio />}
                      label="کامل شده"
                    />
                    <FormControlLabel
                      value="presell"
                      control={<Radio />}
                      label="هنوز کار داره"
                    />
                  </RadioGroup>
                </FormControl>
              }
            />
          );
        },
      },

      {
        type: "text",
        name: inputName.categoryID,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <FormControl fullWidth error={!!props?.error}>
                  <InputLabel id="demo-simple-select-label">
                    دسته بندی
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    label="دسته بندی"
                  >
                    {categoriesLoading ? (
                      <MenuItem value={""}>{"loading..."}</MenuItem>
                    ) : categories?.length ? (
                      categories.map((item) => {
                        return (
                          <MenuItem key={item?._id} value={item?._id}>
                            {item?.title}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem value={""}>{"no-options"}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              }
            />
          );
        },
      },
    ];
  }, [categoriesLoading, categories]);

  return (
    <Form
      schema={schema}
      onSubmit={submited}
      submitButton={
        <MuiButton variant="contained" type="submit">
          {"اپلود"}
        </MuiButton>
      }
      inputs={memoizedInput}
    />
  );
}

// these tasks still are not completed :
// 1 . improving ui ux
// 2 . validating inputs by zod beside file input
