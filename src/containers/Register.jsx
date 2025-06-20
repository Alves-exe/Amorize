import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServiceFirebase";

function Register() {
  const hoje = new Date();
  const [formData, setFormData] = useState({
    noivo: "",
    noiva: "",
    dataCasamento: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.noivo) newErrors.noivo = "Nome do noivo é obrigatório";
    if (!formData.noiva) newErrors.noiva = "Nome da noiva é obrigatório";
    if (!formData.dataCasamento) newErrors.dataCasamento = "Data é obrigatória";
    if (new Date(formData.dataCasamento) < hoje)
      newErrors.dataCasamento = "Data do casamento não pode ser no passado";

    if (!formData.email) newErrors.email = "E-mail é obrigatório";
    if (!formData.password) newErrors.password = "Senha é obrigatória";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerUser({
        email: formData.email,
        password: formData.password,
        name: `${formData.noivo} & ${formData.noiva}`,
        weddingDate: formData.dataCasamento,
        partner1: formData.noivo,
        partner2: formData.noiva,
        userType: "casal",
      });

      console.log("Usuário registrado com sucesso");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert(error.message || "Erro ao registrar. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 to-slate-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-rose-500 mb-6">
          Crie sua conta na Amorize
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Nome do Noivo</label>
            <input
              type="text"
              name="noivo"
              value={formData.noivo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.noivo && (
              <p className="text-red-500 text-sm">{errors.noivo}</p>
            )}
          </div>

          <div>
            <label className="block">Nome da Noiva</label>
            <input
              type="text"
              name="noiva"
              value={formData.noiva}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.noiva && (
              <p className="text-red-500 text-sm">{errors.noiva}</p>
            )}
          </div>

          <div>
            <label className="block">Data do Casamento</label>
            <input
              type="date"
              name="dataCasamento"
              value={formData.dataCasamento}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.dataCasamento && (
              <p className="text-red-500 text-sm">{errors.dataCasamento}</p>
            )}
          </div>

          <div>
            <label className="block">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded"
          >
            Registrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta?{" "}
          <button
            type="button"
            className="text-rose-500 hover:underline"
            onClick={() => navigate("/login")}
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
