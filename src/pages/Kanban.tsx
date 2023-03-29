import "react-tooltip/dist/react-tooltip.css";

import { useContext, useState } from "react";
import { Box, IconButton, Modal } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { CustomBoxFlex } from "../components/CustomMuiComponents";
import Topbar from "../components/Topbar";
import TaskList from "../components/TaskList";

import { TaskListContext } from "../context/TaskListContext";
import { ITask } from "../interfaces/interfaces";
import CreateNewTask from "../components/CreateNewTask";
import EditTask from "../components/EditTask";

function Kanban() {
  const { addTask, editTask, taskLists, newTaskList } =
    useContext(TaskListContext);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [taskListId, setTaskListId] = useState(0);

  // NEW TASK
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const openNewTaskModal = (refListId: number) => {
    setTaskListId(refListId);
    setNewTaskModal(true);
  };
  const closeNewTaskModal = () => {
    setNewTaskModal(false);
    setNewTaskDescription("");
  };

  const handleAddTask = () => {
    if (!newTaskDescription.trim()) return;

    const newTask: ITask = {
      id: Date.now(),
      description: newTaskDescription,
    };

    addTask(taskListId, newTask);

    setNewTaskDescription("");
    closeNewTaskModal();
  };

  // EDITI TASK
  const [editingTask, setEditingTask] = useState<ITask>();
  const [editTaskModal, setEditTaskModal] = useState(false);

  const openEditTaskModal = (refListId: number, taskId: number) => {
    setTaskListId(refListId);
    const refList = taskLists.find((tasklist) => tasklist.id == refListId);
    if (refList) {
      const task = refList.tasks.find((task) => task.id == taskId);
      setEditingTask(task);
      setEditTaskModal(true);
    }
  };
  const closeEditTaskModal = () => {
    setEditTaskModal(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingTask) {
      setEditingTask({ id: editingTask.id, description: e.target.value });
    }
  };

  const handleSaveChanges = () => {
    if (editingTask) {
      editTask(taskListId, editingTask.id, editingTask);
    }
    closeEditTaskModal();
  };

  const handleCancelEditTask = () => {
    closeEditTaskModal();
  };

  return (
    <Box className="App">
      <Box>
        <Topbar />

        <CustomBoxFlex sx={{ p: 2 }}>
          <IconButton
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "text.secondary",
            }}
            onClick={newTaskList}
            size="large"
          >
            <AddIcon />
          </IconButton>
        </CustomBoxFlex>

        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", p: 1 }}>
          {taskLists.map((taskList) => (
            <TaskList
              key={taskList.id}
              taskList={taskList}
              tasks={taskList.tasks}
              openNewTaskModal={() => openNewTaskModal(taskList.id)}
              openEditTaskModal={openEditTaskModal}
            />
          ))}
        </Box>
      </Box>

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
        <Box>
          <CreateNewTask
            handleCloseModal={closeNewTaskModal}
            newTaskDescription={newTaskDescription}
            setNewTaskDescription={setNewTaskDescription}
            handleAddTask={handleAddTask}
          />
        </Box>
      </Modal>

      {editingTask && (
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
            <EditTask
              handleEditChange={handleEditChange}
              editingTask={editingTask}
              handleSaveChanges={handleSaveChanges}
              handleCancelEditTask={handleCancelEditTask}
            />
          </Box>
        </Modal>
      )}
    </Box>
  );
}

export default Kanban;
