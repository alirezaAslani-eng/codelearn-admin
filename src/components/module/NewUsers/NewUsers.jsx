import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { queryKeys } from "../../../libs/reactQuery";
import { getAllUsers } from "../../../api";
import { AuthContext } from "../../../context";
import { Table } from "../../ui";

export default function NewUsers() {
  const authContext = useContext(AuthContext);
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryFn: () =>
      getAllUsers({
        headers: { Authorization: `Bearer ${authContext.adminToken}` },
      }),
    queryKey: queryKeys.users.all,
  });

  const cols = [
    { title: "نام کاربری", propName: "name" },
    { title: "تلفن تماس", propName: "phone" },
    { title: "تلفن تماس", propName: "username" },
    { title: "تلفن تماس", propName: "email" },
    { title: "تلفن تماس", propName: "createdAt" },
  ];
  return (
    <div className="px-8 bg-white dark:bg-[#273142]  h-[420px] rounded-xl secondary_shadow secondary_shadow_color">
      <div>
        <div className=" bg-white dark:bg-[#273142] h-[92px] w-full ">
          <div className="w-full h-full flex justify-between items-center font-dana-md ">
            <aside>
              <p className="text-2xl text-[#202224]/80 dark:text-white/80">
                جدید ترین ها
              </p>
            </aside>
            <aside>Options</aside>
          </div>
        </div>

        <Table
          className="h-[calc(420px-92px)]"
          rows={users?.slice(0, 10).reverse()}
          cols={cols}
        />
      </div>
    </div>
  );
}
