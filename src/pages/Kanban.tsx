import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

import { useState } from "react";
import { Box, IconButton } from "@mui/material";

import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";

import { CustomBoxFlex } from "../components/CustomMuiComponents";
import Topbar from "../components/Topbar";
import TaskList from "../components/TaskList";

export interface ITask {
  id: number;
  description: string;
}

interface ITaskList {
  id: number;
  title: string;
  tasks: ITask[];
}

function Kanban() {
  const [taskLists, setTaskLists] = useState<ITaskList[]>([]);
  function newTaskList() {
    const newTaskList: ITaskList = {
      id: Date.now(),
      title: "new task list",
      tasks: [],
    };
    setTaskLists([...taskLists, newTaskList]);
  }

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

        <CustomBoxFlex sx={{ gap: 1 }}>
          {taskLists.map((taskList, index) => (
            <TaskList key={index} taskList={taskList} />
          ))}
        </CustomBoxFlex>
      </Box>
      <Tooltip anchorSelect=".button" />
    </Box>
  );
}

export default Kanban;
