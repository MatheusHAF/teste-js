import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth
import { firebaseApp } from "../firebase/firebaseConfig";
import '../Styles/login.css'

const Login = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState(""); // Email (login)
  const [password, setPassword] = useState(""); // Senha
  const [error, setError] = useState(null); // Para armazenar mensagens de erro

  const auth = getAuth(firebaseApp); // Obtenha a instância do Auth

  const handleLogin = async (event) => {
    event.preventDefault(); // Previne o recarregamento da página

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        login,
        password
      );
      onLoginSuccess(); // Informa o App que o login foi bem-sucedido
      localStorage.setItem("userId", userCredential.user.uid); //armazena o id do usuario
      //localStorage.setItem("userName", userCredential.user.name); //armazena o id do usuario
    } catch (err) {
      console.error("Erro de login:", err); // Exibe o erro no console

      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="login">E-mail: </label>
          <input
            className="login-input"
            type="email"
            name="login"
            id="idlogin"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            className="login-input"
            type="password"
            name="password"
            id="idpassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-btn" type="submit">Sign In</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
