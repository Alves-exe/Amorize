import { useState, useEffect } from "react";

export default function BudgetControl({
  onBudgetTotalChange,
  expenses,
  setExpenses,
  orcamentoTotal,
  userId,
}) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const totalUsed = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const saldoRestante = orcamentoTotal - totalUsed;

  const handleAddExpense = () => {
    if (!expenseName || !expenseAmount) {
      alert("Preencha nome e valor da despesa");
      return;
    }

    const amountNum = parseFloat(expenseAmount.replace(",", "."));
    if (isNaN(amountNum) || amountNum <= 0) {
      alert("Valor inválido");
      return;
    }

    if (amountNum > saldoRestante) {
      alert("Despesa maior que o saldo restante do orçamento");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: amountNum,
    };

    setExpenses([...expenses, newExpense]);
    setExpenseName("");
    setExpenseAmount("");
  };

  const handleRemoveExpense = (id) => {
    const filtered = expenses.filter((expense) => expense.id !== id);
    setExpenses(filtered);
  };

  const handleBudgetInputChange = (e) => {
    const value = e.target.value;
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed >= 0) {
      onBudgetTotalChange(parsed);
    } else if (value === "") {
      onBudgetTotalChange(0);
    }
  };

  useEffect(() => {
    onBudgetTotalChange(orcamentoTotal);
  }, [expenses, orcamentoTotal, onBudgetTotalChange]);

  return (
    <div>
      <input
        type="number"
        placeholder="Qual o orçamento"
        value={orcamentoTotal}
        onChange={handleBudgetInputChange}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        min="0"
        step="0.01"
      />

      <h3 className="font-bold mb-2">Despesas:</h3>
      <ul className="mb-4 max-h-48 overflow-auto border border-gray-200 rounded p-2">
        {expenses.length === 0 && <li>Nenhuma despesa adicionada.</li>}
        {expenses.map(({ id, name, amount }) => (
          <li key={id} className="flex justify-between items-center mb-1">
            <span>
              {name} - {formatCurrency(amount)}
            </span>
            <button
              onClick={() => handleRemoveExpense(id)}
              className="text-red-600 hover:text-red-800"
              aria-label={`Remover despesa ${name}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome da despesa"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className="border border-gray-300 rounded p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          className="border border-gray-300 rounded p-2 w-32"
          min="0"
          step="0.01"
        />
        <button
          onClick={handleAddExpense}
          className="bg-rose-500 text-white px-4 rounded"
        >
          Adicionar
        </button>
      </div>

      <p>
        <strong>Total Usado: </strong> {formatCurrency(totalUsed)}
      </p>
      <p>
        <strong>Saldo Restante: </strong>{" "}
        {formatCurrency(Math.max(saldoRestante, 0))}
      </p>
    </div>
  );
}
