import React from 'react'
import {getTasks,deleteTask} from '../firebase/firebaseFirestoreCRUD';
import { useState } from 'react';

const DeleteTask = ({onAction,task}) => {
  
  const [tasks, setTasks] = useState([]);

  // Função para excluir uma tarefa
  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    const tasksFromDb = await getTasks();
    setTasks(tasksFromDb);
    onAction();
  };
  return (
    <button onClick={(e)=>{e.preventDefault();handleDeleteTask(task.id)}}>❌</button>
  )
}

export default DeleteTask