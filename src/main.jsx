import { createRoot } from "react-dom/client";
// REACT QUERY >>
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient, setQueryDefaults } from "./libs/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
// _____________________________________________________________
import App from "./container/App";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, ToggleActionProvider } from "./context";
// _____________________________________________________________
setQueryDefaults();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename="/codelearn-admin">
      <ModalProvider>
        <ToggleActionProvider>
          <App />
        </ToggleActionProvider>
      </ModalProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
