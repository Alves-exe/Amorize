import { useEffect, useState } from "react";

export default function BudgetControl({ onBudgetChange, userId }) {
  const [orcamentoTotal, setOrcamentoTotal] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userId) {
      const storedExpenses = localStorage.getItem(`budget_${userId}`);
      const storedBudget = localStorage.getItem(`total_budget_${userId}`);

      if (storedExpenses) {
        try {
          setExpenses(JSON.parse(storedExpenses));
        } catch {
          setExpenses([]);
        }
      }

      if (storedBudget) {
        const parsedBudget = parseFloat(storedBudget);
        setOrcamentoTotal(!isNaN(parsedBudget) ? String(parsedBudget) : "");
      } else {
        setOrcamentoTotal("");
      }
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`budget_${userId}`, JSON.stringify(expenses));
    }
  }, [expenses, userId]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`total_budget_${userId}`, orcamentoTotal);
    }
  }, [orcamentoTotal, userId]);

  useEffect(() => {
    if (onBudgetChange) {
      const totalNum = parseFloat(orcamentoTotal);
      onBudgetChange({
        usado: calculateUsedBudget(),
        total: !isNaN(totalNum) ? totalNum : 0,
      });
    }
  }, [orcamentoTotal, expenses, onBudgetChange]);

  const calculateUsedBudget = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const handleAddExpense = () => {
    const amountNum = parseFloat(expenseAmount);

    if (!expenseName.trim()) {
      setErrorMessage("Por favor, insira um nome para a despesa.");
      setShowErrorModal(true);
      return;
    }

    if (!expenseAmount || isNaN(amountNum)) {
      setErrorMessage("Por favor, insira um valor válido para a despesa.");
      setShowErrorModal(true);
      return;
    }

    if (amountNum < 0) {
      setErrorMessage("Despesa não pode ser negativa.");
      setShowErrorModal(true);
      return;
    }

    const totalBudgetNum = parseFloat(orcamentoTotal) || 0;
    const usedBudget = calculateUsedBudget();

    if (amountNum + usedBudget > totalBudgetNum) {
      setErrorMessage(
        "A despesa ultrapassa o orçamento total disponível."
      );
      setShowErrorModal(true);
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: amountNum,
    };

    setExpenses((prev) => [...prev, newExpense]);
    setExpenseName("");
    setExpenseAmount("");
  };

  const handleBudgetChange = (event) => {
    const newValue = event.target.value;
    setOrcamentoTotal(newValue);
  };

  return (
    <>
      <div className="p-4 flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-4">
          <div className="mb-4">
            <input
              type="number"
              value={orcamentoTotal}
              onChange={handleBudgetChange}
              placeholder="Defina o Orçamento Total"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Nome da Despesa"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              placeholder="Valor da Despesa"
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={handleAddExpense}
            className="mt-2 bg-rose-500 text-white p-2 rounded w-full hover:bg-rose-600 transition-colors duration-200"
          >
            Adicionar Despesa
          </button>
        </div>

        <div className="md:w-1/2 pl-4 mt-6 md:mt-0">
          <h3 className="font-bold ml-2">Despesas:</h3>
          <ul className="mt-2">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <li key={expense.id} className="flex p-2 mt-1">
                  <span className="font-semibold">{expense.name}</span>
                  <span className="ml-4">R${expense.amount.toFixed(2)}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Nenhuma despesa registrada.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Modal de erro */}
      {showErrorModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl border-2 border-rose-300 opacity-95">
      <h2 className="text-2xl font-extrabold mb-4 text-rose-600 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-rose-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M12 5a7 7 0 00-7 7v1a7 7 0 0014 0v-1a7 7 0 00-7-7z"
          />
        </svg>
        Atenção
      </h2>
      <p className="mb-6 text-gray-700">{errorMessage}</p>
      <button
        onClick={closeModal}
        className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-200 w-full"
      >
        Fechar
      </button>
    </div>
  </div>
)}

    </>
  );
}
