import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth";

// REGISTRO
export async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Erro no registro:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Erro ao registrar usuário."
    );
  }
}

// LOGIN
export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    const user = response.data;

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userEmail", email);
    }

    return user;
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Email ou senha inválidos."
    );
  }
}

// LOGOUT
export function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("userEmail");
}

// VERIFICA SE ESTÁ LOGADO
export function isLoggedIn() {
  return !!localStorage.getItem("currentUser");
}

// PEGA USUÁRIO ATUAL
export function getCurrentUser() {
  try {
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
  } catch (err) {
    console.error("Erro ao fazer parse do currentUser:", err);
    return null;
  }
}
