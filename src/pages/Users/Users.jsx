import React, { useCallback, useMemo, useState } from "react";
import { DataGrid } from "../../components/module";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ModalBox, MuiButton, NoDataBox } from "../../components/ui";
import { Modal, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useBanUser, useChangeRole, useDlUser } from "../../hook";
import Swal from "sweetalert2";
import clsx from "clsx";
import { queryKeys } from "../../libs/reactQuery";
export default function Users() {
  // state ----------------------------------->
  const [selectedUser, setSelctedUser] = useState(null);
  const [deletModal, setDeleteModal] = useState(false);
  const [banModal, setBanModal] = useState(false);
  // custom hook --------------------------------------------->
  const { deleteUser } = useDlUser();
  const { banUser } = useBanUser();
  const { changeRole } = useChangeRole();
  // geting data  ------------------------------------------>
  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.users.all,
  });
  const memoizedUsers = useMemo(() => data, [data]);
  // handlerMethod ----------------->
  const userSelctedHandler = useCallback((selectedInfo) => {
    setSelctedUser(selectedInfo || null);
  }, []);
  // constant ---------------------- >
  const columns = useMemo(
    () => [
      { field: "index", headerName: "index", width: 70 },
      { field: "username", headerName: "نام کاربری", width: 130 },
      { field: "name", headerName: "نام", width: 130 },
      {
        field: "",
        headerName: "",
        sortable: false,
        filterable: false,
        disableColumnMenu: "hidden",
        width: 130,
        renderCell: () => {
          return (
            <div className="w-full flex justify-end">
              <Link className="block" to={`/user-info`}>
                جزعیات بیشتر
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  // delete user ------------------>
  const deleteHandler = useCallback(async () => {
    const respnse = await deleteUser(selectedUser._id);
    setDeleteModal(false);
    if (respnse.ok) {
      new Swal({ icon: "success", confirmButtonText: "باشه" });
      refetch();
    } else {
      new Swal({ icon: "error", confirmButtonText: "باشه" });
    }
  }, [selectedUser]);
  // ban user ------------------>
  const banHandler = useCallback(async () => {
    const respnse = await banUser(selectedUser._id);
    console.log(respnse);
    setBanModal(false);
    if (respnse.ok) {
      new Swal({ icon: "success", confirmButtonText: "باشه" });
      refetch();
    } else {
      new Swal({ icon: "error", confirmButtonText: "باشه" });
    }
  }, [selectedUser]);
  // Change user role -------------------------->>
  const changeRoleHandler = useCallback(
    async (e, value) => {
      if (value === null) return;
      if (value) setSelctedUser((prev) => ({ ...prev, role: value })); // to make quick action <<
      const res = await changeRole({
        id: selectedUser._id,
        role: value,
      });
      // here need optimaizing >>
      if (res.ok) {
        refetch();
      } else {
        new Swal({ icon: "error", confirmButtonText: "باشه" });
      }
    },
    [selectedUser]
  );

  return (
    <>
      <div className="overflow-x-auto container">
        {!isLoading ? (
          data?.length ? (
            <DataGrid
              columns={columns}
              onSelected={userSelctedHandler}
              data={memoizedUsers}
            />
          ) : (
            <NoDataBox />
          )
        ) : (
          "LOading"
        )}

        {selectedUser !== null ? (
          <div className="flex items-center gap-4">
            <MuiButton
              onClick={() => setDeleteModal(true)}
              variant="contained"
              color={"error"}
            >
              حذف
            </MuiButton>
            <MuiButton
              onClick={() => {
                setBanModal(true);
              }}
              variant="contained"
              color={"error"}
            >
              بن
            </MuiButton>
            {/* change role toogle button ------------------------------------ >> */}
            <div style={{ direction: "ltr" }} className="w-fit">
              <ToggleButtonGroup
                color="primary"
                value={selectedUser?.role}
                exclusive
                onChange={changeRoleHandler}
                aria-label="Platform"
              >
                <ToggleButton sx={{ fontFamily: "dana-md" }} value="ADMIN">
                  ادمین
                </ToggleButton>
                <ToggleButton sx={{ fontFamily: "dana-md" }} value="USER">
                  کاربر
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            {/* Show role >> */}
            <Link
              to={`/user-info/${selectedUser._id}`}
              className={clsx(
                "font-dana-md  px-3 py-2 rounded-xl",
                selectedUser?.role == "ADMIN"
                  ? "bg-warning-light/20 text-warning-light"
                  : "bg-primary-light/20 text-primary-light"
              )}
            >
              {selectedUser.name}
            </Link>
          </div>
        ) : undefined}
      </div>
      {/* Delete modal */}
      <Modal
        open={deletModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <ModalBox
            acceptText="حذف"
            rejectText="بستن"
            accept={deleteHandler}
            reject={() => setDeleteModal(false)}
          />
        </>
      </Modal>
      {/* Ban modal */}
      <Modal
        open={banModal}
        onClose={() => setBanModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <ModalBox
            acceptText="بن"
            rejectText="بستن"
            accept={banHandler}
            reject={() => setBanModal(false)}
          />
        </>
      </Modal>
    </>
  );
}
