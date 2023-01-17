import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/Signup'
import Home from "./components/HomePage"

const AllRoutes = () => {
  return (
    <div>
            <Routes> 
                    <Route exact path='/' element={<Login />}  />
                    <Route exact path='/signup' element={<Signup />}  />
                    <Route exact path='/Home' element={<Home />}  />
            </Routes>
    </div>
  )
}

export default AllRoutes
