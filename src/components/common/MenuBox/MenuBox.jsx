import React from "react";
// utils
import { Portal } from "../../module";
// components
import { BackCover } from "../index";

export default function MenuBox({
  children,
  width = "300px",
  height = "fit-content",
  zIndex = 20,
  zIndex_backcover = 5,
  onClose,
  backCover = true,
  className,
  position = "absolute",
}) {
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: width,
          height: height,
          zIndex: zIndex,
          position: position,
        }}
        className={`${className} rounded-lg p-3 shadow bg-secondary-light dark:bg-secondary-dark`}
      >
        {children}
      </div>
      {backCover && (
        <Portal container={"body"}>
          <BackCover zIndex={zIndex_backcover} onClick={onClose} />
        </Portal>
      )}
    </>
  );
}
