import { useEffect, useState } from "react";

export default function Convidados() {
  const [convidados, setConvidados] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("convidados")) || [];
    setConvidados(dados);
  }, []);

  const atualizarLocalStorage = (lista) => {
    localStorage.setItem("convidados", JSON.stringify(lista));
    setConvidados(lista);
  };

  const toggleConfirmado = (index) => {
    const atualizados = [...convidados];
    atualizados[index].confirmado = !atualizados[index].confirmado;
    atualizarLocalStorage(atualizados);
  };

  const removerConvidado = (index) => {
    const atualizados = convidados.filter((_, i) => i !== index);
    atualizarLocalStorage(atualizados);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Lista de Convidados</h2>

      {convidados.length === 0 ? (
        <p className="text-gray-500">Nenhum convidado adicionado.</p>
      ) : (
        <ul className="space-y-4">
          {convidados.map((c, i) => (
            <li
              key={i}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{c.nome}</p>
                <p className="text-sm text-gray-600">{c.telefone}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleConfirmado(i)}
                  className={`text-sm px-3 py-1 rounded font-medium ${
                    c.confirmado
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {c.confirmado ? "Confirmado" : "Pendente"}
                </button>
                <button
                  onClick={() => removerConvidado(i)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
