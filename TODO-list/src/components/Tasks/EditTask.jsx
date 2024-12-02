import React, { useState } from 'react'
import {getTasks, updateTask, deleteTask, toggleTaskCompletion } from '../firebase/firebaseFirestoreCRUD';

const EditTask = ({task}) => {
  //setando estados
  const [tasks, setTasks] = useState([]);
  const [editing,setEditing] = useState(false)
  const [titleValue,setTitleValue] = useState(task.title)
  const [descValue,setDescValue] = useState(task.description)

  //funcao para monitorar o input com titulo
  const changetitle = event=>{
    setTitleValue(event.target.value)
  }
  //funcao para monitorar o input com description
  const changedesc = event=>{
    setDescValue(event.target.value)
  }

  // Função para editar uma tarefa
  const update = async (taskId,titleValue,descValue) => {
    await updateTask(taskId, { title: titleValue, description: descValue });
      const tasksFromDb = await getTasks();
      setTasks(tasksFromDb); // Preenche o campo de descrição
  };
  //separa as execucoes do botao para editar
  const handleEditTask = (e) =>{
    e.preventDefault();
    if (editing){
      update(task.id,titleValue,descValue);
    }
    setEditing(!editing);
  }
  return (
    <>
    {editing?
    <form>
      <input type="text" value={titleValue} onChange={changetitle}/>
      <input type="text" value={descValue} onChange={changedesc}/>
    </form>:''}
    <button onClick={handleEditTask}>{editing?"Salvar":"✏️"}</button>
    </>
  )
}

export default EditTask