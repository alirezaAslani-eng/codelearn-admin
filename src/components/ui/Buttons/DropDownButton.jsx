import { Menu } from "@mui/material";
import React, { useState } from "react";
import { MenuBox } from "../../common";

export default function DropDownButton({
  buttonClassName = "success_btn_theme p-2 rounded-full",
  butoonChildren = <p>button</p>,
  menuChildren = <p>menu children</p>,
}) {
  const [isOpen, setOpen] = useState(null);
  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`relative ${buttonClassName}`}
      >
        {butoonChildren}
        {isOpen && (
          <MenuBox backCover={false} zIndex={5}>
            {menuChildren}
          </MenuBox>
        )}
      </button>
    </div>
  );
}
