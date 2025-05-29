import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

export function listenTasksRealtime(userId, callback) {
  const tasksCollection = collection(db, "users", userId, "tasks");
  const q = query(tasksCollection);
  return onSnapshot(q, (querySnapshot) => {
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    callback(tasks);
  });
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
