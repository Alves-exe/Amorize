import BudgetControl from "./BudgetControl";
export default function BudgetResume({ orcamentoTotal, calculateUsedBudget }) {
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
  </div>;
}
