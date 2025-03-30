const convidados = [
  { nome: "João", confirmado: true },
  { nome: "Maria", confirmado: false },
  { nome: "Carlos", confirmado: true },
  { nome: "Ana", confirmado: false },
];

export function getConvidadosInfo() {
  const total = convidados.length;
  const confirmados = convidados.filter((c) => c.confirmado).length;
  {
    total, confirmados;
  }
  return (
    <div className="mt-6 justify-items-center">
      <p className=" text-xl font-bold text-black">
        {confirmados}/{total}
      </p>
      <h3 className="text-sm font-semibold text-gray-500">
        Convidados confirmados
      </h3>
    </div>
  );
}

export default convidados;
