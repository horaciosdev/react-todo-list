import { AppBar, Box } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";

export const CustomAppBarFlex = styled(AppBar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 1,
});

export const CustomBoxFlex = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  flexWrap: "wrap",
  gap: 1,
});

export const CustomTaskListItem = styled(ListItem)({
  width: "300px",
  maxWidth: "100%",
});

export const CustomFlexButtonGroup = styled(ButtonGroup)({
  display: "flex",
  justifyContent: "space-between",
});

export const CustomCardTask = styled(Card)({
  boxShadow: "0 1px 4px 0px #888",
  padding: 5,
  width: "100%",
});
