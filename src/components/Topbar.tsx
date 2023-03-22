import { Typography } from "@mui/material";

import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import { CustomAppBarFlex, CustomBoxFlex } from "./CustomMuiComponents";

export default function Topbar() {
  return (
    <CustomAppBarFlex position="sticky">
      <CustomBoxFlex>
        <ViewKanbanIcon sx={{ fontSize: "2rem" }} />
        <Typography variant="h5">KB</Typography>
      </CustomBoxFlex>
    </CustomAppBarFlex>
  );
}
