import React from "react";
import "./login.css";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";
import { SpaRounded } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {isFetching,error, dispatch} = React.useContext(AuthContext) 

  const handleLogin = (e) => {
    e.preventDefault()
    login({email,password},dispatch)
  }
  return (
    <div className="login">
      <form className="loginForm">
        <h1>Admin Login</h1>
        <input
          type="email"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={handleLogin} disabled={isFetching}>Sign In</button>
        {error && <span style={{color: 'crimson', marginTop: '5px', fontSize: '12px'}}>Wrong Credentials...make sure you are admin to perform this action</span>}
      </form>
    </div>
  );
};

export default Login;
