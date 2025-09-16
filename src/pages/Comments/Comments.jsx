import React, { useCallback, useContext, useState } from "react";
import { queryKeys } from "../../libs/reactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CommentBox, NoDataBox } from "../../components/ui";
import {
  deleteOneComment,
  deleteOneUser,
  postOneCommentAnswer,
  putAcceptOneComment,
  putOneUserBan,
  putRejectOneComment,
} from "../../api";

import { AuthContext } from "../../context";
export default function Comments() {
  const [isMutating, setIsMutating] = useState(false);

  const {
    data: comments,
    isLoading: commentLoading,
    isError: commentError,
    refetch: refetchComments,
  } = useQuery({ queryKey: queryKeys.comments.all });

  const authContex = useContext(AuthContext);
  console.log(comments);

  const { mutateAsync: deleteCommentMutate } = useMutation({
    mutationFn: deleteOneComment,
  });
  const { mutateAsync: rejectCommentMutate } = useMutation({
    mutationFn: putRejectOneComment,
  });
  const { mutateAsync: acceptCommentMutate } = useMutation({
    mutationFn: putAcceptOneComment,
  });
  const { mutateAsync: banUserMutate } = useMutation({
    mutationFn: putOneUserBan,
  });
  const { mutateAsync: deleteUserMutate } = useMutation({
    mutationFn: deleteOneUser,
  });
  const { mutateAsync: sendAnswerMutate } = useMutation({
    mutationFn: postOneCommentAnswer,
  });

  const deleteComment = useCallback(
    async (id) => {
      try {
        setIsMutating(true);
        await deleteCommentMutate({
          headers: { Authorization: `Bearer ${authContex.adminToken}` },
          param: id || "",
        });
        refetchComments();
      } catch (err) {
        console.log(err);
      } finally {
        setIsMutating(false);
      }
    },
    [authContex.adminToken]
  );
  const rejectComment = useCallback(
    async ({ id, body }) => {
      setIsMutating(true);
      try {
        await rejectCommentMutate({
          headers: { Authorization: `Bearer ${authContex.adminToken}` },
          param: id || "",
          body: { body },
        });
        refetchComments();
      } catch (err) {
        console.log(err);
      } finally {
        setIsMutating(false);
      }
    },
    [authContex.adminToken]
  );
  const acceptComment = useCallback(
    async ({ id, body }) => {
      setIsMutating(true);
      try {
        await acceptCommentMutate({
          headers: { Authorization: `Bearer ${authContex.adminToken}` },
          param: id || "",
          body: { body },
        });
        refetchComments();
      } catch (err) {
        console.log(err);
      } finally {
        setIsMutating(false);
      }
    },
    [authContex.adminToken]
  );
  const banUser = useCallback(
    async (id) => {
      setIsMutating(true);
      try {
        await banUserMutate({
          param: id,
          headers: { Authorization: `Bearer ${authContex.adminToken}` },
        });
        await deleteUserMutate({
          headers: { Authorization: `Bearer ${authContex.adminToken}` },
          param: id,
        });
        refetchComments();
      } catch (err) {
        console.log(err);
      } finally {
        setIsMutating(false);
      }
    },
    [authContex.adminToken]
  );
  const sendAnswer = useCallback(
    async ({ id, body }) => {
      setIsMutating(true);
      try {
        await sendAnswerMutate({
          param: id,
          body: { body },
          headers: { Authorization: `Bearer ${authContex.adminToken}` },
        });
        refetchComments();
      } catch (err) {
        console.log(err);
      } finally {
        setIsMutating(false);
      }
    },
    [authContex.adminToken]
  );

  return (
    <div className="mt-6 container">
      <div className="space-y-6 ">
        {commentLoading ? (
          "loading"
        ) : commentError ? (
          "error"
        ) : !comments?.length ? (
          <NoDataBox />
        ) : (
          comments.map((item) => {
            return (
              <CommentBox
                {...item}
                actions={{
                  onRemove: deleteComment,
                  onAccept: acceptComment,
                  onReject: rejectComment,
                  onBan: banUser,
                  onAnswer: sendAnswer,
                  disabled: isMutating,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
