export default function AddTaskBar(props: any) {
  const { newTaskDescription, setNewTaskDescription, handleAddTask } = props;
  return (
    <div className="input-container">
      <textarea
        value={newTaskDescription}
        onChange={(event) => setNewTaskDescription(event.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask} className="button">
        Add a Task
      </button>
    </div>
  );
}
