import { useEffect, useState, useCallback } from "react";
import { GoHeartFill } from "react-icons/go";
import Menu from "../components/Menu";
import Card from "../components/Card";
import CardProgress from "../components/CardProgress";
import Budget from "../components/Budget";
import DateWed from "../components/DateWed";
import { fetchConvidados } from "../api/api-convidados";
import { calcularProgresso } from "../utils/progressoHelper";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser")); // ← Corrigido aqui
  const [content, setContent] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const [convidados, setConvidados] = useState([]);

  const tarefasConcluidas = 1;
  const totalTarefas = 4;

  const carregarConvidados = useCallback(async () => {
    if (user?.id) {
      const lista = await fetchConvidados(user.id);
      setConvidados(lista || []);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      setContent({
        title: `Olá, ${user.partner1} & ${user.partner2}`,
        description:
          "Escolha uma opção no menu acima para visualizar o conteúdo.",
      });

      carregarConvidados();
    }
  }, [user, carregarConvidados]);

  const handleDashboardClick = () => {
    setShowProgress(true);
    setContent({
      title: `Olá, ${user?.partner1 || "Nome"} & ${user?.partner2 || "Nome2"}`,
      description: "",
    });
  };

  const progressValue = calcularProgresso(
    convidados,
    15000,
    tarefasConcluidas,
    totalTarefas
  );

  return (
    <div>
      {/* Topo */}
      <div className="flex justify-between p-5">
        <h1 className="flex items-center text-2xl font-bold text-black gap-3">
          <GoHeartFill size={35} className="text-rose-500" />
          Amorize
        </h1>

        <Menu
          setContent={setContent}
          handleDashboardClick={handleDashboardClick}
          dateWed={user?.weddingDate}
        />
      </div>

      <hr className="opacity-25" />

      {/* Conteúdo principal */}
      <div className="p-5 text-lg font-medium text-gray-700">
        {content && typeof content === "object" ? (
          <>
            <h2 className="text-2xl font-bold text-rose-500">
              {user?.partner1} & {user?.partner2}
            </h2>
            {showProgress ? (
              <DateWed weddingDate={user?.weddingDate} />
            ) : (
              <p className="text-gray-600 mt-2">{content.description}</p>
            )}
          </>
        ) : (
          content
        )}
      </div>

      {/* Progresso e Cards */}
      {showProgress && (
        <>
          <CardProgress
            title="Progresso do Planejamento"
            subtitle={`Você já completou ${progressValue}% das tarefas`}
            progressValue={progressValue}
            convidados={convidados}
            budget={<Budget />}
          />

          <div className="flex justify-center items-center gap-5 mt-20 flex-wrap">
            <Card
              title="Próximas tarefas"
              content="Aqui estão as tarefas pendentes do seu casamento."
            />
            <Card
              title="Orçamento"
              content={<Budget />}
              className="bg-blue-100"
            />
            <Card
              title="Mensagens Recentes"
              content="Verifique suas mensagens recentes."
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
