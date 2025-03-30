import { GoHeartFill } from "react-icons/go";
import Inputs from "../components/Inputs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState(""); // Erro para o campo email
  const [senhaError, setSenhaError] = useState(""); // Erro para o campo senha
  const navigate = useNavigate();

  const handleLogin = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Preencha o campo de e-mail");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!senha.trim()) {
      setSenhaError("Preencha o campo de senha");
      valid = false;
    } else {
      setSenhaError("");
    }

    if (valid) {
      navigate("/amorize");
    }
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
            <div className="flex items-center">
              <label htmlFor="email" className="mr-2">
                E-mail
              </label>
              {emailError && (
                <span className="text-red-500 text-xs">{emailError}</span>
              )}
            </div>
            <Inputs
              type="email"
              id="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex items-center">
              <label htmlFor="senha" className="mr-2">
                Senha
              </label>
              {senhaError && (
                <span className="text-red-500 text-xs">{senhaError}</span>
              )}
            </div>
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
