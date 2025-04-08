import data from "../db.json";

// Simula uma chamada à API para buscar convidados
export const fetchConvidados = async (userId) => {
  try {
    const convidados = data?.convidados?.filter((c) => c.userId === userId);
    return convidados || [];
  } catch (error) {
    console.error("Erro ao buscar convidados:", error);
    return [];
  }
};

// Simula uma chamada para adicionar convidado
export const adicionarConvidado = async (userId, convidado) => {
  try {
    // Aqui você deveria adicionar o convidado no banco real
    console.log("Convidado adicionado:", convidado);
    return { ...convidado, userId };
  } catch (error) {
    console.error("Erro ao adicionar convidado:", error);
    return null;
  }
};

// Simula uma chamada para deletar convidado
export const deletarConvidado = async (id) => {
  try {
    console.log("Convidado deletado:", id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar convidado:", error);
    return false;
  }
};
