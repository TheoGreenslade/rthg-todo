import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TodoListScreen } from "./screens/TodoListScreen/TodoListScreen.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoListScreen />
  </StrictMode>
);
