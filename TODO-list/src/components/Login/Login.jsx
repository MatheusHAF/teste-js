// Login.jsx
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth
import { firebaseApp } from "../firebase/firebaseConfig"; // Certifique-se de que o caminho está correto

const Login = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState(""); // Email (login)
  const [password, setPassword] = useState(""); // Senha
  const [error, setError] = useState(null); // Para armazenar mensagens de erro

  const auth = getAuth(firebaseApp); // Obtenha a instância do Auth

  const handleLogin = async (event) => {
    console.log("clicado");
    event.preventDefault(); // Previne o recarregamento da página

    console.log("Tentando fazer login com:", login, password); // Adicionando um log para ver os valores digitados

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
            type="email" // Alterei o tipo para "email" para validação nativa
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
