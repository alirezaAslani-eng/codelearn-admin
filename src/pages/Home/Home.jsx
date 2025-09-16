import React from "react";
import { Features, NewUsers } from "../../components/module";
import clsx from "clsx";
export default function Home() {
  return (
    <div className="space-y-[30px]">
      {/* (Start) Features section */}
      <section className="mt-[22px] container">
        <p className="title mb-[27px]">title</p>
        <Features />
      </section>
      {/* (Finish) Features section */}

      {/* (Start) Chart section */}
      <section className="container">
        <BoxContainer className="max-h-[444px] shadow-custom shadow-black/5">
          chart
        </BoxContainer>
      </section>
      {/* (Finish) Chart section */}

      {/* (Start) New_Users section */}
      <section className="container">
        <NewUsers />
      </section>
      {/* (Finish) New_Users section */}
    </div>
  );
}
function BoxContainer({ className = "", title = "title", children }) {
  return (
    <div className={clsx(`chart_box`, className)}>
      <div className="flex justify-between items-center">
        <p className="title mt-[5px]">{title}</p>
      </div>
      {children}
    </div>
  );
}
