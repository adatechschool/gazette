import ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { StrictMode } from "react";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n/config";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider>
          <RouterProvider router={router} />
        </Provider>
      </I18nextProvider>
    </StrictMode>,
  );
}
