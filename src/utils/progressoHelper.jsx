export function calcularProgresso(
  convidados,
  orcamentoTotal,
  orcamentoGasto,
  tarefasConcluidas,
  totalTarefas
) {
  const totalConvidados = convidados.length;
  const confirmados = convidados.filter((c) => c.confirmado).length;

  const pctConvidados = totalConvidados
    ? (confirmados / totalConvidados) * 100
    : 0;

  const pctTarefas = totalTarefas
    ? (tarefasConcluidas / totalTarefas) * 100
    : 0;

  const pctOrcamento = orcamentoTotal
    ? (orcamentoGasto / orcamentoTotal) * 100
    : 0;

  // Ajustando pesos para o cálculo de progresso
  const pesoConvidados = 0.25; // 25% do progresso vem dos convidados
  const pesoTarefas = 0.25; // 25% do progresso vem das tarefas
  const pesoOrcamento = 0.5; // 50% do progresso vem do orçamento

  const media =
    pctConvidados * pesoConvidados +
    pctTarefas * pesoTarefas +
    pctOrcamento * pesoOrcamento;

  return Number(media.toFixed(1)); // Retorna a média ponderada com uma casa decimal
}
