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

const style = {
  width: 400,
  maxWidth: "100vw",
  bgcolor: "background.paper",
  boxShadow: 12,
  p: 2,
  borderRadius: 1,
};

export default function CreateNewTask(props: any) {
  const {
    newTaskDescription,
    setNewTaskDescription,
    handleAddTask,
    handleCloseModal,
  } = props;
  return (
    <CustomBoxFlex sx={style}>
      <Typography variant="h6">New Task</Typography>
      <Box>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={4}
          placeholder="Write a new task"
          style={{ width: 300 }}
          value={newTaskDescription}
          onChange={(event) => setNewTaskDescription(event.target.value)}
        />
      </Box>

      <Divider />

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
  );
}