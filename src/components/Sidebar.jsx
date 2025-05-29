import { useAuth } from "../services/AuthContext";
import { Home, Users, Calendar, Mail, User, DollarSign } from "lucide-react";

function Sidebar({ setContent, handleDashboardClick }) {
  const { currentUser } = useAuth();

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
          calendar: true,
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
    {
      icon: <User />,
      label: "Perfil",
      onClick: () =>
        setContent({
          title: "Perfil",
          description: "Gerencie seu perfil.",
        }),
    },
  ];

  return (
    <div className="p-4 inline-flex shadow-lg w-screen">
      <h1 className="text-2xl font-bold text-rose-500 ml-6">❤Amorize</h1>

      <div className="flex flex-inline space-x-9 ml-10">
        {menuItems.map(({ icon, label, onClick }, i) => (
          <button
            key={i}
            className="flex items-center gap-2 text-left hover:text-rose-500 font-medium"
            onClick={onClick}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Exibir nome do casal, opcional */}
      {currentUser && currentUser.partner1 && (
        <div className="ml-auto pr-6 text-sm text-gray-500 hidden sm:block">
          Bem-vindos, {currentUser.partner1} & {currentUser.partner2}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
