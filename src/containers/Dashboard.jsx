import { useState } from "react";
import { GoHeartFill } from "react-icons/go";
import Menu from "../components/Menu";
import Card from "../components/Card";
import { getConvidadosInfo } from "../components/Convidados";
import CardProgress from "../components/CardProgress";

function Dashboard() {
  const [content, setContent] = useState({
    title: "Olá, Silvio & Heribaldo!",
    description: "Escolha uma opção no menu acima para visualizar o conteúdo.",
  });

  const [showProgress, setShowProgress] = useState(false); // Estado para controlar a exibição do progresso

  const { total, confirmados } = getConvidadosInfo();

  // Função para exibir o progresso quando clicar em Dashboard
  const handleDashboardClick = () => {
    setShowProgress(true);
    setContent({
      title: "Olá, Silvio & Heribaldo!",
      description: { DateWed },
    });
  };

  return (
    <div>
      <div className="flex justify-between p-5">
        <h1 className="flex items-center text-2xl font-bold text-black gap-3">
          <GoHeartFill size={35} className="text-rose-500" />
          Amorize
        </h1>

        <Menu
          setContent={setContent}
          confirmados={confirmados}
          totalConvidados={total}
          handleDashboardClick={handleDashboardClick} // Passando a função para o menu
        />
      </div>
      <hr className="opacity-25" />
      {/* Conteúdo dinâmico abaixo do hr */}
      <div className="p-5 text-lg font-medium text-gray-700">
        <h2 className="text-xl font-bold text-black">{content.title}</h2>
        <p className="text-gray-600">{content.description}</p>
      </div>

      {/* Exibe o CardProgress somente se showProgress for true */}
      {showProgress && (
        <div>
          <CardProgress
            title={"Progresso do Planejamento"}
            subtitle={`Você já completou 40% das tarefas`}
            progressValue={40} // Passando o valor de progresso (pode ser ajustado)
            className="bg-blue-100 text-blue-900" // Usando classes adicionais para personalização
          />

          {/* Centralizando os cards com flexbox */}
          <div className="flex justify-center items-center gap-5 mt-20 flex-wrap">
            <Card
              title="Proximas tarefas"
              content="Aqui estão as tarefas pendentes do seu casamento."
              className="bg-blue-100 text-blue-900"
            />
            <Card
              title="Orçamento"
              content="Controle seu orçamento para o casamento."
            />
            <Card
              title="Mensagens Recentes"
              content="Verifique suas mensagens recentes."
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
