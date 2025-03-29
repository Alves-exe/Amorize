import { GoHeartFill } from "react-icons/go";
import Inputs from "../components/Inputs";

export default function Forgot() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-rose-50 to-slate-50 p-4">
      <div className="rounded-lg outline-cyan-50 bg-card text-card-foreground shadow-sm w-full max-w-md">
        <div className="flex flex-col p-6 space-y-1 text-center">
          <div className="flex justify-center">
            <GoHeartFill size={35} className="text-rose-500" />
          </div>
          <h1 className="font-semibold text-2xl tracking-tight">
            Esqueceu a senha
          </h1>
          <p className="text-gray-500 mt-3 mb-3">
            Insira o e-mail para redefinir a senha
          </p>
          <Inputs type="email" placeholder="Insira seu e-mail" />{" "}
          <button className="bg-rose-500 rounded-lg p-2 my-4 text-white font-semibold">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
