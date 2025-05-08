import { GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authServiceLocal";
import Input from "../components/Inputs";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email.trim()) newErrors.email = "Insira seu e-mail";
    if (!password.trim()) newErrors.password = "Insira sua senha";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const user = await loginUser({ email, password });
      console.log("Usuário logado:", user);
      navigate("/amorize");
    } catch (err) {
      setErrors({ email: err.message });
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-rose-50 to-slate-50 p-4">
      <div className="rounded-lg bg-white shadow-md p-6 w-full max-w-md">
        <div className="flex flex-col items-center space-y-3 text-center">
          <GoHeartFill size={35} className="text-rose-500" />
          <h1 className="font-semibold text-2xl">Bem-vindo à Amorize</h1>
          <p className="text-gray-500">Entre com sua conta para continuar</p>
        </div>
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">E-mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-rose-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-rose-500 text-sm">{errors.password}</p>
            )}
            <div className="text-right text-sm">
              <button
                type="button"
                onClick={() => navigate("/forgot")}
                className="text-rose-500"
              >
                Esqueceu a senha?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Não tem uma conta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-rose-500 cursor-pointer"
          >
            Registre-se
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
