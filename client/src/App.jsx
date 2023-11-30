import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
function App() {

  return (
    <>
      <Router basename = '/'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
