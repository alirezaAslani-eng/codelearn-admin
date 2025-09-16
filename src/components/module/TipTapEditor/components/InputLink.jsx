import React from "react";
import { MuiButton } from "../../../ui";

export default function InputLink({
  onChange = () => {},
  onSubmit = () => {},
  value = "",
}) {
  const onChangeHandler = (e) => {
    try {
      onChange(e);
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmitHandler = () => {
    try {
      onSubmit();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex gap-x-2 w-full h-full">
      {/* Height problem === >>> ! !!!!!! */}
      <input
        onChange={onChangeHandler}
        value={value}
        className="w-full h-full"
        type="text"
      />
      <MuiButton
        onClick={() => {
          onSubmitHandler();
        }}
        variant="contained"
      >
        لینک
      </MuiButton>
    </div>
  );
}
