import React from "react";

export default function TinyTitle(props) {
  const { children, classNameParent="", classNameText="", classNameSolid="" } = props;
  return (
    <div className={`w-full relative ${classNameParent}`}>
      <p
        className={`secondary_box_color secondary_text_color inline-block mr-2 px-1.5 ${classNameText}`}
      >
        {children}
      </p>
      <div
        className={`w-full h-px absolute abs_center z-[-1] bg-secondary-dark/50 dark:bg-secondary-light/50 ${classNameSolid}`}
      ></div>
    </div>
  );
}
