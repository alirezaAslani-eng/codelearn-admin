import React, { useContext, useState } from "react";
import VideoChatRoundedIcon from "@mui/icons-material/VideoChatRounded";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
const defProps = {
  data: {},
  actions: {},
};
function SessionBox({ data = defProps.data, actions = defProps.actions }) {
  const { title = "no prop", time = "no prop", index = "1", _id = "" } = data;
  const { deleteAction = () => {} } = actions;
  // console.log(actions);

  // States ===>>
  const [ConfrimeBox, setConfrimeBox] = useState(false);

  // button methods == >
  const deleteButtonHandler = (value = "") => {
    try {
      deleteAction(value);
    } catch (err) {
      console.log(err);
    }
  };
  const editButtonHandler = () => {};

  return (
    <div className=" cursor-pointer group ">
      <div className="flex items-center justify-between font-dana-md py-3 px-3 rounded-md bg-background-light dark:bg-background-dark ">
        <aside className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-2 text-text-dark/90 dark:text-text-light/90">
            <div className="w-5">{index}</div>
            <VideoChatRoundedIcon />
            {title}
          </div>
          <div className="flex items-center gap-x-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all">
            <button className="primary_btn_theme xs_btn_size">
              ویرایش
              <ModeEditRoundedIcon className="!text-xs" />
            </button>
            {!ConfrimeBox && (
              <button
                onClick={() => setConfrimeBox(true)}
                className="danger_btn_theme xs_btn_size"
              >
                حذف
                <DeleteRoundedIcon className="!text-xs" />
              </button>
            )}
            {ConfrimeBox && (
              <div className="flex items-center gap-x-2 ">
                <button
                  onClick={() => {
                    setConfrimeBox(false);
                    deleteButtonHandler(_id || "");
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
            <div id={`_${_id || ""}`}>
              {/* Loading component will be here from SessionContext.jsx for delete action */}
            </div>
          </div>
        </aside>
        <aside>
          <span className="text-primary-light">{time || ""}</span>
        </aside>
      </div>
    </div>
  );
}

export default React.memo(SessionBox);
