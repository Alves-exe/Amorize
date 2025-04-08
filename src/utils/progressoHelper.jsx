export function calcularProgresso(
  convidados,
  orcamentoTotal,
  tarefasConcluidas,
  totalTarefas
) {
  const convidadosTotal = convidados.length;
  const convidadosConfirmados = convidados.filter((c) => c.confirmado).length;
  const pctConvidados = convidadosTotal
    ? (convidadosConfirmados / convidadosTotal) * 100
    : 0;
  const pctTarefas = totalTarefas
    ? (tarefasConcluidas / totalTarefas) * 100
    : 0;
  const pctOrcamento = 50; // Pode ser ajustado dinamicamente se desejar

  const media = (pctConvidados + pctTarefas + pctOrcamento) / 3;
  return Math.round(media);
}
