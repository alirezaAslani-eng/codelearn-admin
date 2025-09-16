// componenet version is 1.0 :)
import React, { useEffect, useMemo, useState } from "react";
import { Accordion } from "../../ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useFuseSearch } from "../../../hook";
const defaultProp = {
  data: [],
  childrenActions: {},
  title: "",
  keys: [],
  ComponentCildrens: () => {
    return <span>Component</span>;
  },
};
export default function SearchableAccordion({
  data = defaultProp.data, // each item of your data will show in a component that you want by using - > (ComponentCildrens)
  childrenActions = defaultProp.childrenActions, // items in accordin can have action like delete edit or anything .
  title = defaultProp.title, // accordion title
  keys = defaultProp.keys, // a array of your item property like ["name","title"] that you want to search them
  ComponentCildrens = defaultProp.ComponentCildrens, // each item of data will send as a prop to (ComponentCildrens)
}) {
  // States ======== >>
  const [isSearch, setIsSearch] = useState(false); // it will control whether the user is searching or not !
  const [searchValue, setSearchValue] = useState(""); // value of search input !
  const [childrenItemsData, setChildrenItemsData] = useState([]); // it will has some datas to search !
  const [resultOfSearch, setResultOfSearch] = useState([]); // it will has result of search values like [] if the Accordion being searched !
  // Hooks ========= >>
  // Hooks /search hook >
  const { startSearch, result } = useFuseSearch(childrenItemsData, keys); // responsible for geting search value and give us a result .
  // Use-Effect === >
  useEffect(() => {
    setChildrenItemsData(data || []);
  }, [data]);
  useEffect(() => {
    setResultOfSearch(result);
  }, [result]);
  // Method == >
  const search = () => {
    if (!searchValue.trim()) return;
    setIsSearch(true); // change to search mood
    startSearch(searchValue); // send value and get result of search
  };
  const cleanSearchResult = () => {
    setIsSearch(false);
    setResultOfSearch([]);
  };

  return (
    <div>
      <Accordion title={title}>
        <div className="space-y-3">
          <div className="flex items-stretch gap-x-2">
            <input
              disabled={data?.length < 5}
              className=" block outline-none rounded-xl text-sm p-2 border-2 bg-transparent border-primary-light placeholder-primary-light/80 dark:text-text-light dark:placeholder-text-light/50 font-dana-md"
              placeholder="جستجو"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
            />

            <button
              disabled={
                childrenItemsData?.length < 5 || searchValue?.trim()?.length < 1
              }
              onClick={search}
              className="primary_btn_theme sm_btn_size"
            >
              جستجو
            </button>

            {isSearch && (
              <button
                onClick={cleanSearchResult}
                className="d_btn_theme rounded-xl px-3 flex items-center"
              >
                <CloseRoundedIcon className="!text-sm" />
              </button>
            )}
          </div>

          {useMemo(() => {
            return (
              !isSearch &&
              childrenItemsData?.map((item, index) => {
                return (
                  <ComponentCildrens
                    key={item?._id}
                    data={{ ...item, index: index + 1 }}
                    actions={childrenActions || {}}
                  />
                );
              })
            );
          }, [isSearch, childrenItemsData])}
          {useMemo(() => {
            return (
              isSearch &&
              resultOfSearch?.map((search, index) => {
                return (
                  <ComponentCildrens
                    key={search?.item?._id}
                    data={{ ...search?.item, index: index + 1 }}
                    actions={childrenActions || {}}
                  />
                );
              })
            );
          }, [isSearch, resultOfSearch])}
        </div>
      </Accordion>
    </div>
  );
}
