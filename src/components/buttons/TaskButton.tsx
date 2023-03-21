import IconButton from "@mui/material/IconButton";

export default function TaskButton(props: any) {
  const { taskList, taskid, handleClick, icon } = props;
  return (
    <IconButton onClick={() => handleClick(taskList, taskid)} size="medium">
      {icon}
    </IconButton>
  );
}
