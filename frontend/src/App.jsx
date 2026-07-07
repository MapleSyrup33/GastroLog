import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './styles/App.css'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register/>
}
function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<RegisterAndLogout/>}/>
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

