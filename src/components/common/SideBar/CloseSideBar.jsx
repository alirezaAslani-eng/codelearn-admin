import React, { useEffect, useRef, useState } from "react";
import { SideBarBtn } from "../../ui";
import useSelectorNavLink from "../../../hook/useSelectorAnimate";
import { NavLink } from "react-router-dom";
import { zIndexs } from "../../../constant";
import { items_sideBar } from "./items";
export default function CloseSideBar() {
  const [categories, setCategories] = useState([]);
  const [isSelectorShow, currentPosition, mountedCompletly] =
    useSelectorNavLink(".active-menu");
  useEffect(() => {
    const categoriesFromItems = new Set(
      items_sideBar?.map((item) => item?.categoryTitle)
    );
    setCategories([...categoriesFromItems]);
  }, []);
  useEffect(() => {
    if (!isSelectorShow) mountedCompletly(true);
  }, [isSelectorShow]);

  return (
    <>
      <div
        className={`overflow-y-auto w-[86px] h-screen bg-secondary-light dark:bg-secondary-dark fixed z-[${zIndexs.SideBar}] top-0 right-0`}
      >
        <div
          id="open-menu"
          className="h-20 w-full flex justify-center items-center sticky inset-0 z-[2] s_box_color"
        >
          {/* here , there is an element from portal dont remove id ! */}
        </div>
        <div className="relative">
          {isSelectorShow && (
            <div
              style={{ transform: `translateY(${currentPosition}px)` }}
              className="absolute z-[-1] w-full flex justify-center transition-all top-0"
            >
              <div
                className=" 
          h-[50px] 
          rounded-[6px]  
          after:absolute 
          after:w-[4px] 
          after:h-full 
          after:right-0  
          after:rounded-l-[4px]
          after:bg-primary-light 
          "
              ></div>
            </div>
          )}

          {categories.map((categoryTitle) => {
            const childrenItems = items_sideBar.filter((item) => {
              return item.categoryTitle == categoryTitle;
            });
            return (
              <>
                {childrenItems.map((item) => {
                  return (
                    <>
                      <NavLink
                        key={item.id}
                        onClick={item.method}
                        to={item.link}
                        className={({ isActive }) => {
                          return `transition-all  ${
                            isActive
                              ? "active-menu text-primary-light"
                              : "text-text-dark/80 dark:text-text-light/80"
                          }`;
                        }}
                      >
                        <div className=" group h-[52px] w-full flex items-center justify-center">
                          <span className=" group-[]:hover:scale-95 group-[]:active:scale-90 transition-all">
                            {item.icon}
                          </span>
                        </div>
                      </NavLink>
                    </>
                  );
                })}
                {/* <div className="w-full h-px bg-secondary-dark/50 dark:bg-secondary-light/50 my-2"></div> */}
              </>
            );
          })}
        </div>
      </div>
      <div className={`w-[86px] h-screen bg-amber-300`}></div>
    </>
  );
}
