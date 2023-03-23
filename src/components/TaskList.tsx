import { Paper, Typography, IconButton, Divider, List } from "@mui/material";
import {
  CustomCardTask,
  CustomFlexButtonGroup,
  CustomTaskListItem,
} from "./CustomMuiComponents";
import TaskButton from "./TaskButton";

import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit";
import ConstructionIcon from "@mui/icons-material/Construction";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import { ITask } from "../pages/Kanban";

export default function TaskList(props: any) {
  const { icon, title } = props;
  const { taskList } = props;
  const { sendToTodo, sendToDoing, sendToDone } = props;
  const { handleEditTask, handleDeleteTask } = props;
  return (
    <Paper elevation={4}>
      <Typography variant="h6">
        <IconButton aria-label="todo" size="medium">
          {icon}
        </IconButton>
        {title}
      </Typography>

      <Divider />

      <List>
        {taskList.map((task: ITask) => (
          <CustomTaskListItem key={task.id}>
            <CustomCardTask>
              <Typography>{task.description}</Typography>
              <Divider />
              <CustomFlexButtonGroup>
                <TaskButton
                  taskList={taskList}
                  taskid={task.id}
                  handleClick={handleEditTask}
                  icon={<EditIcon fontSize="inherit" />}
                />

                <TaskButton
                  taskList={taskList}
                  taskid={task.id}
                  handleClick={sendToTodo}
                  icon={<ListIcon fontSize="inherit" />}
                />

                <TaskButton
                  taskList={taskList}
                  taskid={task.id}
                  handleClick={sendToDoing}
                  icon={<ConstructionIcon fontSize="inherit" />}
                />

                <TaskButton
                  taskList={taskList}
                  taskid={task.id}
                  handleClick={sendToDone}
                  icon={<CheckIcon fontSize="inherit" />}
                />

                <TaskButton
                  taskList={taskList}
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
  );
}
