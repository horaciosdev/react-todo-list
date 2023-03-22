import {
  Box,
  Button,
  Divider,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { CustomBoxFlex } from "./CustomMuiComponents";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CreateNewTask(props: any) {
  const {
    newTaskDescription,
    setNewTaskDescription,
    handleAddTask,
    handleCloseModal,
  } = props;
  return (
    <CustomBoxFlex
      sx={{
        width: 400,
        maxWidth: "100vw",
        bgcolor: "background.paper",
        boxShadow: "0 3px 3px 0px #999",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 2,
        gap: 1,
        p: 2,
      }}
    >
      <Typography variant="h6">New Task</Typography>

      <TextareaAutosize
        aria-label="minimum height"
        minRows={6}
        placeholder="Write a new task"
        style={{ width: 300 }}
        value={newTaskDescription}
        onChange={(event) => setNewTaskDescription(event.target.value)}
      />

      <CustomBoxFlex sx={{ gap: 2 }}>
        <Button
          size="large"
          onClick={handleAddTask}
          variant="contained"
          startIcon={<PlaylistAddIcon />}
        >
          Add Task
        </Button>
        <Button
          color="error"
          size="large"
          onClick={handleCloseModal}
          variant="contained"
          endIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </CustomBoxFlex>
    </CustomBoxFlex>
  );
}
