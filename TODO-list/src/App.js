//import styles
import './App.css';

//import components
import Login from './components/Login/Login';
import Task from './components/Tasks/Task';

//imports
import React, { useState } from 'react';

function App() {
  //Controlar login
  const [isLogged, setIsLogged] = useState(false); 
  
  // Função para mudar a tela ao fazer login
  const handleLogin = () => {
    setIsLogged(true);
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div>
      {isLogged ? (
        <Task/> // Exibe a tela de tarefas
      ) : (
        <Login onLoginSuccess={handleLogin} /> // ao retornar sucesso no login, chama a funcao para trocar a tela
      )}
      </div>
    </div>
  );
}

export default App;
