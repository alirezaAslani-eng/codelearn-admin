import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { CreateBlogForm, DataGrid } from "../../components/module";
import { ModalBox, MuiButton } from "../../components/ui";
import { Modal } from "@mui/material";
import { useDeleteBlog } from "../../hook";
import { queryKeys } from "../../libs/reactQuery";
import { newBlog as BlogInputNames } from "../../constant";
export default function UploadedBlogs() {
  // state =======>>
  const [selectedRowInfo, setSelectedRowInfo] = useState(null);
  const [deletEModal, setDeleteModal] = useState(false);
  const [isFormShow, setFormShow] = useState(false); // a toggle to show drafted article in a form .
  // ref ===>>
  const isMount = useRef(true);
  // hook ==============>>
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.blogs.all,
  });
  const { deleteBlog } = useDeleteBlog();
  // use-effect =========>>
  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);
  // Methods ========>>
  const selctedHandler = useCallback((selectedRow) => {
    // handle which row selected >>
    setSelectedRowInfo(selectedRow);
  }, []);
  const deleteBlogHandler = async () => {
    // (delete) blog process =========>>
    setDeleteModal(false);
    const res = await deleteBlog(selectedRowInfo._id);
    // const resJson = await res.json();
    if (isMount.current) {
      if (res.ok) {
        refetch();
      } else {
        new Swal({ icon: "error", confirmButtonText: "باشه" });
      }
    }
  };
  // columns send to <DataGrid/>
  const columns = useMemo(
    () => [
      { field: "index", headerName: "index", width: 70 },
      {
        field: "creator",
        headerName: "نویسنده",
        width: 130,
        renderCell: (data) => {
          return data.row?.creator?.name;
        },
      },
      { field: "shortName", headerName: "shortName", width: 130 },
      { field: "title", headerName: "عنوان", width: 130 },
    ],
    []
  );
  const memoizedData = useMemo(() => data, [data]);


  

  return (
    <>
      <div className="container mt-6">
        <div className="w-full">
          {isLoading ? (
            "Loading"
          ) : isError ? (
            "error"
          ) : data.length ? (
            <DataGrid
              onSelected={selctedHandler}
              data={memoizedData}
              columns={columns}
            />
          ) : (
            "No-data"
          )}
        </div>

        <div className="mt-6">
          {selectedRowInfo && (
            <>
              <MuiButton
                onClick={() => setDeleteModal(true)}
                variant="contained"
                color="error"
              >
                حذف
              </MuiButton>
              {!!selectedRowInfo?.publish ? null : (
                <MuiButton
                  onClick={() => setFormShow((prev) => !prev)}
                  variant="contained"
                  color={`${isFormShow ? "error" : "primary"}`}
                >
                  {isFormShow ? "بستن" : "ادامه نوشتن"}
                </MuiButton>
              )}
            </>
          )}
        </div>
      </div>
      <Modal open={deletEModal} onClose={() => setDeleteModal(false)}>
        <>
          <ModalBox
            reject={() => setDeleteModal(false)}
            accept={deleteBlogHandler}
          />
        </>
      </Modal>
      {isFormShow && (
        <CreateBlogForm
          defultBody={selectedRowInfo?.body}
          defaultForm={[
            { name: BlogInputNames.title, value: selectedRowInfo?.title },
            {
              name: BlogInputNames.description,
              value: selectedRowInfo?.description,
            },
            {
              name: BlogInputNames.shortName,
              value: selectedRowInfo?.shortName,
            },
            {
              name: BlogInputNames.shortName,
              value: selectedRowInfo?.shortName,
            },
            {
              name: BlogInputNames.categoryID,
              value: selectedRowInfo?.categoryID,
            },
            {
              name: BlogInputNames.body,
              value: selectedRowInfo?.body,
            },
          ]}
        />
      )}
    </>
  );
}
