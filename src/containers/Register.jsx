import { GoHeartFill } from "react-icons/go";
import Inputs from "../components/Inputs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("organizador");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirm] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Campo obrigatório!";
    if (!email.trim()) newErrors.email = "Campo obrigatório!";
    if (!password.trim()) newErrors.password = "Campo obrigatório!";
    if (!confirmPass.trim()) newErrors.confirmPass = "Campo obrigatório!";
    if (!date.trim()) newErrors.date = "Campo obrigatório!";
    if (password !== confirmPass)
      newErrors.confirmPass = "As senhas nao coincidem!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post("http://localhost:5000/users", {
        name,
        email,
        userType,
        password,
        weddingDate: date,
      });
      alert("conta criada");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      alert("erro ao criar");
      console.log(error);
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
            Crie sua conta
          </h1>
          <p className="text-sm text-gray-500">
            Comece a planejar seu casamento hoje
          </p>

          <form onSubmit={handleSubmit}>
            <div className="p-2 pt-6 space-y-2 items-start flex-col flex text-sm">
              <label className="">Nome Completo</label>
              {errors.name && (
                <span className="text-red-500 text-xs ml-2">{errors.name}</span>
              )}
              <Inputs
                type="text"
                placeholder="Insira seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email</label>
              {errors.email && (
                <span className="text-red-500 text-xs ml-2">
                  {errors.email}
                </span>
              )}
              <Inputs
                type="email"
                placeholder="Insira seu E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="tipo">Classe</label>

              <select
                name="TipoDeRegistro"
                id="user_type"
                className="rounded-md h-10 w-full border border-rose-200"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="organizador">Organizador</option>
                <option value="fornecedor">Fornecedor</option>
                <option value="noivos">Noivos</option>
              </select>

              <label>Senha</label>
              {errors.password && (
                <span className="text-red-500 text-xs ml-2">
                  {errors.password}
                </span>
              )}
              <Inputs
                type="password"
                placeholder="Insira sua Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Confirme a senha</label>
              {errors.confirmPass && (
                <span className="text-red-500 text-xs ml-2">
                  {errors.confirmPass}
                </span>
              )}
              <Inputs
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPass}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <label>Data prevista do casamento</label>
              {errors.date && (
                <span className="text-red-500 text-xs ml-2">{errors.date}</span>
              )}
              <Inputs
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-rose-500 rounded-lg p-2 w-full text-white font-semibold"
            >
              Criar Conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
