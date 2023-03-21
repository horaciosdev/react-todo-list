import { FaTrash } from "react-icons/fa";

export default function DeleteTaskButton(props: any) {
  const { taskList, taskid, handleDeleteTask } = props;
  return (
    <button
      onClick={() => handleDeleteTask(taskList, taskid)}
      className="button delete-button"
      data-tooltip-content="DELETE"
    >
      <FaTrash />
    </button>
  );
}
