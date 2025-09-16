import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { NoDataBox, SessionBox } from "../../components/ui";
import { FilterableAccordion } from "../../components/module";
// api section with ReactQuery  ====== >>
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../libs/reactQuery";
import { SessionActionsContex } from "../../context";
export default function UploadedSessions() {
  // STATE --- >>
  const [coursesTitle, setCourseTitle] = useState([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.sessions.all,
  });
  // Context --- >
  const { deleteSession } = useContext(SessionActionsContex).deleteEvent;
  const keysToSearch = useMemo(() => {
    return ["title"];
  }, []);

  useEffect(() => {
    // geting course name of each session item !
    const coursesSet = new Set(data?.map((item) => item?.course?.name));
    const CourseTls = [...coursesSet];
    if (CourseTls?.length) setCourseTitle(CourseTls);
    return () => {
      coursesSet.clear();
    };
  }, [data]);

  // delete one session by using context >>
  const deleteASession = useCallback((id) => {
    deleteSession(id);
  }, []);

  return (
    <div className="mt-6 container ">
      <div className="space-y-4">
        {useMemo(() => {
          return isLoading ? (
            "loading"
          ) : isError ? (
            "error"
          ) : !data.length ? (
            <NoDataBox />
          ) : (
            coursesTitle?.map((title, index) => {
              const accordionItems = data?.filter(
                (item) => item?.course?.name == title
              );
              return (
                <FilterableAccordion
                  key={index}
                  keys={keysToSearch}
                  ComponentCildrens={SessionBox}
                  data={accordionItems}
                  childrenActions={{
                    deleteAction: deleteASession,
                  }}
                  title={!title ? <NoTitle /> : <AccordionTitle text={title} />}
                />
              );
            })
          );
        }, [coursesTitle, data, isLoading, isError])}
      </div>
    </div>
  );
}
function NoTitle() {
  return (
    <div className="flex items-start gap-x-2 text-danger-light">
      <span>عنوان ندارد</span>
    </div>
  );
}
function AccordionTitle({ text = "title" }) {
  return (
    <div className="flex items-start gap-x-2">
      <CloudUploadRoundedIcon className="text-primary-light" />
      <h1>{text || ""}</h1>
    </div>
  );
}
