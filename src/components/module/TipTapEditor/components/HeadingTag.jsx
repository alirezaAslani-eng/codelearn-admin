import React from "react";

export default function HeadingTag({ onChange = () => {}, value, maxLevel }) {
  const handleChange = (hTagvalue) => {
    try {
      onChange(hTagvalue);
    } catch (err) {
      console.log(err);
    }
  };
  const hTags = Array.from(
    { length: maxLevel > 6 || maxLevel < 1 ? 6 : maxLevel },
    (__unsafe_useEmotionCache, index) => {
      return index + 1;
    }
  );
  return (
    <>
      {hTags.map((h) => {
        return (
          <div
            key={h}
            className={`${value == h ? "text-red-400" : ""}`}
            onClick={() => handleChange(h)}
          >
            h{h}
          </div>
        );
      })}
      <div onClick={() => handleChange(0)}>None</div>
    </>
  );
}
