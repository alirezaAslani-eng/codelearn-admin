import React from "react";

export default function NoDataBox() {
  return (
    <section className="secondary_text_color flex justify-center flex-col items-center w-full h-screen animate-initialShow">
      <p className="font-dana-md text-xl ">اطلاعاتی برای نمایش وجود ندارد !</p>
      <div className="w-fit">
        <img
          className="w-[150px]"
          src="/codelearn-admin/images/icon/empty.png"
          alt=""
        />
      </div>
    </section>
  );
}
