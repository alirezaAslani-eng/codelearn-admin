import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../libs/reactQuery";
import getAllTickets from "../../api/get/getTickets/getAllUserTickets";
import { AuthContext } from "../../context";
import { DataGrid } from "../../components/module";
import { AnswerBox, MuiButton, TitleWithEffect } from "../../components/ui";
import Swal from "sweetalert2";
import postTicketAnswer from "../../api/post/postTicketAnswer";
import {
  answeValidation as schema,
  answerTicket as inputNames,
} from "../../constant";
import {
  BackCover,
  Modal,
  ModalWrrapper,
  ShowTextModal,
  TextAreaModal,
} from "../../components/common";
import { showResult } from "../../utils";
import { getOneTicket } from "../../api";
import { CircularProgress } from "@mui/material";
export default function UserTickets() {
  // Modals states --->
  const [isShowAnswerModal, setIsShowAnswerModal] = useState(false);
  const [isShowTextModal, setIsShowTextModal] = useState(false);
  // when click on button send answer or any button on table that has a event like open a modal  this state take (its details)
  const [activTicketInfo, setActivTicketInfo] = useState({});
  const { adminToken } = useContext(AuthContext); // get admin token to handle requsts
  const {
    data: tickets,
    isLoading: ticketsLoading,
    refetch: refetchTickets,
  } = useQuery({
    queryKey: queryKeys.userTickets.all,
    queryFn: () =>
      // get all tickets to show in this page
      getAllTickets({ headers: { Authorization: `Bearer ${adminToken}` } }),
  });
  const {
    data: oneTicket,
    isLoading: oneTicketLoading,
    refetch: oneTicketRefetch,
  } = useQuery({
    retry: false,
    queryKey: queryKeys.userTickets.one(activTicketInfo?._id),
    queryFn: () =>
      // get answer of a ticket when click
      getOneTicket({
        headers: { Authorization: `Bearer ${adminToken}` },
        param: activTicketInfo?._id,
      }),
  });

  useEffect(() => {
    oneTicketRefetch(); // for get the answer of ticket when click on show ticket details
  }, [activTicketInfo]);

  const { mutateAsync: SendAnswer, isLoading: answerLoading } = useMutation({
    mutationFn: postTicketAnswer,
  });

  const onAnswerHandler = async ({ value }) => {
    try {
      const res = await SendAnswer({
        body: { ...value, ticketID: activTicketInfo?._id },
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      refetchTickets();
      setIsShowAnswerModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = useMemo(
    () => [
      { field: "index", headerName: "index", width: 70 },
      { field: "user", headerName: "کاربر", width: 130 },
      { field: "title", headerName: "عنوان تیکت", width: 130 },
      {
        field: "priority",
        headerName: "الویت",
        width: 70,
        renderCell: (table) => {
          return (
            <>
              {table?.row?.priority == 1 && "کم"}
              {table?.row?.priority == 2 && "متوسط"}
              {table?.row?.priority == 3 && "ضرورت"}
            </>
          );
        },
      },
      // { field: "username", headerName: "نام کاربری", width: 130 },
      { field: "body", headerName: "محتوا تیکت", width: 130 },
      {
        field: "view",
        headerName: "",
        width: 130,
        sortable: false,
        filterable: false,
        disableColumnMenu: "hidden",
        renderCell: (table) => {
          return (
            <MuiButton
              onClick={() => {
                setIsShowTextModal(true);
                setActivTicketInfo(table?.row || {});
              }}
            >
              مشاهده
            </MuiButton>
          );
        },
      },
      {
        field: "send",
        headerName: "",
        sortable: false,
        filterable: false,
        disableColumnMenu: "hidden",
        width: 130,
        renderCell: (table) => {
          return (
            <>
              <MuiButton
                disabled={!!table?.row?.answer}
                onClick={() => {
                  setActivTicketInfo(table?.row || {});
                  setIsShowAnswerModal(true);
                }}
              >
                ارسال پاسخ
              </MuiButton>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="container mt-6">
      <div className="mb-6">
        <p className="font-dana-md text-lg text-text-dark dark:text-text-light">
          <TitleWithEffect text={"تیکت های کاربران"} />
        </p>
      </div>
      <DataGrid
        tableProps={{ checkboxSelection: false }}
        columns={columns}
        data={tickets}
      />

      <ModalWrrapper
        actions={{
          open: isShowAnswerModal,
          onClose: () => setIsShowAnswerModal(false),
        }}
      >
        <div className="w-[min(500px,100%)]">
          <Modal>
            <TextAreaModal
              name={inputNames.body}
              schema={schema}
              hasSchema={true}
              actions={{
                open: isShowAnswerModal,
                onCancel: () => {
                  setIsShowAnswerModal(false);
                },
                onSubmit: (value) => onAnswerHandler({ value }),
              }}
              title={
                <p className="text-xl mb-3">پاسخ به {activTicketInfo?.user}</p>
              }
            />
          </Modal>
        </div>
      </ModalWrrapper>

      <ModalWrrapper
        actions={{
          open: isShowTextModal,
          onClose: () => setIsShowTextModal(false),
        }}
      >
        <div className="w-[min(500px,100%)]">
          <Modal>
            <ShowTextModal
              text={activTicketInfo?.body}
              actions={{
                open: isShowTextModal,
                onCancel: () => {
                  setIsShowTextModal(false);
                },
              }}
              customButtons={
                <MuiButton
                  disabled={!!activTicketInfo?.answer}
                  onClick={() => {
                    // switch to answer modal
                    setIsShowAnswerModal(true);
                    setIsShowTextModal(false);
                  }}
                >
                  پاسخ
                </MuiButton>
              }
              customText={
                <>
                  {!oneTicketLoading ? (
                    <div className="mt-4">
                      <AnswerBox answer={oneTicket?.answer || ""} />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <CircularProgress />
                    </div>
                  )}
                </>
              }
              title={
                <p className="text-xl mb-3">تیکت : {activTicketInfo?.user}</p>
              }
            />
          </Modal>
        </div>
      </ModalWrrapper>
    </div>
  );
}
