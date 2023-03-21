import { FaPencilAlt } from "react-icons/fa";

export default function EditTaskButton(props: any) {
  const { taskList, taskid, handleEditTask } = props;
  return (
    <button
      onClick={() => handleEditTask(taskList, taskid)}
      className="button edit-button"
      data-tooltip-content="Edit!"
    >
      <FaPencilAlt />
    </button>
  );
}
