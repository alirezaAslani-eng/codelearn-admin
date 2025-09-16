import React from "react";
import { UiSectionContext } from "../../context";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../libs/reactQuery";
import { UiSections } from "../../pages";
export default function UiSectionContiner() {
  // TobBar Data ----------------- >
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.topBarLies.all,
  });

  if (isLoading) return null;
  else if (isError) return null;

  return (
    <UiSectionContext.Provider value={{ topBarLies: data }}>
      <UiSections />
    </UiSectionContext.Provider>
  );
}
