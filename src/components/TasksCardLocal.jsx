import React from "react";
import {
  updateTaskInFirestore,
  deleteTaskFromFirestore,
} from "../api/api-tasks";
import { useAuth } from "../services/AuthContext";
import { Trash2 } from "lucide-react";

const TasksCardLocal = ({ tasks, onProgressUpdate }) => {
  const { currentUser } = useAuth();

  // Marcar tarefa como feita/não feita
  const toggleTaskDone = async (task) => {
    try {
      await updateTaskInFirestore(currentUser.uid, task.id, {
        done: !task.done,
      });

      // Atualiza progresso local
      const total = tasks.length;
      const doneCount = tasks.filter((t) =>
        t.id === task.id ? !t.done : t.done
      ).length;

      onProgressUpdate(doneCount, total);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  // Excluir tarefa
  const handleDelete = async (taskId) => {
    try {
      await deleteTaskFromFirestore(currentUser.uid, taskId);
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500">Nenhuma tarefa adicionada.</p>;
  }

  return (
    <div className="max-h-64 overflow-auto pr-2">
      <ul className="list-disc list-inside space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={task.done || false}
                onChange={() => toggleTaskDone(task)}
                className="mr-2"
              />
              <span className={task.done ? "line-through text-gray-500" : ""}>
                <strong>Dia {task.day}:</strong> {task.name}
              </span>
            </label>
            <button
              onClick={() => handleDelete(task.id)}
              className="ml-2 text-red-500 hover:text-red-700"
              title="Excluir tarefa"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksCardLocal;
