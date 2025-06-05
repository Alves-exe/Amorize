export function calcularProgresso(
  convidados,
  orcamentoTotal,
  orcamentoGasto,
  tarefasConcluidas,
  totalTarefas
) {
  const pctTarefas = totalTarefas
    ? (tarefasConcluidas / totalTarefas) * 100
    : 0;

  const pctOrcamento = orcamentoTotal
    ? (orcamentoGasto / orcamentoTotal) * 100
    : 0;

  // Ajustando pesos para o cálculo de progresso
  // 25% do progresso vem dos convidados
  const pesoTarefas = 0.5; // 25% do progresso vem das tarefas
  const pesoOrcamento = 0.5; // 50% do progresso vem do orçamento

  const media = pctTarefas * pesoTarefas + pctOrcamento * pesoOrcamento;

  return Number(media.toFixed(1)); // Retorna a média ponderada com uma casa decimal
}
