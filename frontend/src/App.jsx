import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </div>
  )
}

export default App