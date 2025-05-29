// src/services/authServiceFirebase.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// REGISTRAR
export async function registerUser(data) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const user = userCredential.user;

  const userData = {
    email: data.email,
    name: data.name,
    weddingDate: data.weddingDate,
    partner1: data.partner1,
    partner2: data.partner2,
    userType: data.userType,
    createdAt: new Date().toISOString(),
  };

  await setDoc(doc(db, "users", user.uid), userData); // salva os dados no Firestore

  return user;
}

// LOGIN
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Dados do usuário não encontrados no Firestore.");
  }

  const profileData = docSnap.data();

  return { ...user, profile: profileData };
}

// GET PERFIL SEPARADAMENTE
export async function getUserProfile(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}
