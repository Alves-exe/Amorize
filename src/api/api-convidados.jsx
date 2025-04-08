// src/api/convidados.js

const API_URL = "http://localhost:5000/users"; // ajuste se necessário

// ✅ Buscar convidados por ID de usuário
export async function fetchConvidados(userId) {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) throw new Error("Erro ao buscar convidados");

    const user = await response.json();
    return user.convidados || [];
  } catch (error) {
    console.error("Erro ao buscar convidados:", error);
    return [];
  }
}

// ✅ Adicionar convidado
export async function addConvidado(userId, novoConvidado) {
  try {
    const resUser = await fetch(`${API_URL}/${userId}`);
    const user = await resUser.json();
    const atualizados = [...(user.convidados || []), novoConvidado];

    await fetch(`${API_URL}/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ convidados: atualizados }),
    });

    return atualizados;
  } catch (error) {
    console.error("Erro ao adicionar convidado:", error);
    return [];
  }
}

// ✅ Atualizar confirmação de presença
export async function atualizarConfirmacao(userId, index, confirmado) {
  try {
    const resUser = await fetch(`${API_URL}/${userId}`);
    const user = await resUser.json();

    const convidados = [...(user.convidados || [])];
    convidados[index].confirmado = confirmado;

    await fetch(`${API_URL}/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ convidados }),
    });

    return convidados;
  } catch (error) {
    console.error("Erro ao atualizar confirmação:", error);
    return [];
  }
}
