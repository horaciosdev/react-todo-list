import { Button, TextareaAutosize, Typography } from "@mui/material";
import { CustomBoxFlex } from "./CustomMuiComponents";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CancelIcon from "@mui/icons-material/Cancel";

export default function EditTask(props: any) {
  const {
    handleEditChange,
    editingTask,
    handleApplyChanges,
    handleCancelEditTask,
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
      <Typography variant="h6">Edit Task</Typography>

      <TextareaAutosize
        aria-label="minimum height"
        minRows={6}
        placeholder="Edit this task"
        style={{ width: 300 }}
        onChange={(e) => handleEditChange(e)}
        value={editingTask.description}
      />

      <CustomBoxFlex sx={{ gap: 2 }}>
        <Button
          size="large"
          onClick={handleApplyChanges}
          variant="outlined"
          startIcon={<PlaylistAddIcon />}
        >
          Save Task
        </Button>
        <Button
          color="error"
          size="large"
          onClick={handleCancelEditTask}
          variant="outlined"
          endIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </CustomBoxFlex>
    </CustomBoxFlex>
  );
}
