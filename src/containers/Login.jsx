import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServiceFirebase";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(formData.email, formData.password);
      navigate("/amorize");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 to-slate-50">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <div className="flex flex-col items-center space-y-3 text-center">
          <h1 className="text-2xl font-semibold">
            <span className="block">❤</span>
            Bem-vindo à Amorize
          </h1>
          <p className="text-gray-400 mb-6">
            Entre com sua conta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded"
              required
            />
          </div>

          <div>
            <label className="block">
              Senha{" "}
              <button type="button" onClick={() => navigate("/forgot")}>
                <span className="text-rose-500 text-sm ml-56">
                  Esqueceu a senha?
                </span>
              </button>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-rose-200 rounded"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Ainda não tem uma conta?{" "}
          <button
            type="button"
            className="text-rose-500 hover:underline"
            onClick={() => navigate("/register")}
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
