import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// Hook =========>>
import { useQuery } from "@tanstack/react-query";
// Form process module >>>>
import { newBlogValidation as schema } from "../../../constant";
import { newBlog } from "../../../constant";
// Components ====>>
import { TipTapEditor } from "../index";
import { InputWrapper, MuiButton } from "../../ui";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Form } from "../index";
// api and query ===== >
import { showResult } from "../../../utils";
import { queryKeys } from "../../../libs/reactQuery";
import { getAllCategories, postOneBlog } from "../../../api";
import { postOneDraft } from "../../../api";
import { AuthContext } from "../../../context";
export default function CreateBlogForm({ defaultForm }) {
  // state ================ >>
  const [isDraft, setIsDraft] = useState("create"); // while submiting this state help me to know is admin drafted or created a blog !
  const [htmlTemp, setHtmlTemp] = useState("");
  const isMount = useRef(true); // tracing lifeCycle !
  // hook ================= >>
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: getAllCategories, // get all categories because we need their ids to show -> dropDown input .
  });
  const authContext = useContext(AuthContext);

  // use-effect ================= >>
  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);

  // constant ================= >>

  const submited = async (data) => {
    console.log(data);
    const formData = new FormData();
    for (const arr of Object.entries(data)) {
      formData.append(arr[0], arr[1]);
    }
    formData.append(newBlog.body, htmlTemp);
    try {
      if (isDraft == "draft") {
        const res = await postOneDraft({
          headers: { Authorization: `Bearer ${authContext.adminToken}` },
          body: formData,
        });
      } else if (isDraft == "create") {
        await postOneBlog({
          body: formData,
          headers: { Authorization: `Bearer ${authContext.adminToken}` },
        });
      }
      if (isMount.current) {
        showResult({
          isError: false,
          successText: "موفق",
          errorText: "نا موفق",
          buttonText: "اوکی",
        });
      }
    } catch (err) {
      console.error(err + "________________");
      showResult({
        isError: true,
        errorText: "نا موفق",
        buttonText: "اوکی",
      });
    }
  };
  const TipaTapEditorWith = (props) => {
    const { field, manualSetValue } = props;
    return <TipTapEditor {...field} manualSetValue={manualSetValue} />;
  };

  const memoizedInputs = useMemo(() => {
    return [
      {
        type: "file",
        name: newBlog.cover,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <TextField label="کاور" variant="outlined" {...field} />
              }
            />
          );
        },
      },
      {
        type: "text",
        name: newBlog.title,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <TextField {...field} label="عنوان" variant="outlined" />
              }
            />
          );
        },
      },
      {
        type: "text",
        name: newBlog.description,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <TextField
                  {...field}
                  label="توضیحات"
                  multiline={true}
                  variant="outlined"
                />
              }
            />
          );
        },
      },
      {
        type: "text",
        name: newBlog.shortName,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <TextField
                  {...field}
                  label="نام کوتاه (shortName)"
                  variant="outlined"
                />
              }
            />
          );
        },
      },
      {
        type: null,
        name: newBlog.categoryID,
        InputComponent: (props) => {
          const { field } = props;
          return (
            <InputWrapper
              alertSection={props?.error || ""}
              inputComponenet={
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    دسته بندی
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="دسته بندی"
                    {...field}
                  >
                    {isLoading ? (
                      <MenuItem value={""}>{"loading..."}</MenuItem>
                    ) : isError ? (
                      <MenuItem value={""}>{"error"}</MenuItem>
                    ) : data.length ? (
                      data.map((item) => {
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
  });

  const setFormDefault = (setValue) => {
    // if we have this prop -> defaultForm : we set default value by using setValue() in a loop
    if (defaultForm) {
      for (const item of defaultForm) {
        setValue(item?.name, item?.value);
      }
    }
  };
  console.log(htmlTemp);

  return (
    <div className="container mt-6">
      <Form
        set={setFormDefault}
        inputs={memoizedInputs}
        schema={schema}
        onSubmit={submited}
        submitButton={<MuiButton type="submit">Submit</MuiButton>}
      />
      <TipTapEditor
        onChange={({ temp }) => {
          setHtmlTemp(temp);
        }}
      />

      <div style={{ direction: "ltr" }} className="w-fit">
        <ToggleButtonGroup
          color="primary"
          value={isDraft}
          exclusive
          onChange={(e) => setIsDraft(e.target.value)}
          aria-label="Platform"
        >
          <ToggleButton value="create">اپلود</ToggleButton>
          <ToggleButton value="draft">درفت کردن</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
