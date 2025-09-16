import { createContext, useCallback, useState } from "react";
const ToggleActionsContext = createContext({
  sideBar: false,
  sideBarHandler: () => {},
});

function ToggleActionProvider({ children }) {
  // this is a state can handle open or close for side bar !
  const [sideBar, setSideBar] = useState(false); // << false close / true open

  const sideBarHandler = useCallback(() => setSideBar, []);

  // Context value providers -- >
  const contextValue = {
    sideBar,
    
    sideBarHandler,
   
  };
  return (
    <ToggleActionsContext.Provider value={contextValue}>
      {children}
    </ToggleActionsContext.Provider>
  );
}
export { ToggleActionProvider, ToggleActionsContext };
