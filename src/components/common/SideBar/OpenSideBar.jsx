import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { SideBarBtn, TinyTitle } from "../../ui";
import useSelectorNavLink from "../../../hook/useSelectorAnimate";
import { zIndexs } from "../../../constant";
import { items_sideBar } from "./items";

export default function OpenSideBar() {
  const [isSelectorShow, currentPosition, MoutedCompletly] =
    useSelectorNavLink(".active-menu");
  const [categories, setCategories] = useState([]);
  // ref
  useEffect(() => {
    const categoriesFromItems = new Set(
      items_sideBar?.map((item) => item?.categoryTitle)
    );
    setCategories([...categoriesFromItems]);
  }, []);
  useEffect(() => {
    if (!isSelectorShow) MoutedCompletly();
  }, [isSelectorShow]);

  return (
    <>
      <div
        className={`overflow-y-auto font-dana-md w-[240px] h-screen bg-secondary-light dark:bg-secondary-dark fixed z-[${zIndexs.SideBar}] top-0 right-0 `}
      >
        <div className=" w-full s_box_color h-[81px] sticky inset-0 z-[2] flex justify-center items-center">
          icon
        </div>
        <div className=" h-fit">
          {isSelectorShow && (
            <div
              style={{
                transform: `translateY(${currentPosition}px)`,
              }}
              className="absolute z-[-1] w-full flex justify-center transition-all top-0"
            >
              <div
                className="
                    w-[192px] 
                    h-[50px] 
                    rounded-[6px]  
                    after:absolute 
                    after:w-[4.5px] 
                    after:h-full 
                    after:right-0  
                    after:rounded-l-[4px]
                    after:bg-primary-light 
                    bg-primary-light
                    shadow-custom
                     shadow-primary-light/50
          "
              ></div>
            </div>
          )}
          {categories.map((categoryTitle) => {
            const childrenItem = items_sideBar.filter(
              (item) => item?.categoryTitle == categoryTitle
            );
            return (
              <>
                <div key={uuid()} className="my-2">
                  <TinyTitle>{categoryTitle}</TinyTitle>
                </div>
                {/* Children */}
                {childrenItem.map((item) => {
                  return (
                    <SideBarBtn
                      key={item.id}
                      onClick={item.method}
                      to={item.link}
                      text={item.text}
                      icon={item.icon}
                    />
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
      <div className={`w-[240px] h-screen`}></div>
    </>
  );
}
