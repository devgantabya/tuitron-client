import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Router";
import AuthProvider from "./Contexts/AuthContext/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./Components/ThemeProvider/ThemeProvider";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="tuitron-ui-theme">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
