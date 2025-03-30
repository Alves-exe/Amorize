import { useState } from "react";
import { GoHeartFill } from "react-icons/go";
import Menu from "../components/Menu";
import { getConvidadosInfo } from "../components/Convidados";

function Dashboard() {
  const [content, setContent] = useState({
    title: "Olá, Silvio & Heribaldo!",
    description: "Escolha uma opção no menu acima para visualizar o conteúdo.",
  });

  const { total, confirmados } = getConvidadosInfo();

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
        />
      </div>
      <hr className="opacity-25" />

      {/* Conteúdo dinâmico abaixo do hr */}
      <div className="p-5 text-lg font-medium text-gray-700">
        <h2 className="text-xl font-bold text-black">{content.title}</h2>
        <p className="text-gray-600">{content.description}</p>
      </div>
    </div>
  );
}

export default Dashboard;
