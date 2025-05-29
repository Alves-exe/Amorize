import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

export async function getTasksFromFirestore(userId) {
  const tasksCollection = collection(db, "users", userId, "tasks");
  const querySnapshot = await getDocs(tasksCollection);
  const tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });
  return tasks;
}

export async function addTaskToFirestore(userId, task) {
  const tasksCollection = collection(db, "users", userId, "tasks");
  await addDoc(tasksCollection, task);
}

export async function updateTaskInFirestore(userId, taskId, updatedFields) {
  const taskDoc = doc(db, "users", userId, "tasks", taskId);
  await updateDoc(taskDoc, updatedFields);
}

export async function deleteTaskFromFirestore(userId, taskId) {
  const taskDoc = doc(db, "users", userId, "tasks", taskId);
  await deleteDoc(taskDoc);
}

// Nova função para escuta em tempo real
export function listenTasksRealtime(userId, callback) {
  const tasksCollection = collection(db, "users", userId, "tasks");
  const q = query(tasksCollection);

  // Retorna a função unsubscribe para parar a escuta quando necessário
  return onSnapshot(q, (querySnapshot) => {
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    callback(tasks);
  });
}
