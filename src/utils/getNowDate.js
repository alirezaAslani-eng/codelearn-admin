import React from "react";

export default function getNowDate({ ago } = {}) {
  const date = new Date();
  const month = String(date.getMonth() + 1)?.padStart(2, "0");
  const day = String(date.getDate())?.padStart(2, "0");
  const year = String(date.getFullYear());
  const fullDate = `${year}-${month}-${day}`;
  if (ago) {
    let minusedday = date.getDate() - ago;

    if (minusedday <= 0) {
      let _day = 30 - Number(String(minusedday)?.replace("-", ""));
      let _month = date.getMonth() + 1 - 1;

      if (_month <= 0) {
        let _year = date.getFullYear() - 1;
        // when th year is begin
        return `${String(_year)}-${String(12 - _month).padStart(
          2,
          "0"
        )}-${String(_day).padStart(2, "0")}`;
      }

      return `${String(year)}-${String(_month).padStart(2, "0")}-${String(
        _day
      ).padStart(2, "0")}`; // when only the day is less than 0 or is 0
    }

    return `${year}-${month}-${minusedday}`; // when day number is not a nagativ number
  }

  return fullDate; // now
}
