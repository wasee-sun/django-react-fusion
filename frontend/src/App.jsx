import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import NotFound from "./pages/notfound";


function Logout() {
  localStorage.clear();
  return <Login />
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>
        <Route path = "/login" element = {
          <Login />
        }/>
        <Route path = "/logout" element = {
          <Logout />
        }/>
        <Route path = "/register" element = {
          <RegisterAndLogout />
        }/>
        <Route path = "*" element = {
          <NotFound />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
