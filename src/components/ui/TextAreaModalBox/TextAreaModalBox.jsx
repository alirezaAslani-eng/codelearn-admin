import React, { useState } from "react";
import MuiButton from "../Buttons/MuiButton";
// important Features of  TextAreaModalBox are when onAccept is run you can get a parametr as value
export default function TextArea({
  onClose = () => {},
  onAccept = (value) => {},
  title = "",
  acceptTextButton = "تایید",
  rejectTextButton = "لغو",
}) {
  const [value, setValue] = useState("");
  const accepted = (e) => {
    e.preventDefault();
    try {
      onAccept(value);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className=" 
          abs_center 
          p_border 
          s_box_color 
          p-3
          w-[80%] 
          h-[200px]
          flex
          flex-col 
          rounded-xl "
    >
      <div>
        <textarea
          className="b_box_color s_shadow s_shadow_color s_text_color p-3 w-full max-h-[120px] min-h-[120px] rounded-xl outline-none"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        ></textarea>
      </div>
      <div className="flex justify-start items-center gap-x-2 h-full ">
        <MuiButton onClick={accepted} variant="contained">
          {acceptTextButton}
        </MuiButton>

        <MuiButton
          onClick={() => {
            try {
              onClose();
            } catch (err) {
              console.error(err);
            }
          }}
          color="error"
        >
          {rejectTextButton}
        </MuiButton>
      </div>
    </div>
  );
}
