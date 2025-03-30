import { GoHeartFill } from "react-icons/go";
import Inputs from "../components/Inputs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(""); // Agora o erro é uma string
  const navigate = useNavigate();

  // Função para validar login
  const handleLogin = () => {
    if (!email.trim() || !senha.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Se passar na validação, limpa o erro e navega
    setError("");
    navigate("/amorize");
  };

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
            <label htmlFor="email">E-mail</label>
            <Inputs
              type="email"
              id="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="senha">Senha</label>
            <Inputs
              type="password"
              id="senha"
              placeholder="Insira sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              onClick={() => navigate("/forgot")}
              className="text-sm ml-56 text-rose-600"
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* Exibição do erro */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            onClick={handleLogin}
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
