import React, { useState } from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import clsx from "clsx";
export default function FeatureBox({
  iconColor = "",
  title = "title",
  count = 0,
  countTitle = "countTitle",
  increaseSection = true,
  incraseText = "گزارش نسبت به ماه قبل خوبه",
  decreaseText = "خوب نیست ",
}) {
  return (
    <div
      className="
    ftc_box
    max-h-[161px]
   shadow-custom  
   shadow-black/5
    "
    >
      <div className="flex items-center gap-5 font-dana-md">
        <aside>
          <div
            className={`w-[60px] h-[60px] flex items-center justify-center rounded-[23px] ${iconColor}`}
          >
            icon
          </div>
        </aside>
        <aside className="flex justify-center flex-col">
          <p className="text-base text-text-dark/70 dark:text-text-light/70 h-12 line-clamp-2">
            {title}
          </p>
          <span className="text-[28px] text-text-dark dark:text-text-light flex items-center gap-x-2">
            {count}
            <p className="text-sm">{countTitle}</p>
          </span>
        </aside>
      </div>

      {increaseSection && (
        <div
          className={clsx(
            false ? "text-success-light" : "text-danger-light",
            "flex items-center"
          )}
        >
          <span className="pl-2.5">
            {false ? <TrendingUpRoundedIcon /> : <TrendingDownRoundedIcon />}
          </span>
          <p className="font-dana-md flex items-center gap-x-2">
            {"100%"}
            <span className="text-text-dark/70">
              {false ? incraseText : decreaseText}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
