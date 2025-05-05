export default function BudgetSummary({ total = 0, usado = 0 }) {
  const totalNum = parseFloat(total);
  const usadoNum = parseFloat(usado);
  const saldo = totalNum - usadoNum;

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg">Resumo do Orçamento:</h3>
      <div className="mt-2">
        <p>
          <strong>Total do Orçamento:</strong> R$ {totalNum.toFixed(2)}
        </p>
        <p>
          <strong>Total Gasto:</strong> R$ {usadoNum.toFixed(2)}
        </p>
        <p>
          <strong>Saldo Restante:</strong> R$ {saldo.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
