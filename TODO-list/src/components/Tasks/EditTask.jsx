import React, { useState } from 'react'

const EditTask = ({task}) => {
  //setando estados
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

  //funcao assicrona para editar os novos valores da Task
  async function updateTask(taskId,newTitle,newDesc){
    try{

      //conexao com o bd e atualizando os campos especificos (PATCH)
      const response = await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle, // Atualiza o campo `title`
          description: newDesc, // Atualiza o campo `description`
        }), 
      });

      //condicionando a requisicao
      if (!response.ok) {
        throw new Error("Erro ao atualizar o status da tarefa");
      }
      
      const updatedTask = await response.json();
      console.log("Task atualizada:", updatedTask);
  
    } catch (error){
      console.error("Erro ao atualizar o status da tarefa:", error);
    }
  }

  //separa as execucoes do botao para editar
  const handleEditTask = (e) =>{
    e.preventDefault();
    if (editing){
      updateTask(task.id,titleValue,descValue);
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