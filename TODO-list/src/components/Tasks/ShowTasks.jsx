import React, { useState, useEffect } from "react";
import CompletedTask from "./CompletedTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import {getTasks} from '../firebase/firebaseFirestoreCRUD';


const ShowTasks = () => {
  // Estado para armazenar todas tasks
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Carregar tarefas do Firestore
  useEffect(() => {
    // Função para carregar as tarefas
    const fetchTasks = async () => {
      const tasksFromDb = await getTasks();
      setTasks(tasksFromDb);
    };
  
    // Carregar as tarefas inicialmente
    fetchTasks();
  
    // Recarregar as task
    const interval = setInterval(() => {
      fetchTasks(); // Chama fetchTasks a cada 1 segundo
    }, 1000);
    return () => clearInterval(interval);
  }, []); 

  return (
    <div>
      {tasks.map((task) => (
        <form key={task.id}>
          <input
            disabled
            type="text"
            value={task.title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              backgroundColor: task.completed === true ? "lightgreen" : "lightgrey",
            }}
          />
          <input
            disabled
            type="text"
            value={task.description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              backgroundColor: task.completed === true ? "lightgreen" : "lightgrey",
            }}
          />
          <CompletedTask task={task}/>
          <EditTask task={task}/>
          <DeleteTask task={task}/>
        </form>
      ))}
    </div>
  );
};

export default ShowTasks;
