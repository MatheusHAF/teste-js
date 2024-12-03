import React, { useState,useEffect } from "react";
import { createTask, getTasks} from '../firebase/firebaseFirestoreCRUD';

const TaskFormCreate = ({onNotifyShowTask}) => {
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
    const userId = localStorage.getItem("userId");
    e.preventDefault();
    if (title && description) {
      await createTask({ title: title, description: description, completed: false,userId: userId});
      
      //resetar os campos
      setTitle('');
      setDescription('');
      
      onNotifyShowTask();//notificar recarregamento
    }
  };

  return (
    <form onSubmit={handleAddTask}>
      <input className="input-edit" type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
      <input className="input-edit" type="text" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
      <input type="submit" value="📝" className="btn-edittask" />
      <button onClick={()=>{setTitle('');setDescription('')}}>🗑️</button>
    </form>
  );
};

export default TaskFormCreate;
