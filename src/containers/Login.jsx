import { GoHeartFill } from "react-icons/go";
import Inputs from "../components/Inputs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!email.trim()) newErrors.email = "Insira seu e-mail";
    if (!password.trim()) newErrors.password = "Insira sua senha";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.get("http://localhost:5000/users", {
        email,
        password,
      });
      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        navigate("/amorize");
      }
    } catch {
      null;
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
          <form onSubmit={handleLogin}>
            <div className="justify-items-start space-y-2">
              <div className="flex items-center">
                <label htmlFor="email" className="mr-2">
                  E-mail
                </label>
                {errors.email && (
                  <span className="text-rose-500 text-xs">{errors.email}</span>
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
                {errors.password && (
                  <span className="text-rose-500 text-xs">
                    {errors.password}
                  </span>
                )}
                <button
                  onClick={() => navigate("/forgot")}
                  className="text-sm ml-56 text-rose-600"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <Inputs
                type="password"
                id="senha"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="justify-center items-center bg-rose-500 rounded-lg p-2 mt-2 text-white w-full font-semibold"
            >
              Entrar
            </button>
          </form>
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
