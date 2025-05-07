import { ThemeProvider } from "@/context/ThemeProvider";
import "@/styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";

export enum RouteDefinition {
  INDEX = "/",
  LOGIN = "/login",
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />} path={RouteDefinition.INDEX} />
      {/* <Route element={<Login />} path={RouteDefinition.LOGIN} /> */}
    </>
  )
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
