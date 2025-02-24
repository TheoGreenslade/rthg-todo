import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TodoListScreen } from "./screens/TodoListScreen/TodoListScreen.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TodoListScreen />
    </QueryClientProvider>
  </StrictMode>
);
