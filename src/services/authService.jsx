const USE_API = false; // ← Altere para true quando quiser usar o backend

const API_URL = "http://localhost:5000/users";

// REGISTRAR
export async function registerUser(userData) {
  if (USE_API) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } else {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Usuários antes do cadastro:", users);

    const exists = users.some((u) => u.email === userData.email);
    if (exists) throw new Error("Email já registrado");

    users.push(userData); // ← Corrigido: Agora adiciona corretamente
    localStorage.setItem("users", JSON.stringify(users));

    console.log(
      "Usuário salvo no localStorage:",
      localStorage.getItem("users")
    );
    return userData;
  }
}

// LOGIN
export async function loginUser({ email, password }) {
  console.log("Tentando logar com:", email, password);
  console.log("Usuários antes do login:", localStorage.getItem("users"));

  if (USE_API) {
    const res = await fetch(API_URL);
    const users = await res.json();
  } else {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Usuários carregados do localStorage:", users);

    // 🔥 Corrigido: Agora verifica corretamente o email e senha
    const user = users.find(
      (u) => u.email === email.trim() && u.password === password.trim()
    );

    if (!user) {
      console.error("Erro no login: Email ou senha inválidos");
      throw new Error("Email ou senha inválidos");
    }

    const fakeToken = `${user.email}-token-${Date.now()}`;
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("currentUser", JSON.stringify(user));

    console.log("Usuário logado com sucesso:", user);
    return user;
  }
}

// LOGOUT
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
}

// VERIFICAR LOGIN
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}
