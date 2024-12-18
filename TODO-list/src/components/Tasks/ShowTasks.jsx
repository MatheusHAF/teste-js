import React, { useState, useEffect } from "react";
import CompletedTask from "./CompletedTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import {getTasks} from '../firebase/firebaseFirestoreCRUD';
import Loading from "../Tasks/Loading"


const ShowTasks = ({signalReload}) => {

  // Estado para armazenar todas tasks
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const[removeLoading,setRemoveLoading] = useState(false);
  const[editing,setediting] = useState(false);
  
  const userId = localStorage.getItem("userId");

  const Editing = () =>{
    setediting((prev)=>!prev);//altenar os valores
  }

  const fetchTasks = async () => {
    const tasksFromDb = await getTasks();
    setTasks(tasksFromDb);
    setRemoveLoading(true)
  };
  // Carregar tarefas do Firestore
  useEffect(() => {
    // Carregar as tarefas inicialmente
    fetchTasks();
  }, [signalReload]);

  return (
  <div>
    {!removeLoading && <Loading/>}
    {tasks.map((task) =>
      task.userId === userId ? (
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
          {!editing?<CompletedTask onAction={fetchTasks} task={task} />:null}
          <EditTask onAction={fetchTasks} task={task} bloqued={Editing}/>
          {!editing?<DeleteTask onAction={fetchTasks} task={task} />:null}
        </form>
      ) : null // Não renderiza nada se não corresponder
    )}
  </div>
);
};

export default ShowTasks;
