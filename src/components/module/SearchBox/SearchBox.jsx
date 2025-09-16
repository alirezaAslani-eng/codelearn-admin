import React from "react";
import SearchIcon from "@mui/icons-material/Search";
export default function SearchBox() {
  return (
    <form
      className="
    flex 
    items-center 
    gap-x-4 
    px-[17px]
   bg-background-light 
   border 
   border-serach-strok-light 
   w-full 
   h-full 
   rounded-full
   placeholder-text-dark/50
   "
    >
      <input placeholder="Search" type="text" className="outline-none block w-full bg-transparent" />
      <SearchIcon className="!text-black/50" />
    </form>
  );
}
