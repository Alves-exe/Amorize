import { GoHeartFill } from "react-icons/go";
import { Users, House, CreditCard, Calendar, Mail } from "lucide-react";
export default function Dashboard() {
  return (
    <div className="flex justify-between p-5">
      <h1 className="flex items-center text-2xl font-bold text-black gap-3">
        <GoHeartFill size={35} className="text-rose-500" />
        Amorize
      </h1>

      <div className="inline-flex gap-5 space-x-12">
        <button className="text-sm flex gap-5 text-black font-semibold hover:text-gray-400">
          <House />
          Dashboard
        </button>
        <button className="text-sm flex gap-5 text-black font-semibold hover:text-gray-400">
          <Users />
          Convidados
        </button>
        <button className="text-sm flex gap-5 text-black font-semibold hover:text-gray-400">
          <CreditCard />
          Orçamento
        </button>
        <button className="text-sm flex gap-5 text-black font-semibold hover:text-gray-400">
          <Calendar />
          Agenda
        </button>
        <button className="text-sm flex gap-5 text-black font-semibold hover:text-gray-400">
          <Mail />
          Convites
        </button>
      </div>
      <hr />
    </div>
  );
}
