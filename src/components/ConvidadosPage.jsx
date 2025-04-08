import { useCallback, useEffect, useState } from "react";
import { fetchConvidados, adicionarConvidado } from "../api/convidados";

function ConvidadosPage() {
  const [convidados, setConvidados] = useState([]);
  const [novoConvidado, setNovoConvidado] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const carregar = useCallback(async () => {
    if (user?.id) {
      const lista = await fetchConvidados(user.id);
      setConvidados(lista || []);
    }
  }, [user?.id]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const handleAddConvidado = async () => {
    if (!novoConvidado.trim()) return;

    await adicionarConvidado(user.id, {
      nome: novoConvidado,
      confirmado: false,
    });

    setNovoConvidado("");
    carregar(); // recarrega a lista após adicionar
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-rose-500 mb-4">
        Lista de Convidados
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={novoConvidado}
          onChange={(e) => setNovoConvidado(e.target.value)}
          placeholder="Nome do convidado"
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={handleAddConvidado}
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {convidados.length === 0 && (
          <li className="text-gray-500">Nenhum convidado adicionado ainda.</li>
        )}
        {convidados.map((convidado, index) => (
          <li
            key={index}
            className={`p-3 rounded shadow-md flex justify-between items-center ${
              convidado.confirmado ? "bg-green-100" : "bg-yellow-100"
            }`}
          >
            <span className="font-medium">{convidado.nome}</span>
            <span className="text-sm text-gray-600">
              {convidado.confirmado ? "Confirmado" : "Pendente"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConvidadosPage;
