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
import { GoHeartFill } from "react-icons/go";

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
    <div className="bg-white w-64 p-6 border-r shadow-md">
      <h1 className="text-2xl font-bold  text-rose-500 mb-6">❤ Amorize</h1>

      <div className="space-y-4">
        {menuItems.map(({ icon, label, onClick }, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-2 text-left hover:text-rose-500 font-medium"
            onClick={onClick}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      <div className="absolute bottom-6 left-6 space-x-4">
        {extraIcons.map(({ icon, label }, i) => (
          <button key={i} className="hover:text-rose-500" title={label}>
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
