import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Feedback from './pages/Feedback'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div>
      <nav style={{padding:10, borderBottom:'1px solid #ddd'}}>
        <Link to="/" style={{marginRight:10}}>Home</Link>
        <Link to="/signup" style={{marginRight:10}}>Signup</Link>
        <Link to="/login" style={{marginRight:10}}>Login</Link>
        <Link to="/feedback" style={{marginRight:10}}>My Feedback</Link>
        <Link to="/dashboard">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}
