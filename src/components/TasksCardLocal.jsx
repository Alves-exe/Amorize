import { useEffect, useState } from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { Dot, ListChecks } from "lucide-react";

function TasksCardLocal({ onProgressUpdate }) {
  const currentUser = JSON.parse(localStorage.getItem("amorize_current_user"));
  const userId = currentUser?.id;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const saveTasksToLocalStorage = (userId, tasks) => {
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
  };

  const getTasksFromLocalStorage = (userId) => {
    const stored = localStorage.getItem(`tasks_${userId}`);
    return stored ? JSON.parse(stored) : [];
  };

  const updateProgress = (taskList) => {
    const total = taskList.length;
    const done = taskList.filter((task) => task.completed).length;
    if (typeof onProgressUpdate === "function") {
      onProgressUpdate(done, total);
    }
  };

  useEffect(() => {
    if (userId) {
      const storedTasks = getTasksFromLocalStorage(userId);
      setTasks(storedTasks);
      updateProgress(storedTasks);
    }
  }, [userId]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };

    const updatedTasks = [...tasks, newTaskObj];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(userId, updatedTasks);
    updateProgress(updatedTasks);
    setNewTask("");
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(userId, updatedTasks);
    updateProgress(updatedTasks);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(userId, updatedTasks);
    updateProgress(updatedTasks);
  };

  return (
    <div className="bg-white shadow-md rounded-lg  w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Minhas Tarefas{" "}
        <ListChecks size={30} className="inline-flex ml-20 text-rose-400" />
      </h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Adicionar tarefa"
          className="flex-1 border p-2 rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
          onClick={handleAddTask}
        >
          +
        </button>
      </div>

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border border-rose-200 p-2 rounded"
          >
            <Dot size={30} className="text-rose-500" />
            <span
              onClick={() => handleToggleComplete(task.id)}
              className={`cursor-pointer flex-1 ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </span>
            <div className="flex gap-2 items-center">
              {task.completed && <FaCheckCircle className="text-green-500" />}
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(task.id)}
              />
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center">
            Sem tarefas ainda.
          </p>
        )}
      </ul>
    </div>
  );
}

export default TasksCardLocal;
