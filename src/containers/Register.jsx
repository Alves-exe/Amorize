import { GoHeartFill } from "react-icons/go";
import Inputs from "../components/Inputs";

function Register() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-rose-50 to-slate-50 p-4">
      <div className="rounded-lg outline-cyan-50 bg-card text-card-foreground shadow-sm w-full max-w-md">
        <div className="flex flex-col p-6 space-y-1 text-center">
          <div className="flex justify-center">
            <GoHeartFill size={35} color="red" />
          </div>
          <h1 className="font-semibold text-2xl tracking-tight">
            Crie sua conta
          </h1>
          <p className="text-sm text-gray-500">
            Comece a planejar seu casamento hoje
          </p>
          <form>
            <div className="p-2 pt-6 space-y-4 items-start flex-col flex text-sm">
              <label className="">Nome Completo</label>
              <Inputs type="text" placeholder="Insira seu nome" />
              <label>Email</label>
              <Inputs type="email" placeholder="Insira seu E-mail" />
              <label>Senha</label>
              <Inputs type="password" placeholder="Insira sua Senha" />
              <label>Confirme a senha</label>
              <Inputs type="password" placeholder="Confirme sua senha" />
              <label>Data prevista do casamento</label>
              <Inputs type="date" />
            </div>
          </form>
          <button className="bg-rose-500 rounded-lg p-2 text-white font-semibold">
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
