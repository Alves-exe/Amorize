export default function CardProgress({
  title,
  progressValue,
  tasks,
  orcamentoTotal,
  convidadosConfirmados,
  totalConvidados,
}) {
  const formatCurrency = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return "R$ 0,00";
    }
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const progressBarColor = "bg-rose-500";

  return (
    <div className="bg-white drop-shadow-2xl rounded-xl mt-22 p-6">
      <h2 className="text-xl font-bold text-black">{title}</h2>
      <p className="text-gray-600 mb-2">{`Você já completou ${progressValue}% das tarefas`}</p>

      {/* Barra de progresso */}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2 relative">
        <div
          className={`${progressBarColor} h-full transition-all`}
          style={{
            width: `${progressValue}%`,
            transition: "width 0.5s ease-in-out",
          }}
          aria-label={`Progresso: ${progressValue}%`}
        ></div>
      </div>

      {/* Detalhes do orçamento */}
      <div className="text-xl mt-2 inline-flex gap-x-32 text-black font-medium">
        <p className="ml-5 justify-items-center">
          <strong>
            {convidadosConfirmados}/{totalConvidados}
          </strong>
          <p className="text-sm ml-2 text-gray-500">Convidados Confirmados</p>
        </p>
        <p className="ml-5 justify-items-center">
          <strong>{formatCurrency(orcamentoTotal)}</strong>
          <p className="text-sm ml-2 text-gray-500">Orçamento Total</p>
        </p>
        <p className="ml-5 justify-items-center">
          <strong>{tasks}</strong>
          <p className="text-sm ml-2 text-gray-500">Tarefas Pendentes</p>
        </p>
      </div>
    </div>
  );
}
