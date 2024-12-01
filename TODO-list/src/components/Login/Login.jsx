import React, { useEffect,useState } from 'react'
const Login = ({ onLoginSuccess }) => {

  //setando as infos dos usuarios
  const [users,setUsers] = useState([]);
  const [login,setLogin] = useState('');
  const [password,setPassword] = useState('');
  
  //consumindo os dados do banco de dados para realizar login
  useEffect(()=>{
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);
  
  //funcao para testar o bd e site
  function verifyuser(event){
    event.preventDefault();//nao recarregar a pagina

    // encontrar o usuario no array de usuarios
    const searchuser = users.find(
      (user) => user.login === login && user.password === password
    );

    //condicionar a busca de usuarios
    if(searchuser){
      alert("Bem vindo! login realizado");
      onLoginSuccess();// chamar a funcao de Sucesso no Login
    }
    else{
      alert("Usuario e/ou senha incorreto(s), tente novamente")
    }
  }
  return (
    <div>
      <h2>Welcome!</h2>
      <form>
        <div>
          <label htmlfor="login">Login: </label>
          <input type="text" name="login" id="idlogin" value={login} onChange={(e)=>setLogin(e.target.value)} required/>
        </div>
        <div>
          <label htmlfor="password">Password: </label>
          <input type="password" name="password" id="idpassword" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
          <input type="submit" value="Submit" onClick={verifyuser}/>
      </form>
    </div>
  )
}

export default Login