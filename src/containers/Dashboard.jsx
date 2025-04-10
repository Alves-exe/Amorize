import { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import CardProgress from "../components/CardProgress";
import BudgetControl from "../components/BudgetControl";
import DateWed from "../components/DateWed";
import { fetchConvidados } from "../api/api-convidados";
import { calcularProgresso } from "../utils/progressoHelper";
import TasksCardLocal from "../components/TasksCardLocal";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState(null);
  const [showProgress, setShowProgress] = useState(true);
  const [convidados, setConvidados] = useState([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState(0);
  const [totalTarefas, setTotalTarefas] = useState(0);
  const [orcamentoInfo, setOrcamentoInfo] = useState({ usado: 0, total: 0 });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      const parsedUser = stored ? JSON.parse(stored) : null;
      setUser(parsedUser);
    } catch (err) {
      console.error("Erro ao carregar usuário:", err);
    }
  }, []);

  const carregarConvidados = useCallback(async () => {
    if (user?.id) {
      const lista = await fetchConvidados(user.id);
      setConvidados(lista || []);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      carregarConvidados();
    }
  }, [user, carregarConvidados]);

  const handleDashboardClick = () => {
    setShowProgress(true);
    setContent(null);
  };

  const resetAndSetContent = (newContent) => {
    setShowProgress(false);
    setContent(newContent);
  };

  const handleTaskProgress = (done, total) => {
    setTarefasConcluidas(done);
    setTotalTarefas(total);
  };

  const handleBudgetChange = (orcamento) => {
    setOrcamentoInfo(orcamento);
  };

  const progressValue = calcularProgresso(
    convidados,
    orcamentoInfo.total,
    orcamentoInfo.usado,
    tarefasConcluidas,
    totalTarefas
  );

  return (
    <div className="flex h-screen">
      <Sidebar
        setContent={resetAndSetContent}
        handleDashboardClick={handleDashboardClick}
        dateWed={user?.weddingDate}
      />

      <div className="flex-1 p-8 overflow-y-auto">
        {user && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-rose-500">
              {user.partner1} & {user.partner2}
            </h2>
            <DateWed weddingDate={user.weddingDate} />
          </div>
        )}

        {showProgress && (
          <>
            <CardProgress
              title="Progresso do Planejamento"
              subtitle={`Você já completou ${progressValue}% das tarefas`}
              progressValue={progressValue}
              usados={orcamentoInfo.usado}
              total={orcamentoInfo.total}
            />

            <div className="flex justify-center items-start gap-5 mt-10 flex-wrap">
              <Card
                title="Tarefas Pendentes"
                content={
                  <TasksCardLocal onProgressUpdate={handleTaskProgress} />
                }
              />
              <Card
                title="Orçamento"
                content={
                  <BudgetControl
                    onBudgetChange={handleBudgetChange}
                    userId={user?.id}
                  />
                }
              />
              <Card
                title="Mensagens Recentes"
                content="Verifique suas mensagens recentes."
              />
            </div>
          </>
        )}

        {!showProgress && content && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-rose-600">
              {content.title}
            </h2>
            <p className="text-gray-600 mt-2">{content.description}</p>

            {content.title === "Orçamento" && (
              <div className="mt-6">
                <BudgetControl
                  onBudgetChange={handleBudgetChange}
                  userId={user?.id}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
