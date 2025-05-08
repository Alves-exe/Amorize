import { useState } from "react";
import { Users } from "lucide-react";
export default function Invites() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !telefone) return;

    const novoConvite = { nome, telefone, confirmado: false };
    const convitesExistentes =
      JSON.parse(localStorage.getItem("convidados")) || [];
    const atualizados = [...convitesExistentes, novoConvite];
    localStorage.setItem("convidados", JSON.stringify(atualizados));

    setNome("");
    setTelefone("");
  };

  return (
    <div className="bg-white drop-shadow-2xl rounded-xl mt-10 p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-black mb-3">Enviar convites</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4"
      >
        <input
          type="text"
          placeholder="Nome do convidado"
          className="border rounded p-2 w-full"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número de telefone"
          className="border rounded p-2 w-full"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <button
          type="submit"
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
        >
          Enviar Convite
        </button>
      </form>

      <p className="text-gray-600 mt-6">
        Os convites enviados aparecem automaticamente na lista de convidados em
        <br />
        <strong>
          "<Users size={20} className="inline-flex" /> Convidados"
        </strong>
      </p>
    </div>
  );
}
