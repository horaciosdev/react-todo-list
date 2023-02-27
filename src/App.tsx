import { useState, useEffect } from "react";
import {
  FaList,
  FaTools,
  FaCheck,
  FaTrash,
  FaPencilAlt,
  FaTimes,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";
import "./App.css";

interface Task {
  id: number;
  description: string;
}

function App() {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [doingTasks, setDoingTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task>();
  const [editingArray, setEditingArray] = useState<Task[]>([]);

  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (!newTaskDescription.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      description: newTaskDescription,
    };

    setTodoTasks([...todoTasks, newTask]);
    setNewTaskDescription("");
  };

  const handleToDoTask = (taskArray: Task[], taskId: number) => {
    const movingTask = taskArray.find((task) =>
      task.id == taskId ? task : null
    );
    if (movingTask) {
      setTodoTasks([movingTask, ...todoTasks]);
      handleDeleteTask(taskArray, taskId);
    }
  };

  const handleDoingTask = (taskArray: Task[], taskId: number) => {
    const movingTask = taskArray.find((task) =>
      task.id == taskId ? task : null
    );
    if (movingTask) {
      setDoingTasks([movingTask, ...doingTasks]);
      handleDeleteTask(taskArray, taskId);
    }
  };

  const handleDoneTask = (taskArray: Task[], taskId: number) => {
    const movingTask = taskArray.find((task) =>
      task.id == taskId ? task : null
    );
    if (movingTask) {
      setDoneTasks([movingTask, ...doneTasks]);
      handleDeleteTask(taskArray, taskId);
    }
  };

  const handleDeleteTask = (taskArray: Task[], taskId: number) => {
    const newTasks = taskArray.filter((task) => task.id !== taskId);

    if (todoTasks == taskArray) {
      setTodoTasks(newTasks);
      window.localStorage.setItem("todoTasks", JSON.stringify(newTasks));
    }
    if (doingTasks == taskArray) {
      setDoingTasks(newTasks);
      window.localStorage.setItem("doingTasks", JSON.stringify(newTasks));
    }
    if (doneTasks == taskArray) {
      setDoneTasks(newTasks);
      window.localStorage.setItem("doneTasks", JSON.stringify(newTasks));
    }
  };

  const handleEditTask = (taskArray: Task[], taskId: number) => {
    setIsEditing(true);
    const taskTemp = taskArray.find((task) => task.id == taskId);
    if (taskTemp) {
      setEditingTask(taskTemp);
      setEditingArray(taskArray);
    }
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { id, description } = editingTask as Task;
    description = e.target.value;
    setEditingTask({ id, description });
  };

  const handleApplyChanges = () => {
    if (editingTask) {
      const newTaskArray = editingArray.map((task) =>
        task.id == editingTask.id ? (task = editingTask) : task
      );
      if (todoTasks == editingArray) {
        setTodoTasks(newTaskArray);
        window.localStorage.setItem("todoTasks", JSON.stringify(newTaskArray));
      }
      if (doingTasks == editingArray) {
        setDoingTasks(newTaskArray);
        window.localStorage.setItem("doingTasks", JSON.stringify(newTaskArray));
      }
      if (doneTasks == editingArray) {
        setDoneTasks(newTaskArray);
        window.localStorage.setItem("doneTasks", JSON.stringify(newTaskArray));
      }

      setEditingArray([]);
      setIsEditing(false);
    }
  };

  const handleCancelEditTask = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const todos = JSON.parse(window.localStorage.getItem("todoTasks") || "[]");
    const doings = JSON.parse(
      window.localStorage.getItem("doingTasks") || "[]"
    );
    const dones = JSON.parse(window.localStorage.getItem("doneTasks") || "[]");

    setTodoTasks(todos);
    setDoingTasks(doings);
    setDoneTasks(dones);
    setContentLoaded(true);
  }, []);

  useEffect(() => {
    if (contentLoaded) {
      window.localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
      window.localStorage.setItem("doingTasks", JSON.stringify(doingTasks));
      window.localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
    }
  }, [todoTasks, doingTasks, doneTasks]);

  return (
    <div className="App">
      {isEditing && editingTask && (
        <div className="overlay">
          <div className="modal">
            <input
              type="text"
              onChange={(e) => handleEditChange(e)}
              value={editingTask.description}
            />

            <div className="edit-buttons">
              <button className="button" onClick={() => handleApplyChanges()}>
                <FaCheck />
              </button>
              <button
                className="button cancel-button"
                onClick={handleCancelEditTask}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <Tooltip anchorSelect=".button" />
        <h1 className="header">
          <span>
            <FaList />
          </span>{" "}
          <span>To</span>
          <span>Do</span> <span>LIST</span>
        </h1>
        <div className="input-container">
          <input
            type="text"
            value={newTaskDescription}
            onChange={(event) => setNewTaskDescription(event.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={handleAddTask} className="button">
            Add a Task
          </button>
        </div>
        <div className="task-panel">
          <div className="task-column">
            <h2 className="panel-label label-todo">
              <FaList /> TO-DO
            </h2>
            <ul className="task-list task-todo">
              {todoTasks.map((task) => (
                <li key={task.id} className="task-item">
                  {task.description}
                  <div className="task-controls">
                    <button
                      onClick={() => handleEditTask(todoTasks, task.id)}
                      className="button edit-button"
                      data-tooltip-content="Edit!"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleDoingTask(todoTasks, task.id)}
                      className="button doing-button"
                      data-tooltip-content="Send this task to DOING!"
                    >
                      <FaTools />
                    </button>
                    <button
                      onClick={() => handleDoneTask(todoTasks, task.id)}
                      className="button done-button"
                      data-tooltip-content="Make it DONE!"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(todoTasks, task.id)}
                      className="button delete-button"
                      data-tooltip-content="DELETE"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="task-column">
            <h2 className="panel-label label-doing">
              <FaTools /> DOING
            </h2>
            <ul className="task-list task-doing">
              {doingTasks.map((task) => (
                <li key={task.id} className="task-item">
                  {task.description}
                  <div className="task-controls">
                    <button
                      onClick={() => handleEditTask(doingTasks, task.id)}
                      className="button edit-button"
                      data-tooltip-content="Edit!"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleToDoTask(doingTasks, task.id)}
                      className="button todo-button"
                      data-tooltip-content="Back to 'TO-DO'"
                    >
                      <FaList />
                    </button>
                    <button
                      onClick={() => handleDoneTask(doingTasks, task.id)}
                      className="button done-button"
                      data-tooltip-content="Make it DONE!"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(doingTasks, task.id)}
                      className="button delete-button"
                      data-tooltip-content="DELETE"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="task-column">
            <h2 className="panel-label label-done">
              <FaCheck />
              DONE
            </h2>
            <ul className="task-list task-done">
              {doneTasks.map((task) => (
                <li key={task.id} className="task-item">
                  {task.description}
                  <div className="task-controls">
                    <button
                      onClick={() => handleEditTask(doneTasks, task.id)}
                      className="button edit-button"
                      data-tooltip-content="Edit!"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleToDoTask(doneTasks, task.id)}
                      className="button todo-button"
                      data-tooltip-content="Back to 'TO-DO'"
                    >
                      <FaList />
                    </button>
                    <button
                      onClick={() => handleDoingTask(doneTasks, task.id)}
                      className="button doing-button"
                      data-tooltip-content="Send this task to DOING!"
                    >
                      <FaTools />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(doneTasks, task.id)}
                      className="button delete-button"
                      data-tooltip-content="DELETE"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
