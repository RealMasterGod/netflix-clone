import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import "./App.css";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import NewProduct from "./pages/newProduct/NewProduct";
import NewUser from "./pages/newUser/NewUser";
import Product from "./pages/product/Product";
import ProductList from "./pages/productList/ProductList";
import User from "./pages/user/User";
import UserList from "./pages/userList/UserList";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/newList";

function App() {
  // const user = false;
  const {user} = React.useContext(AuthContext) 
  
  return (
    <BrowserRouter>
      {user && <Topbar />}
      <div className="container">
        {user && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/lists"
            element={user ? <ListList/> : <Navigate to="/login" />}
          />
          <Route
            path="/lists/:listid"
            element={user ? <List /> : <Navigate to="/login" />}
          />
          <Route
            path="/newList"
            element={user ? <NewList/> : <Navigate to="/login" />}
          />
          <Route
            path="/newProduct"
            element={user ? <NewProduct /> : <Navigate to="/login" />}
          />
          <Route
            path="/newUser"
            element={user ? <NewUser /> : <Navigate to="/login" />}
          />
          <Route
            path="/product/:productId"
            element={user ? <Product /> : <Navigate to="/login" />}
          />
          <Route
            path="/movies"
            element={user ? <ProductList /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={user ? <UserList /> : <Navigate to="/login" />}
          />
          <Route
            path="/user/:userId"
            element={user ? <User /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
