import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

import { useContext, useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { CustomBoxFlex } from "../components/CustomMuiComponents";
import Topbar from "../components/Topbar";
import TaskList from "../components/TaskList";

import { TaskListContext } from "../context/TaskListContext";

function Kanban() {
  const { taskLists, newTaskList } = useContext(TaskListContext);

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
