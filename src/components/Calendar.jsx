import React, { useState } from "react";

const Calendar = ({ onAddTask }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [taskName, setTaskName] = useState("");

  // Função para obter o nome do mês
  const getCurrentMonth = () => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return months[currentMonth];
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const days = [];
    let day = 1;

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = firstDay; i < firstDay + daysInMonth; i++) {
      days.push(day++);
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleTaskSubmit = () => {
    if (taskName.trim()) {
      // Passando a tarefa para o componente pai (TasksCardLocal)
      onAddTask({ day: selectedDay, name: taskName });
      setTaskName("");
      setIsModalOpen(false);
    }
  };

  const days = generateCalendar();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-xl text-rose-500 hover:text-rose-600"
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          {getCurrentMonth()} {currentYear}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-xl text-rose-500 hover:text-rose-600"
        >
          &gt;
        </button>
      </div>

      {/*dias da semana*/}
      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        <div className="font-semibold text-sm text-rose-400">Dom</div>
        <div className="font-semibold text-sm text-rose-400">Seg</div>
        <div className="font-semibold text-sm text-rose-400">Ter</div>
        <div className="font-semibold text-sm text-rose-400">Qua</div>
        <div className="font-semibold text-sm text-rose-400">Qui</div>
        <div className="font-semibold text-sm text-rose-400">Sex</div>
        <div className="font-semibold text-sm text-rose-400">Sáb</div>
      </div>

      {/*dias do mes e o bg*/}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`py-2 ${
              day
                ? "text-center cursor-pointer border border-rose-400 rounded-lg hover:bg-rose-100"
                : "text-transparent"
            }`}
            onClick={() => day && handleDayClick(day)}
          >
            {day && <span className="text-sm text-gray-800">{day}</span>}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Adicionar Tarefa</h3>
            <input
              type="text"
              className="border border-rose-400 p-2 rounded mb-4 w-full"
              placeholder="Nome da tarefa"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleTaskSubmit}
                className="bg-rose-500 text-white px-4 py-2 rounded"
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
