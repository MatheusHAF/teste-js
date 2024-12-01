import React, { useState } from "react";

const TaskFormCreate = () => {
  // estados para armazenar os dados da  task
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Função para criar a task e enviar para o db
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o recarregamento

    // Cria a task para o bd
    const newTask = { title, description };

    // Envia os dados (POST)
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task criada com sucesso:", data);

        //limpar os campos
        setTitle('');
        setDescription('');
      })
      .catch((error) => {
        console.error("Erro ao criar task:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
      <input type="submit" value="📝" />
      <input type="submit" value="❌" 
      onClick={()=>{
        setTitle('');
        setDescription('')}
      } />
    </form>
  );
};

export default TaskFormCreate;
