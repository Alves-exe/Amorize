import { useEffect, useState } from "react";
import {
  Home,
  Users,
  Calendar,
  Mail,
  Bell,
  User,
  DollarSign,
} from "lucide-react";

function Sidebar({ setContent, handleDashboardClick }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      if (stored && stored !== "undefined") {
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);
      } else {
        console.warn("Usuário não encontrado no localStorage ou inválido.");
      }
    } catch (error) {
      console.error("Erro ao carregar user na Sidebar:", error);
    }
  }, []);

  const menuItems = [
    { icon: <Home />, label: "Dashboard", onClick: handleDashboardClick },
    {
      icon: <Users />,
      label: "Convidados",
      onClick: () =>
        setContent({
          title: "Convidados",
          description: "Gerencie sua lista de convidados.",
        }),
    },
    {
      icon: <DollarSign />,
      label: "Orçamento",
      onClick: () =>
        setContent({
          title: "Orçamento",
          description: "Gerencie suas finanças.",
        }),
    },
    {
      icon: <Calendar />,
      label: "Agenda",
      onClick: () =>
        setContent({
          title: "Agenda",
          description: "Veja seus eventos programados.",
          calendar: true, // Adicionando um identificador para a agenda
        }),
    },
    {
      icon: <Mail />,
      label: "Convites",
      onClick: () =>
        setContent({
          title: "Convites",
          description: "Envie e acompanhe os convites.",
        }),
    },
  ];

  const extraIcons = [
    { icon: <Bell />, label: "Notificações" },
    { icon: <User />, label: "Perfil" },
  ];

  return (
    <div className="p-4 inline-flex shadow-lg w-screen">
      <h1 className="text-2xl font-bold text-rose-500 ml-6">❤Amorize</h1>

      <div className="flex flex-inline space-x-9 ">
        {menuItems.map(({ icon, label, onClick }, i) => (
          <button
            key={i}
            className="flex items-center gap-2 text-left ml-6 hover:text-rose-500 font-medium"
            onClick={onClick}
          >
            {icon}
            {label}
          </button>
        ))}
        <div className="ml-52 inline-flex">
          {extraIcons.map(({ icon, label }, i) => (
            <button
              key={i}
              className="flex items-center gap-2 text-left ml-6 hover:text-rose-500 font-medium"
              title={label}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
