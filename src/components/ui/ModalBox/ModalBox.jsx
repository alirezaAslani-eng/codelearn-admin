import React from "react";

export default function ModalBox({
  accept = () => {},
  reject = () => {},
  rejectText = "reject",
  acceptText = "accept",
  title = "",
}) {
  return (
    <div
      className="
    p-5
    flex 
    items-center 
    justify-center 
    flex-col 
    bg-secondary-light 
    dark:bg-secondary-dark 
    shadow-custom 
    shadow-primary-light/5
    w-[350px]
    h-[200px]
    abs-center
    "
    >
      <div className="space-y-6">
        <p className="text-center font-peyda-md">{title} </p>
        <div className="flex items-center justify-center gap-4">
          <button className="bg-success-light" onClick={reject}>
            {rejectText}
          </button>
          <button className="bg-danger-light" onClick={accept}>
            {acceptText}
          </button>
        </div>
      </div>
    </div>
  );
}
