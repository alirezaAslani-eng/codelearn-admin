import React, { useContext, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../libs/reactQuery";
import {
  CreateOffCodeForm,
  FilterableAccordion,
} from "../../components/module";
import { deleteOneOff } from "../../api";
import { ConfrimeBox } from "../../components/ui";
import { showResult } from "../../utils";
export default function NewOffCode() {
  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useQuery({ queryKey: queryKeys.courses.all }); // get courses because we find (course title) in each offs detals by using (courseId)

  const {
    data: offs,
    isLoading: offsLoading,
    isError: offsError,
    refetch: refetchOffs,
  } = useQuery({ queryKey: queryKeys.offs.all });

  const offIds = useMemo(
    () => [...new Set(offs?.map((item) => item?.course))],
    [offs]
  );

  return (
    <div className="container mt-6"> 
      <CreateOffCodeForm />

      <div className="grid grid-cols-2 gap-4">
    
        {offIds?.map((offId, index) => {
          const courseTitle = courses?.find(
            (course) => course?._id == offId
          )?.name;
          const offList = offs?.filter((off) => off?.course == offId);
          return (
            <FilterableAccordion
              key={offId ?? index}
              title={courseTitle}
              data={offList}
              ComponentCildrens={CodeListBox}
            />
          );
        })}
      </div>
    </div>
  );
}

function CodeListBox(props) {
  const { code, creator, max, percent, createdAt, uses, _id } = props?.data;
  const { refetch: refetchOffs } = useQuery({ queryKey: queryKeys.offs.all });
  const deleteMe = async () => {
    try {
      await deleteOneOff({ param: _id });
      refetchOffs();
    } catch (err) {
      showResult({ isError: true, errorText: "error", buttonText: "ok" });
    }
  };
  return (
    <div>
      <div className="flex">
        {code}
        {creator}
        {max} {percent} {createdAt} {uses}
        <ConfrimeBox onRemove={deleteMe} />
      </div>
    </div>
  );
}
