import React, { useContext } from "react";
import { UiSectionContext } from "../../context";
import { TopBar } from "../../components/ui";
import { CreateLiMenuForm } from "../../components/module";
export default function UiSections() {
  const topBarInfo = useContext(UiSectionContext);
  console.log(topBarInfo);

  return (
    <div>
      <section className="mt-6">
        <TopBar />
      </section>
      
    </div>
  );
}
