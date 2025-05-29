import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useAuth } from "../services/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [partner1, setPartner1] = useState("");
  const [partner2, setPartner2] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [weddingDate, setWeddingDate] = useState("");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Carrega dados do Firestore
  useEffect(() => {
    if (!currentUser) return;

    const loadProfile = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPartner1(data.partner1 || "");
          setPartner2(data.partner2 || "");
          setEmail(currentUser.email || "");
          setPhone(data.phone || "");
          setWeddingDate(
            data.weddingDate ? data.weddingDate.split("T")[0] : ""
          );
        } else {
          setError("Perfil não encontrado.");
        }
      } catch (err) {
        setError("Erro ao carregar perfil.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser]);

  // Salvar alterações do perfil (Firestore)
  const handleSaveProfile = async () => {
    setError(null);
    setMessage(null);
    if (!currentUser) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        partner1,
        partner2,
        phone,
        weddingDate,
      });

      setMessage("Perfil atualizado com sucesso!");
    } catch (err) {
      setError("Erro ao atualizar perfil.");
      console.error(err);
    }
  };

  // Reautenticar para alterar senha
  const reauthenticate = async () => {
    if (!currentUser || !currentPassword) {
      throw new Error("Senha atual necessária para alteração.");
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(currentUser, credential);
  };

  // Alterar senha
  const handleChangePassword = async () => {
    setError(null);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setError("Nova senha e confirmação não conferem.");
      return;
    }
    if (!newPassword) {
      setError("Informe a nova senha.");
      return;
    }

    try {
      await reauthenticate();
      await updatePassword(currentUser, newPassword);
      setMessage("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Erro ao alterar senha. Verifique sua senha atual.");
      console.error(err);
    }
  };

  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Perfil</h2>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <label className="block mb-2 font-semibold">Nome do Noivo(a) 1</label>
      <input
        type="text"
        value={partner1}
        onChange={(e) => setPartner1(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Nome do Noivo(a) 2</label>
      <input
        type="text"
        value={partner2}
        onChange={(e) => setPartner2(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Email (não editável)</label>
      <input
        type="email"
        value={email}
        disabled
        className="w-full border rounded p-2 mb-4 bg-gray-100 cursor-not-allowed"
      />

      <label className="block mb-2 font-semibold">Telefone</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Data do Casamento</label>
      <input
        type="date"
        value={weddingDate}
        onChange={(e) => setWeddingDate(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <button
        onClick={handleSaveProfile}
        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 mb-8"
      >
        Salvar Alterações
      </button>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-4">Alterar Senha</h3>

      <label className="block mb-2 font-semibold">Senha Atual</label>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Nova Senha</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block mb-2 font-semibold">Confirmar Nova Senha</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <button
        onClick={handleChangePassword}
        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
      >
        Alterar Senha
      </button>
    </div>
  );
};

export default Profile;
