import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { DataGrid } from "../../components/module";
import { ModalBox, MuiButton } from "../../components/ui";
import { CreateCategoryModal } from "../../components/common";
import { Modal } from "@mui/material";
import { useDeleteCategory } from "../../hook";
import { queryKeys } from "../../libs/reactQuery";
import { getAllCategories } from "../../api";
import { showResult } from "../../utils";

export default function Categories() {
  // state =======>
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: getAllCategories,
  });

  const { deleteCategory } = useDeleteCategory();

  const columns = [
    { field: "index", headerName: "index", width: 70 },
    { field: "name", headerName: "عنوان اصلی", width: 130 },
    { field: "title", headerName: "عنوان برای نمایش", width: 130 },
    { field: "=", headerName: "", width: 130 },
    {
      field: "createdAt",
      headerName: "تاریخ انتشار",
      width: 130,
      renderCell: (value) => {
        return value.row?.createdAt?.slice(0, 10);
      },
    },
    {
      field: "updatedAt",
      headerName: "تاریخ اپدیت",
      width: 130,
      renderCell: (value) => {
        return value.row?.updatedAt?.slice(0, 10);
      },
    },
  ];

  const selectedHandler = useCallback(
    (selectedInfo) => setSelectedRow(selectedInfo),
    []
  );
  // delete ================ >
  const deleteHandler = async () => {
    const res = await deleteCategory(selectedRow._id);
    if (res.ok) {
      setDeleteModal(false);
      refetch();
    } else {
      showResult({
        isError: true,
        errorText: "fail to remove",
        buttonText: "باشه ",
      });
    }
  };
  return (
    <div className="container">
      {isLoading ? (
        "Loading"
      ) : isError ? (
        "error"
      ) : (
        <DataGrid onSelected={selectedHandler} columns={columns} data={data} />
      )}
      {/* CRUD PROCESS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..... */}
      {/* CREATE CATEGORY BUTTON >>>>>>> */}

      <div className="flex items-center gap-x-2">
        <MuiButton
          onClick={() => setCreateModal(true)}
          className="!mt-6"
          variant="contained"
          color="primary"
        >
          ایجاد دسته بندی جدید
        </MuiButton>

        {selectedRow !== null && (
          <>
            {/* DELETE BUTTON >>>>>>> */}
            <MuiButton
              onClick={() => setDeleteModal(true)}
              className="!mt-6"
              variant="contained"
              color="error"
            >
              حذف
            </MuiButton>
            {/* EDIT BUTTON >>>>>>> */}
            <MuiButton
              onClick={() => setEditModal(true)}
              className="!mt-6"
              variant="contained"
              color="primary"
            >
              ویرایش
            </MuiButton>
          </>
        )}
      </div>
      <Modal open={createModal} onClose={() => setCreateModal(false)}>
        <>
          <CreateCategoryModal
            title={`ایجاد دسته بندی`}
            isEditOrCreate="create"
            onClose={() => setCreateModal(false)}
          />
        </>
      </Modal>
      <Modal open={editModal} onClose={() => setEditModal(false)}>
        <>
          <CreateCategoryModal
            title={`شما درحال ویرایش ${selectedRow?.name}`}
            categoryInfo={selectedRow}
            isEditOrCreate="edit"
            onClose={() => setEditModal(false)}
          />
        </>
      </Modal>
      <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
        <>
          <ModalBox
            title={`شما درحال حذف ${selectedRow?.name}`}
            reject={() => setDeleteModal(false)}
            accept={deleteHandler}
            rejectText="Reject"
            acceptText="Accept"
            onClose={() => setEditModal(false)}
          />
        </>
      </Modal>
    </div>
  );
}
