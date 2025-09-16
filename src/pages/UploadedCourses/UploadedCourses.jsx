import React, { useCallback, useMemo, useState } from "react";

import { Modal, Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ModalBox, MuiButton, NoDataBox } from "../../components/ui";
import { DataGrid } from "../../components/module";
import { useDeleteCourse } from "../../hook";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { queryKeys } from "../../libs/reactQuery";
import { getAllCourses } from "../../api";
export default function UploadedCourses() {
  // STATE --- >>
  const [selectedRow, setSelectedRow] = useState(null);
  const [deletModal, setDeleteModal] = useState(false);
  const { deleteCourse } = useDeleteCourse();
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: queryKeys.courses.all,
    queryFn: getAllCourses,
  });
  // MEMOIZED DATA ======>
  const memoizedColumns = useMemo(
    () => [
      { field: "index", headerName: "index", width: 70 },
      { field: "name", headerName: "عنوان دوره", width: 130 },
      { field: "creator", headerName: "سازنده دوره", width: 130 },
      {
        field: "price",
        headerName: "مبلغ",
        width: 130,
        renderCell: (value) => {
          return value.row?.price == "0" ? "رایگان" : value.row?.price;
        },
      },

      {
        field: "categoryID",
        headerName: "دسته بندی",
        width: 130,
        renderCell: (value) => {
          return value.row?.categoryID?.title;
        },
      },
      {
        field: "registers",
        headerName: "دانشجو",
        width: 130,
        renderCell: (value) => {
          return value.row?.registers == "0"
            ? "دانشجو ندارد"
            : value.row?.registers;
        },
      },
      {
        field: "isComplete",
        headerName: "وضعیت دوره",
        width: 130,
        renderCell: (value) => {
          return value.row?.isComplete ? (
            <p className="text-success-light rounded-lg">برگزار شده</p>
          ) : (
            <p className="text-warning-light rounded-lg ">در حال بر گزاری</p>
          );
        },
      },

      {
        field: "score",
        headerName: "امتیاز",
        // sortable: false,
        // filterable: false,
        // disableColumnMenu: "hidden",
        width: 130,
        valueGetter: (_, row) => row?.courseAverageScore,
        renderCell: (param) => {
          return (
            <>
              <div>
                <Rating
                  name="read-only"
                  value={param.row?.courseAverageScore}
                  readOnly
                />
              </div>
            </>
          );
        },
      },
    ],
    []
  );
  const memoizedData = useMemo(() => data, [data]);
  // HANDLER METHOD ==========>
  const selectedRowHandler = useCallback((MuiRow) => {
    setSelectedRow(MuiRow);
  }, []);
  // CRUD METHOD ============>
  const deleteHandler = async () => {
    const res = await deleteCourse(selectedRow?._id);
    if (res.ok) {
      refetch();
      setDeleteModal(false);
    } else new Swal({ icon: "error", confirmButtonText: "باشه" });
  };
  const editHandler = () => {
    console.log(selectedRow);
  };

  return (
    <>
      <div className="container font-dana-md">
        {!isLoading ? (
          !isError ? (
            <>
              {data?.length ? (
                <DataGrid
                  onSelected={selectedRowHandler}
                  data={memoizedData}
                  columns={memoizedColumns}
                />
              ) : (
                <NoDataBox />
              )}
            </>
          ) : (
            "server-error"
          )
        ) : (
          "loading"
        )}
        {selectedRow !== null && (
          <div className="mt-6">
            <MuiButton
              onClick={() => setDeleteModal(true)}
              color={"error"}
              variant="contained"
            >
              حذف
            </MuiButton>
          </div>
        )}
        <Link to={"/add-course"}>
          <MuiButton
            className="!mt-3 !gap-3"
            color={"primary"}
            variant="contained"
          >
            اپلود دوره جدید
            <ControlPointRoundedIcon />
          </MuiButton>
        </Link>
      </div>
      <Modal
        open={deletModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <ModalBox
            title={`حذف  : ${selectedRow?.name}`}
            acceptText="حذف"
            rejectText="بستن"
            accept={deleteHandler}
            reject={() => setDeleteModal(false)}
          />
        </>
      </Modal>
    </>
  );
}
