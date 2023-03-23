import {
  Paper,
  Typography,
  IconButton,
  Divider,
  List,
  Box,
  Modal,
} from "@mui/material";
import {
  CustomBoxFlex,
  CustomCardTask,
  CustomFlexButtonGroup,
  CustomTaskListItem,
} from "./CustomMuiComponents";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { ITask } from "../pages/Kanban";
import CreateNewTask from "./CreateNewTask";
import { useState } from "react";
import EditTask from "./EditTask";

export default function TaskList(props: any) {
  const { taskList } = props;
  const { title } = taskList;
  const [tasks, setTasks] = useState<ITask[]>(taskList.tasks);

  const [editingTask, setEditingTask] = useState<ITask>();

  // MODALS
  const [newTaskModal, setNewTaskModal] = useState(false);
  const openNewTaskModal = () => setNewTaskModal(true);
  const closeNewTaskModal = () => {
    setNewTaskModal(false);
  };

  const [editTaskModal, setEditTaskModal] = useState(false);
  const openEditTaskModal = (taskId: number) => {
    setEditingTask(tasks.find((task) => task.id === taskId));
    setEditTaskModal(true);
  };
  const closeEditTaskModal = () => {
    setEditTaskModal(false);
  };

  // NEW TASK
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (!newTaskDescription.trim()) return;

    const newTask: ITask = {
      id: Date.now(),
      description: newTaskDescription,
    };

    setTasks([...tasks, newTask]);
    setNewTaskDescription("");
    closeNewTaskModal();
  };

  //EDITING
  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingTask) {
      setEditingTask({ id: editingTask.id, description: e.target.value });
    }
  };

  const handleSaveChanges = () => {
    if (editingTask) {
      const newTaskList = tasks.map((task) => {
        task.id == editingTask.id
          ? (task.description = editingTask.description)
          : task;
        return task;
      });
      setTasks(newTaskList);
    }
    closeEditTaskModal();
  };

  const handleCancelEditTask = () => {
    closeEditTaskModal();
  };

  //DELETING
  const handleDeleteTask = (taskId: number) => {
    const newTaskList = tasks.filter((task) => task.id !== taskId);

    if (newTaskList != tasks) {
      setTasks(newTaskList);
    }
  };

  return (
    <Paper elevation={4} sx={{ width: "300px", maxWidth: "100%" }}>
      <Modal
        open={newTaskModal}
        onClose={closeNewTaskModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CreateNewTask
          handleCloseModal={closeNewTaskModal}
          newTaskDescription={newTaskDescription}
          setNewTaskDescription={setNewTaskDescription}
          handleAddTask={handleAddTask}
        />
      </Modal>

      <Modal
        open={editTaskModal}
        onClose={closeEditTaskModal}
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
              handleSaveChanges={handleSaveChanges}
              handleCancelEditTask={handleCancelEditTask}
            />
          )}
        </Box>
      </Modal>

      <CustomBoxFlex
        sx={{ p: 1, justifyContent: "space-between", alignItems: "center" }}
      >
        <CustomBoxFlex
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="h6">{title}</Typography>
        </CustomBoxFlex>

        <IconButton
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "text.secondary",
          }}
          onClick={openNewTaskModal}
          size="small"
        >
          <AddIcon />
        </IconButton>
      </CustomBoxFlex>

      <Divider />

      <List>
        {tasks.map((task: ITask) => (
          <CustomTaskListItem key={task.id}>
            <CustomCardTask>
              <Typography
                sx={{
                  wordBreak: "break-word",
                }}
              >
                {task.description}
              </Typography>
              <Divider />
              <CustomFlexButtonGroup>
                <IconButton
                  onClick={() => openEditTaskModal(task.id)}
                  size="small"
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>

                <IconButton
                  onClick={() => handleDeleteTask(task.id)}
                  size="small"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </CustomFlexButtonGroup>
            </CustomCardTask>
          </CustomTaskListItem>
        ))}
      </List>
    </Paper>
  );
}
