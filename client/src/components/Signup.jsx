import React from 'react'
import { useState, useEffect } from 'react';
import * as API from '../api/index'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [name, setName] = useState();
  
  const navigate = useNavigate();

  useEffect( () => {
      const user = localStorage.getItem("user")
      if(user === "true")
        navigate("/Home");
  }, [navigate])


  const submit = async () => {
      if(email === undefined || pass === undefined || name === undefined)
          alert("Please Enter all the details cannot be empty");
      else{
          
          const obj = {
            email: email,
            pass: pass,
            name: name          
          }
          
        const response = await API.SIGNUP(obj);
        if(response.data.code === -2)
            alert("Email already Registered")
          
        else if(response.data.code === -3)
            alert("something went wrong please try after some time")
        else    
            alert("Account Created");
      }
  }

  return (
      <div> 
        <center>
            <br />
            <h1> Sign Up</h1>
            <input type = "text" placeholder="Name" onChange={ (e) => setName(e.target.value) } /> <br />
            <input type = "text" placeholder='Email' onChange={ (e) => setEmail(e.target.value) } />  <br />
            <input type = "text" placeholder="Password" onChange={ (e) => setPass(e.target.value) } /> <br />
            <button onClick={submit} className="button" > Signup</button> <br /> <br />

            <Link to="/"> Already have a Account ?  Login </Link>
        </center>
      </div>
  )
}

export default Signup
