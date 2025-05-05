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
    <div className="">
      <p className="text-gray-700 font-medium">
        Seu casamento está previsto para {""}
        <span className="font-semibold text-rose-500">{weddingDate}</span>(
        {diasRestantes} dias restantes)
      </p>
    </div>
  );
}

export default DateWed;
