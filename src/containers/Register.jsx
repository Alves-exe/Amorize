import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    tipo: "",
    noivo: "",
    noiva: "",
    dataCasamento: "",
    name: "",
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
    if (!formData.tipo) newErrors.tipo = "Selecione o tipo de usuário";

    if (formData.tipo === "noivos") {
      if (!formData.noivo) newErrors.noivo = "Nome do noivo é obrigatório";
      if (!formData.noiva) newErrors.noiva = "Nome da noiva é obrigatório";
      if (!formData.dataCasamento)
        newErrors.dataCasamento = "Data é obrigatória";
    } else {
      if (!formData.name) newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email) newErrors.email = "E-mail é obrigatório";
    if (!formData.password) newErrors.password = "Senha é obrigatória";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        name:
          formData.tipo === "noivos"
            ? `${formData.noivo} & ${formData.noiva}`
            : formData.name || "",

        email: formData.email,
        userType: formData.tipo,
        password: formData.password,

        weddingDate: formData.tipo === "noivos" ? formData.dataCasamento : null,
        partner1: formData.tipo === "noivos" ? formData.noivo : "",
        partner2: formData.tipo === "noivos" ? formData.noiva : "",
      };

      const response = await axios.post("http://localhost:5000/users", payload);
      console.log("Usuário registrado:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Erro ao registrar:", err);
      setErrors({ email: "Erro ao registrar usuário" });
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
            <label className="block font-medium">Tipo de Usuário</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Selecione</option>
              <option value="noivos">Noivos</option>
              <option value="organizador">Organizador</option>
              <option value="fornecedor">Fornecedor</option>
            </select>
            {errors.tipo && (
              <p className="text-red-500 text-sm">{errors.tipo}</p>
            )}
          </div>

          {formData.tipo === "noivos" && (
            <>
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
            </>
          )}

          {formData.tipo !== "noivos" && (
            <div>
              <label className="block">Nome Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
          )}

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
