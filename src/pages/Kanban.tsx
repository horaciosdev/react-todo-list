import { Box, IconButton, List, Modal, Paper } from "@mui/material";

import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography/Typography";
import { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";

import CreateNewTask from "../components/CreateNewTask";

import Topbar from "../components/Topbar";
import TaskButton from "../components/TaskButton";

import ListIcon from "@mui/icons-material/List";
import ConstructionIcon from "@mui/icons-material/Construction";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  CustomBoxFlex,
  CustomCardTask,
  CustomFlexButtonGroup,
  CustomTaskListItem,
} from "../components/CustomMuiComponents";
import EditTask from "../components/EditTask";

interface Task {
  id: number;
  description: string;
}

function Kanban() {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [doingTasks, setDoingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task>();
  const [editingArray, setEditingArray] = useState<Task[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditing(false);
  };

  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (!newTaskDescription.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      description: newTaskDescription,
    };

    setTodoTasks([...todoTasks, newTask]);
    setNewTaskDescription("");
    handleCloseModal();
  };

  const sendToTodo = (taskArray: Task[], taskId: number) => {
    const movingTask = taskArray.find((task) =>
      task.id == taskId ? task : null
    );
    if (movingTask) {
      setTodoTasks([movingTask, ...todoTasks]);
      handleDeleteTask(taskArray, taskId);
    }
  };

  const sendToDoing = (taskArray: Task[], taskId: number) => {
    const movingTask = taskArray.find((task) =>
      task.id == taskId ? task : null
    );
    if (movingTask) {
      setDoingTasks([movingTask, ...doingTasks]);
      handleDeleteTask(taskArray, taskId);
    }
  };

  const sendToDone = (taskArray: Task[], taskId: number) => {
    const movingTask = taskArray.find((task) =>
      task.id == taskId ? task : null
    );
    if (movingTask) {
      setDoneTasks([movingTask, ...doneTasks]);
      handleDeleteTask(taskArray, taskId);
    }
  };

  const handleDeleteTask = (taskArray: Task[], taskId: number) => {
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

  const handleEditTask = (taskArray: Task[], taskId: number) => {
    setIsEditing(true);
    const taskTemp = taskArray.find((task) => task.id == taskId);
    if (taskTemp) {
      setEditingTask(taskTemp);
      setEditingArray(taskArray);
    }
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { id, description } = editingTask as Task;
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
          <Paper elevation={4}>
            <Typography variant="h6">
              <IconButton aria-label="todo" size="medium">
                <ListIcon fontSize="inherit" />
              </IconButton>
              TO-DO
            </Typography>

            <Divider />

            <List>
              {todoTasks.map((task) => (
                <CustomTaskListItem key={task.id}>
                  <CustomCardTask>
                    <Typography>{task.description}</Typography>
                    <Divider />
                    <CustomFlexButtonGroup>
                      <TaskButton
                        taskList={todoTasks}
                        taskid={task.id}
                        handleClick={handleEditTask}
                        icon={<EditIcon fontSize="inherit" />}
                      />

                      <TaskButton
                        taskList={todoTasks}
                        taskid={task.id}
                        handleClick={sendToDoing}
                        icon={<ConstructionIcon fontSize="inherit" />}
                      />

                      <TaskButton
                        taskList={todoTasks}
                        taskid={task.id}
                        handleClick={sendToDone}
                        icon={<CheckIcon fontSize="inherit" />}
                      />

                      <TaskButton
                        taskList={todoTasks}
                        taskid={task.id}
                        handleClick={handleDeleteTask}
                        icon={<DeleteIcon fontSize="inherit" />}
                      />
                    </CustomFlexButtonGroup>
                  </CustomCardTask>
                </CustomTaskListItem>
              ))}
            </List>
          </Paper>

          <Paper elevation={4}>
            <Typography variant="h6">
              <IconButton aria-label="todo" size="medium">
                <ConstructionIcon fontSize="inherit" />
              </IconButton>
              DOING
            </Typography>

            <Divider />

            <List>
              {doingTasks.map((task) => (
                <CustomTaskListItem key={task.id}>
                  <CustomCardTask>
                    <Typography>{task.description}</Typography>
                    <Divider />
                    <CustomFlexButtonGroup>
                      <TaskButton
                        taskList={doingTasks}
                        taskid={task.id}
                        handleClick={handleEditTask}
                        icon={<EditIcon fontSize="inherit" />}
                      />

                      <TaskButton
                        taskList={doingTasks}
                        taskid={task.id}
                        handleClick={sendToTodo}
                        icon={<ListIcon fontSize="inherit" />}
                      />

                      <TaskButton
                        taskList={doingTasks}
                        taskid={task.id}
                        handleClick={sendToDone}
                        icon={<CheckIcon fontSize="inherit" />}
                      />
                      <TaskButton
                        taskList={doingTasks}
                        taskid={task.id}
                        handleClick={handleDeleteTask}
                        icon={<DeleteIcon fontSize="inherit" />}
                      />
                    </CustomFlexButtonGroup>
                  </CustomCardTask>
                </CustomTaskListItem>
              ))}
            </List>
          </Paper>

          <Paper elevation={4}>
            <Typography variant="h6">
              <IconButton aria-label="todo" size="medium">
                <CheckIcon fontSize="inherit" />
              </IconButton>
              DONE
            </Typography>

            <Divider />

            <List>
              {doneTasks.map((task) => (
                <CustomTaskListItem key={task.id}>
                  <CustomCardTask>
                    <Typography>{task.description}</Typography>
                    <Divider />
                    <CustomFlexButtonGroup>
                      <TaskButton
                        taskList={doneTasks}
                        taskid={task.id}
                        handleClick={handleEditTask}
                        icon={<EditIcon fontSize="inherit" />}
                      />

                      <TaskButton
                        taskList={doneTasks}
                        taskid={task.id}
                        handleClick={sendToTodo}
                        icon={<ListIcon fontSize="inherit" />}
                      />

                      <TaskButton
                        taskList={doneTasks}
                        taskid={task.id}
                        handleClick={sendToDoing}
                        icon={<ConstructionIcon fontSize="inherit" />}
                      />

                      <TaskButton
                        taskList={doneTasks}
                        taskid={task.id}
                        handleClick={handleDeleteTask}
                        icon={<DeleteIcon fontSize="inherit" />}
                      />
                    </CustomFlexButtonGroup>
                  </CustomCardTask>
                </CustomTaskListItem>
              ))}
            </List>
          </Paper>
        </CustomBoxFlex>
      </Box>
      <Tooltip anchorSelect=".button" />
    </Box>
  );
}

export default Kanban;
