// src/services/authServiceLocal.js

const USERS_KEY = "amorize_users";
const CURRENT_USER_KEY = "amorize_current_user";

export function registerUser(data) {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const userExists = users.find((u) => u.email === data.email);
    if (userExists) {
      return reject(new Error("E-mail já cadastrado."));
    }

    const newUser = {
      ...data,
      id: Date.now(),
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    resolve(newUser);
  });
}

export function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return reject(new Error("E-mail ou senha inválidos."));
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    resolve(user);
  });
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}
