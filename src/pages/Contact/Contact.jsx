import { useQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ContactBox, ModalBox, TextAreaModalBox } from "../../components/ui";
import { useDeleteContactMessage, useSendAnswer } from "../../hook";
import { Modal } from "@mui/material";
import Swal from "sweetalert2";
import { queryKeys } from "../../libs/reactQuery";
import { getAllContacts } from "../../api";
export default function Contact() {
  // state ===============>>
  const [answerModal, setAnswerModal] = useState(false);
  const [deleteModal, setDelteModal] = useState(false);
  const [emailtoSend, setEmailToSend] = useState("");
  const [idToDelete, setIdToDelete] = useState("");
  // ref ===============>>
  let isMount = useRef(true);
  // hook ============>>
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.contacts.all,
    queryFn: getAllContacts,
  });
  const { sendAnswer } = useSendAnswer();
  const { deleteContact } = useDeleteContactMessage();
  // use-effect =============>>
  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);
  // method =============>>
  const submitAnswer = async (value) => {
    if (value.trim().length) {
      // Async Start >>
      const res = await sendAnswer({
        email: emailtoSend,
        answer: value,
      });
      const resJson = await res.json();
      // Async Finish <<
      if (isMount.current) {
        if (res.ok) {
          new Swal({ icon: "success", confirmButtonText: "باشه" });
          setAnswerModal(false);
        } else {
          new Swal({ icon: "error", confirmButtonText: "باشه" });
        }
      }
    } else {
      setAnswerModal(false);
      new Swal({
        title: "ورودی خالیه",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };
  const dleteContactMessage = async () => {
    const res = await deleteContact(idToDelete);
    const resJson = await res.json();
    if (isMount) {
      if (res.ok) {
        refetch();
        setDelteModal(false);
      } else {
        setDelteModal(false);
        new Swal({ icon: "error", confirmButtonText: "باشه" });
      }
    }
  };

  // these method send as parametr to <ContactBox /> >>
  const onRemoveClickHandler = useCallback((id) => {
    // to get id and open answer modal
    setIdToDelete(id);
    setDelteModal(true);
  }, []);
  const onAnswerClickHandler = useCallback((email) => {
    // to get email and open answer modal
    setEmailToSend(email);
    setAnswerModal(true);
  }, []);

  return (
    <>
      <div className="container mt-6">
        <div className="space-y-6">
          {useMemo(() => {
            return isLoading
              ? "loading"
              : isError
              ? "error"
              : data.length
              ? data
                  .slice()
                  .reverse()
                  .map((item) => {
                    return (
                      <ContactBox
                        key={item._id}
                        onAnswerClick={onAnswerClickHandler}
                        onRemoveClick={onRemoveClickHandler}
                        {...item}
                      />
                    );
                  })
              : "no-data";
          }, [data, isLoading, isError])}
        </div>
      </div>
      <Modal
        open={answerModal}
        onClose={() => {
          setAnswerModal(false);
          setEmailToSend(""); // when close the answer modal email value shoud turn to ""
        }}
      >
        <>
          <TextAreaModalBox
            onAccept={submitAnswer}
            onClose={() => {
              setAnswerModal(false);
              setEmailToSend("");
            }}
          />
        </>
      </Modal>
      <Modal
        open={deleteModal}
        onClose={() => {
          setDelteModal(false);
          setIdToDelete("");
        }}
      >
        <>
          <ModalBox
            accept={dleteContactMessage}
            reject={() => {
              setDelteModal(false);
              setIdToDelete("");
            }}
            acceptText="حذف"
            rejectText="بستن"
          />
        </>
      </Modal>
    </>
  );
}
