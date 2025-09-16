import React, { useState } from "react";
import OpenSideBar from "./OpenSideBar";
import CloseSideBar from "./CloseSideBar";
import { Portal } from "../../module";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";

export default function SideBar() {
  const [isShow, setIsShow] = useState(true);
  return (
    <>
      <Portal container={"#close-menu"}>
        {isShow && (
          <MenuRoundedIcon
            onClick={() => setIsShow(false)}
            className="text-text-dark/90 dark:text-text-light/90 cursor-pointer"
          />
        )}
      </Portal>
      <Portal container={"#open-menu"}>
        <MenuOpenRoundedIcon
          onClick={() => setIsShow(true)}
          className="text-text-dark/90 dark:text-text-light/90 cursor-pointer"
        />
      </Portal>

      {isShow ? <OpenSideBar /> : <CloseSideBar />}
    </>
  );
}
