import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase"; // ajuste o caminho se necessário

const formatarTelefone = (telefone) => {
  const numeros = telefone.replace(/\D/g, "").slice(0, 11);
  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(
      7
    )}`;
  }
  return telefone;
};

export default function Convidados() {
  const [convidados, setConvidados] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [confirmRemoveId, setConfirmRemoveId] = useState(null);

  useEffect(() => {
    // Ouve mudanças na coleção 'convidados'
    const unsubscribe = onSnapshot(collection(db, "convidados"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConvidados(lista);
    });

    return () => unsubscribe();
  }, []);

  const validarTelefone = (tel) => {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return regex.test(tel);
  };

  const adicionarConvidado = async () => {
    if (!nome.trim() || !telefone.trim()) {
      setErro("Por favor, preencha nome e telefone.");
      return;
    }
    if (!validarTelefone(telefone)) {
      setErro("Telefone inválido. Use formato (XX) XXXXX-XXXX");
      return;
    }
    setErro("");
    await addDoc(collection(db, "convidados"), {
      nome: nome.trim(),
      telefone: telefone.trim(),
      confirmado: false,
    });
    setNome("");
    setTelefone("");
  };

  const toggleConfirmado = async (id, confirmado) => {
    const convidadoRef = doc(db, "convidados", id);
    await updateDoc(convidadoRef, { confirmado: !confirmado });
  };

  const abrirConfirmRemove = (id) => {
    setConfirmRemoveId(id);
  };

  const cancelarRemove = () => {
    setConfirmRemoveId(null);
  };

  const confirmarRemove = async () => {
    if (!confirmRemoveId) return;
    await deleteDoc(doc(db, "convidados", confirmRemoveId));
    setConfirmRemoveId(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-rose-500">
        Lista de Convidados
      </h2>

      {/* Formulário */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Telefone (ex: (99) 99999-9999)"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        {erro && <p className="text-red-600 mb-2">{erro}</p>}
        <button
          onClick={adicionarConvidado}
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
        >
          Adicionar Convidado
        </button>
      </div>

      {/* Lista */}
      {convidados.length === 0 ? (
        <p className="text-gray-500">Nenhum convidado adicionado.</p>
      ) : (
        <ul className="space-y-4">
          {convidados.map((c) => (
            <li
              key={c.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{c.nome}</p>
                <p className="text-sm text-gray-600">
                  {formatarTelefone(c.telefone)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleConfirmado(c.id, c.confirmado)}
                  className={`text-sm px-3 py-1 rounded font-medium ${
                    c.confirmado
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {c.confirmado ? "Confirmado" : "Pendente"}
                </button>
                <button
                  onClick={() => abrirConfirmRemove(c.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal de confirmação */}
      {confirmRemoveId && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
          onClick={cancelarRemove}
        >
          <div
            className="bg-white p-6 rounded shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4">
              Tem certeza que deseja remover{" "}
              <strong>
                {convidados.find((c) => c.id === confirmRemoveId)?.nome}
              </strong>
              ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelarRemove}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarRemove}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
