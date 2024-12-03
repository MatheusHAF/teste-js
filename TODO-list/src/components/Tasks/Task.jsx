import React, { useEffect, useState } from "react";
import TaskFormCreate from "./TaskFormCreate";
import ShowTasks from "./ShowTasks";
import { getTasks } from "../firebase/firebaseFirestoreCRUD";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [signalReload,setsignalReaload] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      window.location.href = "../Login/Login.tsx"; // Redireciona para /login
    }
  }, [userId]); // Dependência de userId

  //funcao para notificar componentes e recarrecar a visualizacao
  const notifyShowTask = () =>{
    setsignalReaload((prev)=>!prev);//alterna os valores
  }

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        <h3>Create new Task</h3>
        <TaskFormCreate onNotifyShowTask={notifyShowTask}/>
      </div>
      <div>
        <h3>All Tasks</h3>
        <ShowTasks signalReload={signalReload} />
      </div>
    </div>
  );
};

export default Task;
