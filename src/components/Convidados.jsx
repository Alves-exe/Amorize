import { useEffect, useState } from "react";
import { getConvidadosByUserId } from "../api/convidados";

export default function Convidados({ userId }) {
  const [convidados, setConvidados] = useState([]);

  useEffect(() => {
    async function carregarConvidados() {
      const data = await getConvidadosByUserId(userId);
      setConvidados(data);
    }

    carregarConvidados();
  }, [userId]); // <- userId é uma dependência válida

  return (
    <div>
      {convidados.map((c, i) => (
        <p key={i}>
          {c.nome} - {c.confirmado ? "Confirmado" : "Pendente"}
        </p>
      ))}
    </div>
  );
}
