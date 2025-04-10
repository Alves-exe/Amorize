export default function CardProgress({
  title,
  progressValue,
  orcamentoGasto,
  orcamentoTotal,
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
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
      <h2 className="text-xl font-bold text-rose-600 mb-2">{title}</h2>

      {/* Barra de progresso */}
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2 relative">
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
      <div className="text-sm text-gray-500">
        <p>
          Orçamento: <strong>{formatCurrency(orcamentoGasto)}</strong> de{" "}
          {formatCurrency(orcamentoTotal)}
        </p>
      </div>
    </div>
  );
}
