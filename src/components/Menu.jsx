import {
  House,
  Users,
  CreditCard,
  Calendar,
  Mail,
  Bell,
  User,
} from "lucide-react";

function Menu({ setContent, confirmados, totalConvidados }) {
  const menuItems = [
    {
      icon: <House />,
      label: "Dashboard",
      content: {
        title: "Olá, Silvio & Heribaldo",
        description: `Confirmados: ${confirmados}/${totalConvidados}`,
      },
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
          onClick={() => setContent(item.content)}
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
