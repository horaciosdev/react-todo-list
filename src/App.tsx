import { useState, useEffect } from "react";
import { FaList, FaTools, FaCheck, FaTrash } from "react-icons/fa";
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
      <div className="container">
        <h1 className="header">
          <span>
            <FaList />
          </span>{" "}
          <span>TO</span>-<span>DO</span> <span>List</span>
        </h1>
        <div className="input-container">
          <input
            type="text"
            value={newTaskDescription}
            onChange={(event) => setNewTaskDescription(event.target.value)}
            placeholder="Adicione uma nova tarefa"
          />
          <button onClick={handleAddTask} className="button">
            Adicionar Tarefa
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
                      onClick={() => handleDoingTask(todoTasks, task.id)}
                      className="button doing-button"
                    >
                      <FaTools />
                    </button>
                    <button
                      onClick={() => handleDoneTask(todoTasks, task.id)}
                      className="button done-button"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(todoTasks, task.id)}
                      className="button delete-button"
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
                      onClick={() => handleToDoTask(doingTasks, task.id)}
                      className="button todo-button"
                    >
                      <FaList />
                    </button>
                    <button
                      onClick={() => handleDoneTask(doingTasks, task.id)}
                      className="button done-button"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(doingTasks, task.id)}
                      className="button delete-button"
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
                      onClick={() => handleToDoTask(doneTasks, task.id)}
                      className="button todo-button"
                    >
                      <FaList />
                    </button>
                    <button
                      onClick={() => handleDoingTask(doneTasks, task.id)}
                      className="button doing-button"
                    >
                      <FaTools />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(doneTasks, task.id)}
                      className="button delete-button"
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
