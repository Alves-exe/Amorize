// authService.js (versão localStorage)

// REGISTRO
export async function registerUser(userData) {
  return new Promise((resolve, reject) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.find((user) => user.email === userData.email);
      if (userExists) {
        return reject(new Error("Usuário já existe."));
      }

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      resolve(userData);
    } catch (error) {
      reject(new Error("Erro ao registrar usuário."));
    }
  });
}

// LOGIN
export async function loginUser({ email, password }) {
  return new Promise((resolve, reject) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        return reject(new Error("Email ou senha inválidos."));
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userEmail", email);
      resolve(user);
    } catch (error) {
      reject(new Error("Erro ao fazer login."));
    }
  });
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
