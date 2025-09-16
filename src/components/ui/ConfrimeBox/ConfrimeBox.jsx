import React, { useState } from "react";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
const defProps = {
  ButtonIcon: <DeleteRoundedIcon className="!text-xs" />,
};
export default function ({
  onRemove,
  buttonText = "حذف",
  buttonClassName = "danger_btn_theme xs_btn_size",
  ButtonIcon = defProps.ButtonIcon,
  disabled = false,
}) {
  const [ConfrimeBox, setConfrimeBox] = useState(false);
  const deleteButtonHandler = () => {
    try {
      onRemove();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center gap-x-2 ">
      {!ConfrimeBox && (
        <button
          disabled={disabled || false}
          onClick={() => setConfrimeBox(true)}
          className={buttonClassName || ""}
        >
          {buttonText}
          {ButtonIcon || ""}
        </button>
      )}
      {ConfrimeBox && (
        <div className="flex items-center gap-x-2 ">
          <button
            onClick={() => {
              setConfrimeBox(false);
              deleteButtonHandler();
            }}
            className="danger_text_color"
          >
            <TaskAltRoundedIcon />
          </button>
          <button
            onClick={() => setConfrimeBox(false)}
            className="success_text_color"
          >
            <DoDisturbAltRoundedIcon />
          </button>
        </div>
      )}
    </div>
  );
}
