const USE_API = true; // ← Altere para true se quiser usar backend futuramente
const API_URL = "http://localhost:5000/users";

// REGISTRAR USUÁRIO
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

    users.push(userData); // salva o novo usuário
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Usuário salvo no localStorage:", userData);
    return userData;
  }
}

// LOGIN DE USUÁRIO
// LOGIN
export async function loginUser({ email, password }) {
  console.log("Tentando logar com:", email, password);

  if (USE_API) {
    const res = await fetch(API_URL);
    const users = await res.json();
    const user = users.find(
      (u) => u.email === email.trim() && u.password === password.trim()
    );

    if (!user) {
      console.error("Login falhou: Email ou senha inválidos");
      throw new Error("Email ou senha inválidos");
    }

    const fakeToken = `${user.email}-token-${Date.now()}`;
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("userEmail", email); // ← SALVA O EMAIL

    console.log("Login realizado com sucesso (API):", user);
    return user;
  } else {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email.trim() && u.password === password.trim()
    );

    if (!user) {
      console.error("Login falhou: Email ou senha inválidos");
      throw new Error("Email ou senha inválidos");
    }

    const fakeToken = `${user.email}-token-${Date.now()}`;
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("userEmail", email); // ← SALVA O EMAIL

    console.log("Login realizado com sucesso (localStorage):", user);
    return user;
  }
}

// LOGOUT
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
}

// VERIFICA SE ESTÁ LOGADO
export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

// PEGA USUÁRIO LOGADO
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}
