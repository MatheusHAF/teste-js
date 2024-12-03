import React, { useState } from "react";
import TaskFormCreate from "./TaskFormCreate";
import ShowTasks from "./ShowTasks";
import { getTasks } from "../firebase/firebaseFirestoreCRUD";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [signalReload,setsignalReaload] = useState(false);
  
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
