import React, { useEffect, useRef } from "react";
export default function Table({ rows, cols, className = " h-[200px]" }) {
  return (
    <div className="w-full font-dana-md h-full">
      <div className={`relative overflow-auto table-scroll ${className} cs-scroll`}>
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className=" sticky top-0 text-sm text-[#202224] dark:text-white/80 bg-[#F1F4F9] dark:bg-[#323D4E]/80">
            <tr>
              {cols?.map((item, index) => {
                return (
                  <th
                    scope="col"
                    className={`px-6 py-4 ${
                      index == 0
                        ? "rounded-s-lg"
                        : index == cols.length - 1 && "rounded-e-lg"
                    }`}
                  >
                    {item?.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-[#202224]/80 dark:text-[#FFFFFF]/80">
            {rows?.map((item) => {
              return (
                <tr className="h-[80px] border-b border-[#979797]/40 ">
                  {cols?.map((col) => (
                    <td className="px-6 py-4"> {item?.[col?.propName]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
