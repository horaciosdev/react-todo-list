import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ITaskList } from "../interfaces/interfaces";

interface ITaskListContext {
  taskLists: ITaskList[];
  newTaskList: () => void;
  setTaskLists: Dispatch<SetStateAction<ITaskList[]>>;
}
export const TaskListContext = createContext<ITaskListContext>({
  taskLists: [],
  newTaskList: () => {},
  setTaskLists: () => {},
});

export function TaskListProvider({ children }: { children: ReactNode }) {
  const [taskLists, setTaskLists] = useState<ITaskList[]>([]);
  function newTaskList() {
    const newTaskList: ITaskList = {
      id: Date.now(),
      update: Date.now(),
      title: "new task list",
      tasks: [],
    };
    setTaskLists([...taskLists, newTaskList]);
  }

  useEffect(() => {
    if (taskLists.length) {
      localStorage.setItem("tasklists", JSON.stringify(taskLists));
    } else {
      const localStorageTaskLists = localStorage.getItem("tasklists");
      if (localStorageTaskLists) {
        setTaskLists(JSON.parse(localStorageTaskLists));
      }
    }
  }, [taskLists]);

  return (
    <TaskListContext.Provider value={{ taskLists, newTaskList, setTaskLists }}>
      {children}
    </TaskListContext.Provider>
  );
}
