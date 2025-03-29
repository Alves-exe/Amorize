import { GoHeartFill } from "react-icons/go";
import Inputs from "../components/Inputs";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-rose-50 to-slate-50 p-4">
      <div className="rounded-lg outline-cyan-50 bg-card text-card-foreground shadow-sm w-full max-w-md">
        <div className="flex flex-col p-6 space-y-1 text-center">
          <div className="flex justify-center">
            <GoHeartFill size={35} className="text-rose-500" />
          </div>
          <h1 className="font-semibold text-2xl tracking-tight">
            Bem-vindo à Amorize
          </h1>
          <p className="text-gray-500 mt-3">
            Entre com sua conta para continuar
          </p>
          <div className="justify-items-start space-y-5">
            <label>E-mail</label>
            <Inputs type="email" placeholder="Insira seu e-mail" />
            <label>Senha</label>
            <button
              onClick={() => navigate("/forgot")}
              className="text-sm ml-56 text-rose-600"
            >
              Esqueçeu a senha?
            </button>
            <Inputs type="password" placeholder="Insira sua senha" />
          </div>
          <button
            onClick={() => navigate("/amorize")}
            className="justify-center items-center bg-rose-500 rounded-lg p-2 mt-6 text-white font-semibold"
          >
            Entrar
          </button>

          <h2 className="text-gray-500">
            Não tem uma conta?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-rose-500 ml-6"
            >
              Registre-se
            </button>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
