import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ITask, ITaskList } from "../interfaces/interfaces";

interface ITaskListContext {
  taskLists: ITaskList[];
  newTaskList: () => void;
  updateTaskList: (taskListId: number, newTaskList: ITaskList) => void;
  deleteTaskList: (taskListId: number) => void;
  addTask: (taskListId: number, task: ITask) => void;
  deleteTask: (taskListId: number, taskId: number) => void;
  editTask: (taskListId: number, taskId: number, newTask: ITask) => void;
  setTaskLists: Dispatch<SetStateAction<ITaskList[]>>;
}
export const TaskListContext = createContext<ITaskListContext>({
  taskLists: [],
  newTaskList: () => {},
  updateTaskList: () => {},
  deleteTaskList: () => {},
  addTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
  setTaskLists: () => {},
});

export function TaskListProvider({ children }: { children: ReactNode }) {
  const [taskLists, setTaskLists] = useState<ITaskList[]>([]);
  function newTaskList() {
    const newTaskList: ITaskList = {
      id: Date.now(),
      update: Date.now(),
      title: "",
      tasks: [],
    };
    setTaskLists([...taskLists, newTaskList]);
  }

  const updateTaskList = (taskListId: number, newTaskList: ITaskList) => {
    const newTaskLists = taskLists.map((tasklist) =>
      tasklist.id == taskListId ? newTaskList : tasklist
    );
    setTaskLists(newTaskLists);
  };

  const deleteTaskList = (taskListId: number) => {
    if (taskLists.length === 1 && taskLists[0].id === taskListId) {
      setTaskLists([]);
      localStorage.setItem("tasklists", JSON.stringify([]));
    } else {
      const newTaskLists = taskLists.filter(
        (tasklist) => tasklist.id != taskListId
      );
      setTaskLists(newTaskLists);
    }
  };

  const addTask = (taskListId: number, task: ITask) => {
    const newTaskLists = taskLists.map((tasklist) =>
      tasklist.id == taskListId
        ? {
            ...tasklist,
            tasks: [...tasklist.tasks, task],
          }
        : tasklist
    );
    setTaskLists(newTaskLists);
  };

  const deleteTask = (taskListId: number, taskId: number) => {
    const newTaskLists = taskLists.map((tasklist) =>
      tasklist.id == taskListId
        ? {
            ...tasklist,
            tasks: tasklist.tasks.filter((task) => task.id != taskId),
          }
        : tasklist
    );
    setTaskLists(newTaskLists);
  };

  const editTask = (taskListId: number, taskId: number, newTask: ITask) => {
    const newTaskLists = taskLists.map((tasklist) =>
      tasklist.id == taskListId
        ? {
            ...tasklist,
            tasks: tasklist.tasks.map((task) =>
              task.id == taskId ? newTask : task
            ),
          }
        : tasklist
    );

    setTaskLists(newTaskLists);
  };

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
    <TaskListContext.Provider
      value={{
        taskLists,
        newTaskList,
        updateTaskList,
        deleteTaskList,
        addTask,
        deleteTask,
        editTask,
        setTaskLists,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
}
