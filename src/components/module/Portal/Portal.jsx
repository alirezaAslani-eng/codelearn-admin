import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
// How to use ?????
// you just send these props >>
// (container) it shoud be a string like -> tag "body" id "#elemnt" class ".element"
// and children is your element or content that you want to put them in your container
export default function Portal({ container, children }) {
  // console.log(container);
  const [rePort, setReProt] = useState(false);
  const elRef = useRef(null);
  const [hasElement, setHasElement] = useState(false);
  useEffect(() => {
    try {
      setReProt((prev) => !prev); // to rerender .
      const containerElement = document.querySelector(container);
      if (containerElement) {
        const result = createPortal(<>{children}</>, containerElement);
        elRef.current = result;
        if (elRef.current) setHasElement(true);
      }
    } catch (err) {
      console.warn(err);
    }
  }, [children, container]);
  if (hasElement) return <>{elRef.current}</>;
}
