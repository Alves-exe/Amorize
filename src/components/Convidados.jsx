const convidados = [
  { nome: "João", confirmado: true },
  { nome: "Maria", confirmado: false },
  { nome: "Carlos", confirmado: true },
  { nome: "Ana", confirmado: false },
];

export function getConvidadosInfo() {
  const total = convidados.length;
  const confirmados = convidados.filter((c) => c.confirmado).length;
  return { total, confirmados };
}

export default convidados;
