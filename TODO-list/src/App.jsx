// App.jsx
import './App.css';
import React, { useState } from "react";
import Login from './components/Login/Login';
import Task from './components/Tasks/Task';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(true);
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div>
        {isLogged ? (
          <Task /> // Exibe a tela de tarefas
        ) : (
          <Login onLoginSuccess={handleLogin} /> // Renderiza a tela de login
        )}
      </div>
    </div>
  );
}

export default App;
