import {
  Paper,
  Typography,
  IconButton,
  Divider,
  List,
  Box,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";

import Fade from "@mui/material/Fade";
import {
  CustomBoxFlex,
  CustomCardTask,
  CustomFlexButtonGroup,
  CustomTaskListItem,
} from "./CustomMuiComponents";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { ITask, ITaskList } from "../interfaces/interfaces";
import { useContext, useState } from "react";
import { TaskListContext } from "../context/TaskListContext";

export default function TaskList(props: any) {
  const { updateTaskList, deleteTaskList, deleteTask, editTask } =
    useContext(TaskListContext);

  const { tasks, openNewTaskModal, openEditTaskModal } = props;
  const [taskList, setTaskList] = useState<ITaskList>(props.taskList);

  function handleChangeCollumnTitle(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const updatedetTaskList = {
      ...taskList,
      title: event.target.value,
      update: Date.now(),
    };
    setTaskList(updatedetTaskList);
    updateTaskList(taskList.id, updatedetTaskList);
  }

  //DELETING
  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskList.id, taskId);
  };

  const handleDeleteTaskList = (taskListId: number) => {
    deleteTaskList(taskListId);
    handleCloseTaskMenu();
  };

  //task menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenTaskMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseTaskMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: "300px",
        minWidth: "300px",
        maxWidth: "100%",
      }}
    >
      <CustomBoxFlex
        sx={{
          pl: 1,
          pt: 1,
          pr: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomBoxFlex
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <TextField
            inputProps={{ spellCheck: "false" }}
            multiline
            maxRows={4}
            variant="standard"
            value={taskList.title}
            onChange={handleChangeCollumnTitle}
            autoFocus
            onFocus={(event) =>
              event?.target.setSelectionRange(
                taskList.title.length,
                taskList.title.length
              )
            }
          />
        </CustomBoxFlex>

        <Box>
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

          <IconButton onClick={handleOpenTaskMenu} size="small">
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseTaskMenu}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => handleDeleteTaskList(taskList.id)}>
              <DeleteIcon />
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </CustomBoxFlex>

      <Box sx={{ pl: 1 }}>
        <Typography variant="caption">
          {getDateString(taskList.update)}
        </Typography>
      </Box>

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
                  onClick={() => openEditTaskModal(taskList.id, task.id)}
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

function getDateString(date: number) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const datestring = new Date(date).toLocaleDateString("pt-br", options);
  return datestring;
}
