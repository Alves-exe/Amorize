import {
  House,
  Users,
  CreditCard,
  Calendar,
  Mail,
  Bell,
  User,
} from "lucide-react";
import ConvidadosPage from "./ConvidadosPage";

function Menu({ handleDashboardClick, setContent }) {
  const menuItems = [
    {
      icon: <House />,
      label: "Dashboard",
      onClick: handleDashboardClick,
    },
    {
      icon: <Users />,
      label: "Convidados",
      onClick: () => setContent(<ConvidadosPage />),
    },
    {
      icon: <CreditCard />,
      label: "Orçamento",
      onClick: () =>
        setContent({
          title: "Orçamento",
          description: "Gerencie suas finanças e gastos.",
        }),
    },
    {
      icon: <Calendar />,
      label: "Agenda",
      onClick: () =>
        setContent({
          title: "Agenda",
          description: "Veja os eventos e compromissos programados.",
        }),
    },
    {
      icon: <Mail />,
      label: "Convites",
      onClick: () =>
        setContent({
          title: "Convites",
          description: "Envie e gerencie convites para seus eventos.",
        }),
    },
  ];

  const extraIcons = [
    { icon: <Bell />, label: "Notificações" },
    { icon: <User />, label: "Perfil" },
  ];

  return (
    <div className="inline-flex gap-5 space-x-12">
      {menuItems.map(({ icon, label, onClick }, index) => (
        <button
          key={index}
          className="text-sm flex gap-2 text-black font-semibold hover:text-gray-400 items-center"
          onClick={onClick}
        >
          {icon}
          {label}
        </button>
      ))}

      {extraIcons.map(({ icon, label }, index) => (
        <button
          key={`extra-${index}`}
          className="text-sm flex text-black font-semibold hover:text-gray-400 items-center"
          title={label}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}

export default Menu;
