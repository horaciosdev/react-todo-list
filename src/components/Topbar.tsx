import { Typography } from "@mui/material";

import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import { CustomAppBarFlex, CustomBoxFlex } from "./CustomMuiComponents";

export default function Topbar() {
  return (
    <CustomAppBarFlex position="sticky">
      <CustomBoxFlex>
        <Typography variant="h3">
          <ViewKanbanIcon sx={{ fontSize: "inherit" }} />
        </Typography>
        <Typography variant="h3">ToDo Kanbam</Typography>
      </CustomBoxFlex>
    </CustomAppBarFlex>
  );
}
