import { createContext, useCallback, useContext, useState } from "react";
// Another context >>
import AuthContext from "../AuthContext";
// API and Query >>>
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteOneSession } from "../../api";
import { queryKeys } from "../../libs/reactQuery";
// Component / module >>
import { Portal } from "../../components/module";

const SessionActionsContex = createContext({
  deleteEvent: {
    deleteSession: () => {},
    isPending: false,
    result: null,
  },
});

const Deletemutate = () => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: deleteOneSession,
    onSuccess: (success) => {
      console.log(success);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { runDelete: mutate, deleteRsponse: data, isPendingDelete: isPending };
};

function SessionActionsProvider({ children }) {
  const [actionId, setActionId] = useState(""); // while action we have action action id in this state .
  const { deleteRsponse, runDelete, isPendingDelete } = Deletemutate(); // responsible for call delete API .

  const authContext = useContext(AuthContext); // for having access to fetch .

  const { refetch } = useQuery({ queryKey: queryKeys.sessions.all }); // to update data when action .
  // ACTIONS -- >
  const deleteSession = useCallback((id) => {
    // call  runDelete and runDelete calls api method .
    setActionId(id); // set loading and get id from caller to know which item of data are deleting .
    runDelete(
      {
        param: id,
        headers: { Authorization: `Bearer ${authContext.adminToken}` },
      },
      {
        onSuccess: async () => {
          await new Promise((res, rej) => {
            // promise because when some action like delete is completed user shoud waite a little time to see loading .
            setTimeout(() => {
              setActionId(""); // reset action id to stop showing loading .
              res();
            }, 500);
          });
          refetch(); // update data
        },
      }
    );
  }, []);

  return (
    <SessionActionsContex.Provider
      value={{
        deleteEvent: {
          actionId, // which component calls (deleteSession) ? we will Know by using (actionId) .
          deleteSession, // this method responsible for call a method to delete a item by using prop id .
          isPending: isPendingDelete, // show loading procces for ui handling .
          result: deleteRsponse, // and this is a result .
        },
      }}
    >
      {/*ABOUT PORTAL // This module put a loding in a componet by using (actionId) while some actions still pending like delete or ... 
      // so if you want to use THIS CONTEXT you shoud have a element tag which has the same id if you cant understant, look this -> <div id="_..."> --> ... == (actionId)   */}
      {actionId && (
        <Portal container={`#_${actionId}`}>
          {/* While we have a action id it means a component that used deleteSession shoud show a loading */}
          Loading
        </Portal>
      )}

      {children}
    </SessionActionsContex.Provider>
  );
}
export { SessionActionsContex, SessionActionsProvider };
