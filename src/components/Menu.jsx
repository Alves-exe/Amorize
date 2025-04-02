import {
  House,
  Users,
  CreditCard,
  Calendar,
  Mail,
  Bell,
  User,
} from "lucide-react";
import DateWed from "./CalcularData";
const commitruim = 0;
function Menu({ setContent, dateWed, handleDashboardClick }) {
  const menuItems = [
    {
      icon: <House />,
      label: "Dashboard",
      content: {
        title: "Olá, Name & Name2",
        description: <DateWed weddingDate={dateWed} />,
      },
      onClick: handleDashboardClick, // Adicionando a função de clique aqui
    },
    {
      icon: <Users />,
      label: "Convidados",
      content: {
        title: "Convidados",
        description: "Lista completa de convidados e status de confirmação.",
      },
    },
    {
      icon: <CreditCard />,
      label: "Orçamento",
      content: {
        title: "Orçamento",
        description: "Gerencie suas finanças e gastos.",
      },
    },
    {
      icon: <Calendar />,
      label: "Agenda",
      content: {
        title: "Agenda",
        description: "Veja os eventos e compromissos programados.",
      },
    },
    {
      icon: <Mail />,
      label: "Convites",
      content: {
        title: "Convites",
        description: "Envie e gerencie convites para seus eventos.",
      },
    },
  ];

  return (
    <div className="inline-flex gap-5 space-x-12">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="text-sm flex gap-5 text-black font-semibold hover:text-gray-400"
          onClick={() => {
            setContent(item.content); // Atualiza o conteúdo
            if (item.onClick) item.onClick(); // Chama a função de clique
          }}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
      <button className="text-sm flex text-black font-semibold hover:text-gray-400">
        <Bell />
      </button>
      <button className="text-sm flex text-black font-semibold hover:text-gray-400">
        <User />
      </button>
    </div>
  );
}

export default Menu;
