import React from 'react'

const DeleteTask = ({task}) => {
  async function Delete(taskId){
    //alert(`Deletar task id:${taskId}`);
    try {
      //deletando do bd de acordo com o id da task
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Task excluída com sucesso!");
      } else {
        alert("Erro ao excluir a task!");
      }
    } catch (error) {
      console.error("Erro ao excluir a task:", error);
      alert("Erro ao excluir a task!");
    }
  }
  return (
    <button onClick={(e)=>{e.preventDefault();Delete(task.id)}}>❌</button>
  )
}

export default DeleteTask