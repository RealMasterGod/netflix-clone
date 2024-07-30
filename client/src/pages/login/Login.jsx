import React from 'react'
import './login.scss'
import { Link } from 'react-router-dom'
import { login } from '../../authContext/apiCalls'
import { AuthContext } from '../../authContext/AuthContext'
const Login = () => {
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")
  const {dispatch} = React.useContext(AuthContext)
  const handleLogin = (e) => {
    e.preventDefault()
    login({email,password}, dispatch)
  }
    return (
        <div className="login">
      <div className="top">
        <div className="wrapper">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt="NetflixLogo"
        />
        </div>
      </div>
      <div className="container">
        <form>
            <h1>Sign In</h1>
            <input onChange={e => setEmail(e.target.value)} type="email" placeholder='Email or Phone number'/>
            <input onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' />
            <button onClick={handleLogin} className='loginButton'>Sign In</button>
            <Link className="link" to={"/register"}>
            <span>New to Netflix? <b>Sign up now.</b></span>
            </Link>
            <small>
                This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>
            </small>
        </form>
      </div>
    </div>
    )
}

export default Login
