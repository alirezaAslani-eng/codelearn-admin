import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// slider v1 :  docs ->

// if you want to use this hook please read :

// first of all you have to send a valid className from your <sliderElement /> because this hook always use (document.querySelector(className)) to get the element position !
// and your elements shoud be in a parent like div or whatever which doesn't scroll and doesn't have static position !
// in general your parent shoud not have static position and shoud not have a action like scrolling !!!

// Example :
// <div className="parent (relative / absolute / fixed)">
// <div className="slider"></div>
// your buttons ...
// </div>
export default function useSelectorNavLink(className) {
  const [currentPosition, setPosition] = useState();
  const [isSelectorShow, setSelectorIsShow] = useState(false);
  const [reWakeUp, setReWakeUp] = useState(false); // this state can be use when your render process not sync with this hook cause it uses document.querySelector !
  const location = useLocation();
  const MountedCompletly = () => {
    setReWakeUp(true); // when your DOM is completly mounted
  };
  useEffect(() => {
    let el = document.querySelector(className);
    if (el) {
      setPosition(el?.offsetTop || "0");
      setSelectorIsShow(true);
    } else {
      setSelectorIsShow(false);
    }
    return () => {
      el = null;
    };
  }, [location.pathname, reWakeUp]);

  return [isSelectorShow, currentPosition, MountedCompletly];
}
// MountedCompletly : when your DOM mounting is not sync with (document.querySelector(className);) you can use this method at end of the jsx
