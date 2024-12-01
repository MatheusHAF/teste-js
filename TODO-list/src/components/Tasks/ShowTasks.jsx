import React, { useState, useEffect } from "react";
import CompletedTask from "./CompletedTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";

const ShowTasks = () => {
  // Estado para armazenar todas tasks
  const [tasks, setTasks] = useState([]);

  // Função para buscar as tasks do banco de dados
  const fetchDatabase = () => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data)) // Define as tasks no estado
      .catch((error) => console.error("Erro ao buscar tarefas:", error));
  };

  // Conectar ao BD e ler (GET) dados
  useEffect(() => {
    fetchDatabase();
    // Fazer a requisição a cada 0.5s
    const intervalId = setInterval(fetchDatabase, 500);
    // Limpar o intervalo
    return () => clearInterval(intervalId);
  }, []);

  //setando estados
  const [editing,setEditing] = useState(false)
  const [titleValue,setTitleValue] = useState('')
  const [descValue,setDescValue] = useState()

  //funcao para monitorar o input com titulo
  const changetitle = event=>{
    setTitleValue(event.target.value)
  }
  //funcao para monitorar o input com description
  const changedesc = event=>{
    setDescValue(event.target.value)
  }

  return (
    <div>
      {tasks.map((task) => (
        <form key={task.id}>
          <input
            type="text"
            
            onChange={changetitle} value={titleValue}
            style={{
              backgroundColor: task.stats === "completed" ? "lightgreen" : "lightgrey",
            }}
          />
          <input
            type="text"
            
            onChange={changedesc} value={descValue}
            style={{
              backgroundColor: task.stats === "completed" ? "lightgreen" : "lightgrey",
            }}
          />
          <CompletedTask task={task}/>
          <EditTask task={task.id,titleValue,descValue} />
          <DeleteTask task={task}/>
        </form>
      ))}
    </div>
  );
};

export default ShowTasks;
