import { useEffect, useState } from "react";

export default function BudgetControl({ onBudgetChange, userId }) {
  const [orcamentoTotal, setOrcamentoTotal] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  // Carregar dados do localStorage
  useEffect(() => {
    if (userId) {
      const stored = localStorage.getItem(`budget_${userId}`);
      const parsed = stored ? JSON.parse(stored) : [];
      setExpenses(parsed);

      const storedBudget = localStorage.getItem(`total_budget_${userId}`);
      if (storedBudget) {
        setOrcamentoTotal(parseFloat(storedBudget));
      }
    }
  }, [userId]);

  // Atualizar orçamento quando há mudanças
  useEffect(() => {
    if (onBudgetChange) {
      onBudgetChange({ usado: calculateUsedBudget(), total: orcamentoTotal });
    }
  }, [orcamentoTotal, expenses, onBudgetChange]);

  // Calcular o orçamento utilizado
  const calculateUsedBudget = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  // Adicionar uma nova despesa
  const handleAddExpense = () => {
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

    if (onBudgetChange) {
      onBudgetChange({ usado: calculateUsedBudget(), total: orcamentoTotal });
    }

    setExpenseName("");
    setExpenseAmount("");
  };

  // Alterar o valor do orçamento total
  const handleBudgetChange = (event) => {
    const newBudget = parseFloat(event.target.value);
    setOrcamentoTotal(newBudget);
    localStorage.setItem(`total_budget_${userId}`, newBudget);

    if (onBudgetChange) {
      onBudgetChange({ usado: calculateUsedBudget(), total: newBudget });
    }
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

        {/* Adicionar Despesas */}
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

      {/* Coluna do relatório de despesas */}
      <div className=" md:w-1/2 pl-4 mt-6 md:mt-0">
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
