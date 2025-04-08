import { useEffect, useState } from "react";

function calcularDiasRestantes(dataCasamento) {
  const hoje = new Date();
  const casamento = new Date(dataCasamento);
  const diff = casamento - hoje;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function DateWed({ weddingDate }) {
  const [diasRestantes, setDiasRestantes] = useState(0);

  useEffect(() => {
    if (weddingDate) {
      const dias = calcularDiasRestantes(weddingDate);
      setDiasRestantes(dias);
    }
  }, [weddingDate]);

  return (
    <div className="mt-3 bg-pink-50 p-4 rounded-xl shadow-sm">
      <p className="text-gray-700 font-medium">
        Data do casamento:{" "}
        <span className="font-bold text-rose-500">{weddingDate}</span>
      </p>
      <p className="text-sm text-gray-500">
        Faltam <strong>{diasRestantes}</strong> dias para o grande dia!
      </p>
    </div>
  );
}

export default DateWed;
