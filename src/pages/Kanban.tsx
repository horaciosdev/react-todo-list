import { Box, IconButton, Modal } from "@mui/material";

import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";

import CreateNewTask from "../components/CreateNewTask";

import Topbar from "../components/Topbar";

import ListIcon from "@mui/icons-material/List";

import AddIcon from "@mui/icons-material/Add";
import { CustomBoxFlex } from "../components/CustomMuiComponents";
import EditTask from "../components/EditTask";
import TaskList from "../components/TaskList";

export interface ITask {
  id: number;
  description: string;
}

function Kanban() {
  const [todoTasks, setTodoTasks] = useState<ITask[]>([]);
  const [doingTasks, setDoingTasks] = useState<ITask[]>([]);
  const [doneTasks, setDoneTasks] = useState<ITask[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask>();
  const [editingArray, setEditingArray] = useState<ITask[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditing(false);
  };

  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (!newTaskDescription.trim()) return;

    const newTask: ITask = {
      id: Date.now(),
      description: newTaskDescription,
    };

    setTodoTasks([...todoTasks, newTask]);
    setNewTaskDescription("");
    handleCloseModal();
  };

  const sendToTodo = (taskArray: ITask[], taskId: number) => {
    if (taskArray !== todoTasks) {
      const movingTask = taskArray.find((task) =>
        task.id == taskId ? task : null
      );

      if (movingTask) {
        setTodoTasks([movingTask, ...todoTasks]);
        handleDeleteTask(taskArray, taskId);
      }
    }
  };

  const sendToDoing = (taskArray: ITask[], taskId: number) => {
    if (taskArray !== doingTasks) {
      const movingTask = taskArray.find((task) =>
        task.id == taskId ? task : null
      );
      if (movingTask) {
        setDoingTasks([movingTask, ...doingTasks]);
        handleDeleteTask(taskArray, taskId);
      }
    }
  };

  const sendToDone = (taskArray: ITask[], taskId: number) => {
    if (taskArray !== doneTasks) {
      const movingTask = taskArray.find((task) =>
        task.id == taskId ? task : null
      );
      if (movingTask) {
        setDoneTasks([movingTask, ...doneTasks]);
        handleDeleteTask(taskArray, taskId);
      }
    }
  };

  const handleDeleteTask = (taskArray: ITask[], taskId: number) => {
    const newTasks = taskArray.filter((task) => task.id !== taskId);

    if (todoTasks == taskArray) {
      setTodoTasks(newTasks);
      window.localStorage.setItem("todoTasks", JSON.stringify(newTasks));
    }
    if (doingTasks == taskArray) {
      setDoingTasks(newTasks);
      window.localStorage.setItem("doingTasks", JSON.stringify(newTasks));
    }
    if (doneTasks == taskArray) {
      setDoneTasks(newTasks);
      window.localStorage.setItem("doneTasks", JSON.stringify(newTasks));
    }
  };

  const handleEditTask = (taskArray: ITask[], taskId: number) => {
    setIsEditing(true);
    const taskTemp = taskArray.find((task) => task.id == taskId);
    if (taskTemp) {
      setEditingTask(taskTemp);
      setEditingArray(taskArray);
    }
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { id, description } = editingTask as ITask;
    description = e.target.value;
    setEditingTask({ id, description });
  };

  const handleApplyChanges = () => {
    if (editingTask) {
      const newTaskArray = editingArray.map((task) =>
        task.id == editingTask.id ? (task = editingTask) : task
      );
      if (todoTasks == editingArray) {
        setTodoTasks(newTaskArray);
        window.localStorage.setItem("todoTasks", JSON.stringify(newTaskArray));
      }
      if (doingTasks == editingArray) {
        setDoingTasks(newTaskArray);
        window.localStorage.setItem("doingTasks", JSON.stringify(newTaskArray));
      }
      if (doneTasks == editingArray) {
        setDoneTasks(newTaskArray);
        window.localStorage.setItem("doneTasks", JSON.stringify(newTaskArray));
      }

      setEditingArray([]);
      setIsEditing(false);
    }
  };

  const handleCancelEditTask = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const todos = JSON.parse(window.localStorage.getItem("todoTasks") || "[]");
    const doings = JSON.parse(
      window.localStorage.getItem("doingTasks") || "[]"
    );
    const dones = JSON.parse(window.localStorage.getItem("doneTasks") || "[]");

    setTodoTasks(todos);
    setDoingTasks(doings);
    setDoneTasks(dones);
    setContentLoaded(true);
  }, []);

  useEffect(() => {
    if (contentLoaded) {
      window.localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
      window.localStorage.setItem("doingTasks", JSON.stringify(doingTasks));
      window.localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
    }
  }, [todoTasks, doingTasks, doneTasks]);

  return (
    <Box className="App">
      <Modal
        open={isEditing && editingTask ? true : false}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          {editingTask && (
            <EditTask
              handleEditChange={handleEditChange}
              editingTask={editingTask}
              handleApplyChanges={handleApplyChanges}
              handleCancelEditTask={handleCancelEditTask}
            />
          )}
        </Box>
      </Modal>

      <Box>
        <Topbar />

        <CustomBoxFlex sx={{ p: 2 }}>
          <IconButton
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "text.secondary",
            }}
            onClick={handleOpenModal}
            size="large"
          >
            <AddIcon />
          </IconButton>
        </CustomBoxFlex>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CreateNewTask
            handleCloseModal={handleCloseModal}
            newTaskDescription={newTaskDescription}
            setNewTaskDescription={setNewTaskDescription}
            handleAddTask={handleAddTask}
          />
        </Modal>

        <CustomBoxFlex sx={{ gap: 1 }}>
          <TaskList
            icon={<ListIcon fontSize="inherit" />}
            title={"TO-DO"}
            taskList={todoTasks}
            sendToTodo={sendToTodo}
            sendToDoing={sendToDoing}
            sendToDone={sendToDone}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
          <TaskList
            icon={<ListIcon fontSize="inherit" />}
            title={"DOING"}
            taskList={doingTasks}
            sendToTodo={sendToTodo}
            sendToDoing={sendToDoing}
            sendToDone={sendToDone}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
          <TaskList
            icon={<ListIcon fontSize="inherit" />}
            title={"DONE"}
            taskList={doneTasks}
            sendToTodo={sendToTodo}
            sendToDoing={sendToDoing}
            sendToDone={sendToDone}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
        </CustomBoxFlex>
      </Box>
      <Tooltip anchorSelect=".button" />
    </Box>
  );
}

export default Kanban;
