import React from "react";

export default function TitleWithEffect({ text }) {
  return (
    <div className="relative p-2 w-fit">
      <div className="w-5 h-5  border-t-2 border-r-2 border-primary-light absolute top-0 right-0"></div>
      <div className="w-5 h-5  border-b-2 border-l-2 border-primary-light absolute bottom-0 left-0"></div>
      <p>{text}</p>
    </div>
  );
}
