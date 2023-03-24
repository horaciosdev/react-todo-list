import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { TaskListProvider } from "./context/TaskListContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TaskListProvider>
      <App />
    </TaskListProvider>
  </React.StrictMode>
);
