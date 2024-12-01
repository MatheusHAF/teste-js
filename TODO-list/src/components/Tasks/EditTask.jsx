import React, { useState } from 'react'

const EditTask = (taskId,titleValue,descValue) => {
  const [editing,setEditing] = useState(false)

  //funcao assicrona para editar os novos valores da Task
  async function updateTask(taskId,newTitle,newDesc){
    try{

      //conexao com o bd e atualizando os campos especificos (PATCH)
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
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
      updateTask(taskId,titleValue,descValue);
    }
    setEditing(!editing);
  }
  return (
    <>
    <button onClick={handleEditTask}>{editing?"Salvar":"✏️"}</button>
    </>
  )
}

export default EditTask