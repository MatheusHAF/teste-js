// App.jsx
import "./App.css";
import React, { useState } from "react";
import Login from "./components/Login/Login";
import Task from "./components/Tasks/Task";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const userId = localStorage.getItem("userId");

  const logout = () => {
    localStorage.removeItem("userId"); // Remove o userId ao deslogar
    setIsLogged(false); // Atualiza o estado para refletir o logout
    window.location.href = "/Login/Login.tsx";
  };

  const handleLogin = () => {
    setIsLogged(true);
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      {userId ? (
        <>
          <p>Welcome</p>
          <button onClick={logout}>LOGOUT</button>
        </>
      ) : null}
      <div>
        {userId ? (
          <Task /> // Exibe a tela de tarefas
        ) : (
          <Login onLoginSuccess={handleLogin} /> // Renderiza a tela de login
        )}
      </div>
    </div>
  );
}

export default App;
