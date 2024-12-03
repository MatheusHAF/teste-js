import React from 'react'
import { useEffect,useState } from 'react';
import { getTasks, toggleTaskCompletion } from '../firebase/firebaseFirestoreCRUD';

const CompletedTask = ({onAction,task}) => {
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas do Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromDb = await getTasks();
      setTasks(tasksFromDb);
    };

    fetchTasks();
  }, []);

  const handleToggleCompletion = async (taskId) => {
    const taskToToggle = tasks.find((task) => task.id === taskId);
    await toggleTaskCompletion(taskId, !taskToToggle.completed); // Passa o valor alternado de completed
    const tasksFromDb = await getTasks();
    setTasks(tasksFromDb);
    onAction();
  };

  return (
    <button 
      onClick={(e) => { 
        e.preventDefault();
        handleToggleCompletion(task.id)
        console.log(task)
      }}
        
    >✔️</button>
  )
}

export default CompletedTask