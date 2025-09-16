import React, { useContext, useEffect, useState } from "react";
import { FeatureBox } from "../../ui";
// import { GetIcon } from "../index";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../libs/reactQuery";
import { getAllUsers } from "../../../api";
import { AuthContext } from "../../../context";
import { getNowDate } from "../../../utils";
// import icons from "../../../assist/icons";
export default function Features() {
  const [registersCount, setRegisterNumber] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  const authContext = useContext(AuthContext);

  const { data: courses } = useQuery({ queryKey: queryKeys.courses.all });
  const { data: sessions } = useQuery({ queryKey: queryKeys.sessions.all });
  const { data: users } = useQuery({
    queryKey: queryKeys.users.all,
    queryFn: () =>
      getAllUsers({
        headers: { Authorization: `Bearer ${authContext.adminToken}` },
      }),
  });

  useEffect(() => {
    const getRegistersCount = courses
      ?.map((item) => {
        return item?.registers;
      })
      ?.reduce((p, n) => {
        return p + n;
      });
    const getAdminCount = users?.filter((user) => {
      return user?.role == "ADMIN";
    })?.length;
    setAdminCount(getAdminCount);
    setRegisterNumber(getRegistersCount);
  }, [courses, users]);




  return (
    <div className="grid grid-cols-4 gap-[30px]">
      {/* {BoxIcon && <BoxIcon.Component />} */}
      <FeatureBox
        count={registersCount}
        title="تعداد فروش دوره"
        countTitle="دانشجو"
        iconColor="bg-danger-light/30 dark:bg-danger-dark"
      />
      <FeatureBox
        count={users?.length}
        title="تعداد تمامی کاربر ها"
        countTitle="کاربر"
        iconColor="bg-success-light/20 dark:bg-success-dark"
      />
      <FeatureBox
        count={sessions?.length}
        title="تعداد تمامی جلسات"
        countTitle="جلسه"
        iconColor="bg-warning-light/20 dark:bg-warning-dark"
      />
      <FeatureBox
        count={adminCount}
        title="ادمین هامون"
        countTitle="ادمین"
        increaseSection={false}
        iconColor="bg-info-light/20 dark:bg-info-dark"
      />
    </div>
  );
}
