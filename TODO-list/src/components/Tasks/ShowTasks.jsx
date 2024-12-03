import React, { useState, useEffect } from "react";
import CompletedTask from "./CompletedTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import {getTasks} from '../firebase/firebaseFirestoreCRUD';


const ShowTasks = ({signalReload}) => {
  // Estado para armazenar todas tasks
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = async () => {
    const tasksFromDb = await getTasks();
    setTasks(tasksFromDb);
  };
  // Carregar tarefas do Firestore
  useEffect(() => {
    // Carregar as tarefas inicialmente
    fetchTasks();
  }, [signalReload]);

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
          <CompletedTask onAction={fetchTasks} task={task}/>
          <EditTask onAction={fetchTasks} task={task}/>
          <DeleteTask onAction={fetchTasks} task={task}/>
        </form>
      ))}
    </div>
  );
};

export default ShowTasks;
