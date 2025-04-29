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
    <div className="p-4">
      {/* Definindo Orçamento Total */}
      <div className="mb-4">
        <input
          type="number"
          value={orcamentoTotal}
          onChange={handleBudgetChange}
          placeholder="Defina o Orçamento Total"
          className="border p-2 rounded"
        />
      </div>

      {/* Adicionar Despesas */}
      <div className="mb-4">
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          placeholder="Nome da Despesa"
          className="border p-2 rounded "
        />
      </div>

      <div className="mb-4">
        <input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          placeholder="Valor da Despesa"
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleAddExpense}
        className="mt-2 bg-rose-500 text-white p-2 rounded "
      >
        Adicionar Despesa
      </button>

      {/* Exibindo Resumo do Orçamento */}
      <div className="mt-6">
        <h3 className="font-bold text-lg">Resumo do Orçamento:</h3>
        <div className="mt-2">
          <p>
            <strong>Total do Orçamento:</strong> R$ {orcamentoTotal}
          </p>
          <p>
            <strong>Total Gasto:</strong> R$ {calculateUsedBudget()}
          </p>
          <p>
            <strong>Saldo Restante:</strong> R${" "}
            {orcamentoTotal - calculateUsedBudget()}
          </p>
        </div>
      </div>

      {/* Relatório de Despesas */}
      <div className="mt-6">
        <h3 className="font-bold">Despesas:</h3>
        <ul className="mt-2">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between mt-1">
                <span>{expense.name}</span>
                <span>R$ {expense.amount}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma despesa registrada.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
