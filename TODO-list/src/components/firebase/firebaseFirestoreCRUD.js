import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { firebaseApp } from './firebaseConfig';

const db = getFirestore(firebaseApp);

// Função para criar uma nova tarefa com título, descrição e status
export const createTask = async (task) => {
  try {
    const docRef = await addDoc(collection(db, 'Tasks'), task);
    console.log("Tarefa criada com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao criar tarefa: ", e);
  }
};

// Função para ler todas as tarefas
export const getTasks = async () => {
  const tasksSnapshot = await getDocs(collection(db, 'Tasks'));
  const tasksList = tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return tasksList;
};

// Função para atualizar uma tarefa
export const updateTask = async (taskId, updatedTask) => {
  const taskRef = doc(db, 'Tasks', taskId);
  try {
    await updateDoc(taskRef, updatedTask);
    console.log("Tarefa atualizada com ID: ", taskId);
  } catch (e) {
    console.error("Erro ao atualizar tarefa: ", e);
  }
};

// Função para excluir uma tarefa
export const deleteTask = async (taskId) => {
  const taskRef = doc(db, 'Tasks', taskId);
  try {
    await deleteDoc(taskRef);
    console.log("Tarefa deletada com ID: ", taskId);
  } catch (e) {
    console.error("Erro ao deletar tarefa: ", e);
  }
};

// Função para alternar entre concluída e não concluída
export const toggleTaskCompletion = async (taskId, completed) => {
  const taskRef = doc(db, 'Tasks', taskId);
  try {
    await updateDoc(taskRef, { completed });
    console.log("Tarefa alterada: ", taskId);
  } catch (e) {
    console.error("Erro ao alternar status de tarefa: ", e);
  }
};
