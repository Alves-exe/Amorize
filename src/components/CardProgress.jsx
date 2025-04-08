import { GoHeartFill } from "react-icons/go";
import { FaMoneyBillWave } from "react-icons/fa";

export default function CardProgress({
  title,
  subtitle,
  convidados,
  budget,
  progressValue,
  className,
}) {
  const total = convidados.length;
  const confirmados = convidados.filter((c) => c.confirmado).length;

  return (
    <div
      className={`bg-white shadow-lg border border-rose-200 rounded-2xl p-6 max-w-full mx-10 md:mx-32 ${className}`}
    >
      {/* Título e subtítulo */}
      {title && <h2 className="text-2xl font-bold text-rose-600">{title}</h2>}
      {subtitle && (
        <p className="text-sm font-medium text-gray-500 mt-1">{subtitle}</p>
      )}

      {/* Barra de progresso */}
      <div className="mt-4">
        <div className="relative w-full h-4 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-rose-500 rounded-full transition-all duration-500"
            style={{ width: `${progressValue}%` }}
          />
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">
          {progressValue}% concluído
        </p>
      </div>

      {/* Informações adicionais */}
      <div className="flex flex-wrap justify-around items-center mt-6 gap-10 text-center">
        {/* Convidados */}
        <div className="flex flex-col items-center">
          <GoHeartFill size={28} className="text-rose-500 mb-1" />
          <p className="text-xl font-bold text-black">
            {confirmados}/{total}
          </p>
          <p className="text-sm text-gray-500">Convidados confirmados</p>
        </div>

        {/* Orçamento (recebido como componente) */}
        <div className="flex flex-col items-center">
          <FaMoneyBillWave size={28} className="text-blue-400 mb-1" />
          {budget}
        </div>
      </div>
    </div>
  );
}
