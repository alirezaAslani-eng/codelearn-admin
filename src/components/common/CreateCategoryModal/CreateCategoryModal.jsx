import React from "react";
import { CreateCategoryForm } from "../../module";

// NOTIC >>> CreateCategoryModal also can edit category  .
// THIS componenet is not usable an another project !!!!
export default function CreateCategoryModal({
  onClose = () => {},
  isEditOrCreate = "create", // required >> "edit" or "delete" for this prop <<<
  categoryInfo = { title: "", name: "" }, // if isEditOrCreate is edit you have to send this prop
  title = "",
}) {
  return (
    <div className="w-[300px] p-5 bg-secondary-light dark:bg-secondary-dark abs-center font-dana-md rounded-xl">
      <span>{title}</span>
      <CreateCategoryForm
        categoryInfo={categoryInfo}
        isEditOrCreate={isEditOrCreate}
        onResponse={() => onClose()}
      />
    </div>
  );
}
