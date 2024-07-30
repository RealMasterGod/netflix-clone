import React from "react"
import "./app.scss"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Watch from "./pages/watch/Watch"
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import { AuthContext } from "./authContext/AuthContext"

function App() {
  const {user} = React.useContext(AuthContext)
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/movies" element={user ? <Home type="movie"/> : <Navigate to="/login" />} />
      <Route path="/series" element={user ? <Home type="series"/> : <Navigate to="/login" />} />
      <Route path="/watch" element={user ? <Watch /> : <Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to="/" />:<Login /> } />
      <Route path="/register" element={user ?<Navigate to="/" />:<Register />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
