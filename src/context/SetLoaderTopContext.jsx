import React from "react";

export default function SetLoaderTopContext() {
                
  return (
    <>
      <div>
        <Portal container={"body"}>
          <div className="absolute z-[999] w-full h-4 bg-primary-light shadow-custom shadow-primary-light"></div>
        </Portal>
      </div>
    </>
  );
}
