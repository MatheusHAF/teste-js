import React from 'react'
import { useEffect,useState } from 'react';

const CompletedTask = ({task}) => {

  async function ChangeStatsTask(taskid,newStatus){
    try{

      //conexao com o bd e atualizando os campos especificos (PATCH)
      const response = await fetch(`http://localhost:5000/tasks/${taskid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stats: newStatus, // Atualiza apenas o campo `stats`
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

  return (
    <button 
      onClick={(e) => { 
        e.preventDefault();

        //alterna entre a task completa ou pendente
        const newStatus = task.stats === "completed" ? "pending" : "completed";
        ChangeStatsTask(task.id,newStatus)
      }}
        
    >✔️</button>
  )
}

export default CompletedTask