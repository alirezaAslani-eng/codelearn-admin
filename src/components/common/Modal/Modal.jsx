import React from "react";

export default function Modal({children}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-full h-full"
    >
      {children}
    </div>
  );
}
