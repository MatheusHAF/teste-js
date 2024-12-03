import React, { useEffect, useState } from "react";
import TaskFormCreate from "./TaskFormCreate";
import ShowTasks from "./ShowTasks";
import '../Styles/task.css'

const Task = () => {
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
    <div className="task-container">
      <div className="div-newtask">
        <h3>Create a new Task</h3>
        <TaskFormCreate onNotifyShowTask={notifyShowTask}/>
      </div>
      <div className="div-showtask">
        <h3>All Tasks</h3>
        <ShowTasks signalReload={signalReload} />
      </div>
    </div>
  );
};

export default Task;
