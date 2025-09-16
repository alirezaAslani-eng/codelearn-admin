import React, { useEffect, useState } from "react";
const defProps = {
  zIndex: 10,
  className: "",
  onClick: () => {},
};
export default function BackCover(props) {
  const { zIndex, className, open, onClick } = { ...defProps, ...props };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(open);
  }, [open]);

  return (
    <>
      {isMounted && (
        <div
          onClick={() => {
            setIsMounted(false); // interval controling
            try {
              onClick();
            } catch (err) {
              console.log(err);
            }
          }}
          className={` w-full h-screen fixed top-0 left-0  ${className}`}
          style={{ zIndex: zIndex }}
        ></div>
      )}
    </>
  );
}
