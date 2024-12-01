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

  return (
    <div>
      {tasks.map((task) => (
        <form key={task.id}>
          <input
            type="text"
            value={task.title}
            style={{
              backgroundColor: task.stats === "completed" ? "lightgreen" : "lightgrey",
            }}
          />
          <input
            type="text"
            value={task.description}
            style={{
              backgroundColor: task.stats === "completed" ? "lightgreen" : "lightgrey",
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
