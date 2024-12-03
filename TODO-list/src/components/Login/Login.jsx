// Login.jsx
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth
import { firebaseApp } from "../firebase/firebaseConfig";

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

      console.log("Usuário autenticado:", userCredential.user); // Exibe o usuário autenticado no console

      onLoginSuccess(); // Informa o App que o login foi bem-sucedido
    } catch (err) {
      console.error("Erro de login:", err); // Exibe o erro no console

      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Welcome!</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="login">Login (Email): </label>
          <input
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
            type="password"
            name="password"
            id="idpassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
