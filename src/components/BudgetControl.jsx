import { useEffect, useState } from "react";

export default function BudgetControl({ onBudgetChange, userId }) {
  const [orcamentoTotal, setOrcamentoTotal] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  useEffect(() => {
    if (userId) {
      const stored = localStorage.getItem(`budget_${userId}`);
      const parsed = stored ? JSON.parse(stored) : [];
      setExpenses(parsed);

      // Carregar o orçamento total armazenado
      const storedBudget = localStorage.getItem(`total_budget_${userId}`);
      if (storedBudget) {
        setOrcamentoTotal(parseFloat(storedBudget));
      }
    }
  }, [userId]);

  useEffect(() => {
    if (onBudgetChange) {
      onBudgetChange({ usado: calculateUsedBudget(), total: orcamentoTotal });
    }
  }, [orcamentoTotal, expenses, onBudgetChange]);

  const calculateUsedBudget = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const handleAddExpense = () => {
    // Garantir que os campos não estejam vazios e que o valor seja um número válido
    if (!expenseName.trim() || !expenseAmount || isNaN(expenseAmount)) {
      alert("Por favor, insira uma despesa válida.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem(`budget_${userId}`, JSON.stringify(updatedExpenses));

    // Atualiza o orçamento usado
    if (onBudgetChange) {
      onBudgetChange({ usado: calculateUsedBudget(), total: orcamentoTotal });
    }

    // Limpa os campos de entrada
    setExpenseName("");
    setExpenseAmount("");
  };

  const handleBudgetChange = (event) => {
    const newBudget = parseFloat(event.target.value);
    setOrcamentoTotal(newBudget);
    localStorage.setItem(`total_budget_${userId}`, newBudget);

    // Atualiza o orçamento total
    if (onBudgetChange) {
      onBudgetChange({ usado: calculateUsedBudget(), total: newBudget });
    }
  };

  return (
    <div>
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
        className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
      >
        Adicionar Despesa
      </button>

      <div className="mt-6">
        <h3 className="font-bold">Despesas:</h3>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id} className="flex justify-between">
              <span>
                {expense.name} - R$ {expense.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
