import { TextField } from "@mui/material";
// component >>>>>>>>
import { InputWrapper, MuiButton } from "../../ui";
// hook >>>>>>>
import { useQuery } from "@tanstack/react-query";
import { useCreateCategory, useEditCategory } from "../../../hook";
/// constant >>>>>>>>>
import {
  newCategory as inputName,
  newCategoryValidation as schema,
} from "../../../constant";
import Swal from "sweetalert2";
import { Form } from "../index";
// NOTIC >>> CreateCategoryModal also can edit category

export default function CreateCategoryForm({
  onResponse = () => {},
  isEditOrCreate = "create", // required >> "edit" or "delete" for this prop <<<
  categoryInfo = "", // if (isEditOrCreate) will be "edit" you have to send this prop
}) {
  // hook === >

  const { refetch } = useQuery({ queryKey: ["categories"] });
  const { createCategory } = useCreateCategory();
  const { editCategory } = useEditCategory();

  // method =====>
  const submited = async (formData) => {
    if (isEditOrCreate == "create") {
      const res = await createCategory(formData);
      onResponse();
      if (res.ok) {
        refetch();
      } else {
        new Swal({ icon: "error", confirmButtonText: "باشه" });
      }
    } else if (isEditOrCreate == "edit") {
      const res = await editCategory(categoryInfo?.id, formData);
      onResponse();
      if (res.ok) {
        refetch();
      } else {
        new Swal({ icon: "error", confirmButtonText: "باشه" });
      }
    } else {
      console.warn(
        "prop (isEditOrCreate) is invalid because valid value is string:(isEditOrCreate=Fcreate) string:(isEditOrCreate=delete) "
      );
    }
  };

  return (
    <>
      <div className="font-dana-md">
        <Form
          schema={schema}
          onSubmit={submited}
          submitButton={<MuiButton type="submit">Submit</MuiButton>}
          inputs={[
            {
              type: "text",
              name: inputName.title,
              InputComponent: (props) => {
                const { field } = props;
                return (
                  <InputWrapper
                    inputComponenet={
                      <TextField
                        {...field}
                        sx={{ width: "100%" }}
                        error={!!props?.error}
                        label="نام برای نمایش در سایت"
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
                        sx={{ width: "100%" }}
                        error={!!props?.error}
                        label="نام دسته بندی به انگلیسی"
                        variant="outlined"
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
    </>
  );
}
