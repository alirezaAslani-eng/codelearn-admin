// modal state rule is that true means opened modal and false means closed modal >>>
import { Portal } from "@mui/material";
import { createContext, useCallback, useState } from "react";
const ModalContext = createContext({});
export default function ModalProvider({ children }) {
  // this modal allow you to apply an off on all your products !
  const [addOffOnAll, setAddOffOnAll] = useState(false);
  // memoizing -- >
  const addOffOnAllModalHandler = useCallback(() => {
    return setAddOffOnAll;
  }, []);
  const providerValues = {
    addOffOnAllModalHandler,
    addOffOnAll,
  };
  return (
    <>
      <ModalContext.Provider value={providerValues}>
        {children}
      </ModalContext.Provider>
      {/* All of Modals are here to portal -- > */}
      <Portal container={document.querySelector("#modals-wrrapper")}>
                
      </Portal>
    </>
  );
}
export { ModalProvider, ModalContext };
