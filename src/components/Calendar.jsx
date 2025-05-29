import React, { useState, useEffect, useRef } from "react";

const Calendar = ({
  onAddTask,
  tasks = [], // [{ day: number, name: string }]
  onMonthYearChange,
  currentYear: propYear,
  currentMonth: propMonth,
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    propMonth ?? new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    propYear ?? new Date().getFullYear()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof propYear === "number") setCurrentYear(propYear);
  }, [propYear]);

  useEffect(() => {
    if (typeof propMonth === "number") setCurrentMonth(propMonth);
  }, [propMonth]);

  useEffect(() => {
    if (onMonthYearChange) onMonthYearChange(currentYear, currentMonth);
  }, [currentMonth, currentYear, onMonthYearChange]);

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const tasksOfSelectedDay = tasks.filter((t) => t.day === selectedDay);

  const openModal = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setNewTaskName("");
    setIsModalOpen(false);
  };

  const handleAddTask = () => {
    const trimmedName = newTaskName.trim();
    if (!trimmedName || selectedDay == null) return;

    // Impede duplicar tarefas iguais no mesmo dia
    const duplicate = tasks.some(
      (t) =>
        t.day === selectedDay &&
        t.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicate) {
      alert("Essa tarefa já foi adicionada para este dia.");
      return;
    }

    onAddTask({ day: selectedDay, name: trimmedName });
    setNewTaskName("");
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  const hasTaskOnDay = (day) => tasks.some((t) => t.day === day);

  return (
    <div className="calendar-container p-4 bg-white rounded shadow max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-rose-600 hover:text-rose-800 font-bold"
          aria-label="Mês anterior"
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold text-center flex-grow">
          {new Date(currentYear, currentMonth).toLocaleString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-rose-600 hover:text-rose-800 font-bold"
          aria-label="Próximo mês"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-700">
        {weekDays.map((day, i) => (
          <div key={i}>{day}</div>
        ))}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const hasTask = hasTaskOnDay(day);
          const isSelected = day === selectedDay && isModalOpen;

          return (
            <button
              key={day}
              onClick={() => openModal(day)}
              aria-label={`Dia ${day}${hasTask ? ", com tarefa" : ""}`}
              className={`border rounded p-2 relative hover:bg-rose-200 focus:outline-none transition ${
                isSelected ? "bg-rose-100 border-rose-600" : ""
              }`}
            >
              {day}
              {hasTask && (
                <span className="absolute top-1 right-1 text-xs font-bold text-rose-600">
                  X
                </span>
              )}
            </button>
          );
        })}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-80 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              Tarefas para {selectedDay}/{currentMonth + 1}/{currentYear}
            </h3>

            {tasksOfSelectedDay.length === 0 && (
              <p className="mb-4 text-gray-500">Nenhuma tarefa neste dia.</p>
            )}

            <ul className="mb-4 list-disc list-inside max-h-40 overflow-auto">
              {tasksOfSelectedDay.map((task, idx) => (
                <li key={idx} className="text-gray-800">
                  {task.name}
                </li>
              ))}
            </ul>

            <input
              type="text"
              placeholder="Nova tarefa"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              ref={inputRef}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Fechar
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
