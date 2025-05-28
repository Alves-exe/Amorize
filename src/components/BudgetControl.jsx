import { useEffect, useState } from "react";

export default function BudgetControl({ onBudgetChange, userId }) {
  const [orcamentoTotal, setOrcamentoTotal] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

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
      onBudgetChange({ usado: calculateUsedBudget(), total: !isNaN(totalNum) ? totalNum : 0 });
    }
  }, [orcamentoTotal, expenses, onBudgetChange]);

  const calculateUsedBudget = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const handleAddExpense = () => {
    if (!expenseName.trim() || !expenseAmount || isNaN(expenseAmount)) {
    alert("Por favor, insira uma despesa válida.");
    return;
  }

  const valorDespesa = parseFloat(expenseAmount);

  if (valorDespesa < 0) {
    alert("O valor da despesa não pode ser negativo.");
    return;
  }

  const totalUsado = calculateUsedBudget();

  if (valorDespesa + totalUsado > parseFloat(orcamentoTotal || 0)) {
    alert("Esta despesa ultrapassa o orçamento total disponível.");
    return;
  }

  const newExpense = {
    id: Date.now(),
    name: expenseName,
    amount: valorDespesa,
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
          className="mt-2 bg-rose-500 text-white p-2 rounded w-full"
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
                <span className="ml-4">R${expense.amount}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">Nenhuma despesa registrada.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
