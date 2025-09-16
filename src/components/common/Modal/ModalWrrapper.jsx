import React, { useEffect, useState } from "react";
import BackCover from "../BackCover/BackCover";
const defProps = {
  actions: {
    open: false,
    onClose: () => {},
  },
  children: <></>,
  backCoverzIndex: 20,
  backCover: true,
};
export default function CenteredModal(props) {
  const { actions, children, backCover } = {
    ...defProps,
    ...props,
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(actions?.open || false);
  }, [actions?.open]);

  return (
    <>
      {isMounted && (
        <div
          onClick={() => {
            try {
              actions.onClose();
            } catch (err) {
              console.log(err);
            }
          }}
          className={`z-[500] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center ${
            backCover ? "bg-black/50" : "bg-transparent"
          }`}
        >
          {children}
        </div>
      )}
    </>
  );
}
