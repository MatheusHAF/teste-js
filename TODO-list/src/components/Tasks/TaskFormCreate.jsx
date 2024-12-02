import React, { useState,useEffect } from "react";
import { createTask, getTasks} from '../firebase/firebaseFirestoreCRUD';

const TaskFormCreate = () => {
  // estados para armazenar os dados da  task
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Carregar tarefas do Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromDb = await getTasks();
      setTasks(tasksFromDb);
    };

    fetchTasks();
  }, []);

  // Função para adicionar uma nova task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (title && description) {
      await createTask({ title: title, description: description, completed: false });
      
      //resetar os campos
      setTitle('');
      setDescription('');
      const tasksFromDb = await getTasks(); // Recarregar as tarefas
      setTasks(tasksFromDb);
    }
  };

  return (
    <form onSubmit={handleAddTask}>
      <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
      <input type="submit" value="📝" />
      <input type="submit" value="❌" 
      onClick={()=>{
        setTitle('');
        setDescription('')}
      } />
    </form>
  );
};

export default TaskFormCreate;
