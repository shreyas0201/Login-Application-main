import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'
import * as api from '../api/index'
import { useEffect } from 'react';

const HomePage = () => {

  const navigate = useNavigate();  
  useEffect( () => {
      const status = localStorage.getItem("status");
      if(status === null || status === undefined || status === "false")
        navigate("/");
  }, [navigate])

  const state = JSON.parse(localStorage.getItem("user"));
  if(state === undefined)
    navigate("/");

  const [change, setChange] = useState(false)

  const [name, setName] = useState(state?.name);
  const [pass, setPass] = useState(state?.pass);

  const [name_change, setName_change] = useState("");
  const [pass_change, setPass_change] = useState("");

  const handleChange = () => {
      setChange(!change);
  }

  const handleCancle = () => {
    setChange(false);
  }
  

  const handleSubmit = async () => {

    if(name_change === "" || pass_change === ""){
        alert("please enter the name and password......");
        return;
    }

    const data = {
      id: state._id,
      name: name_change,
      email: state.email,
      pass: pass_change
    }

    const res = await api.CHANGE(data);
  
    if(res.data.code === 0){
        alert("data changed successfully");
        setName(name_change);
        setPass(pass_change);
        setChange(false);

        localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    else if (res.data.code === -3){
      alert("Authentication Failed (token value didn't matched)... please try logging in again.")
      handleLogout();
    }
    
    else  
        alert("Something went wrong please try again later");
      
  }

  const handleLogout = () => {
    localStorage.removeItem("status");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  }


  return (
    <div>
          <center>  <br /> <br />
            <h1> Hello <span> {state?.name.split(" ")[0]} </span></h1>
            <h3> Welcome to Home Page </h3> <br /> <br />

            <table>
                    <thead>
                          <th> Name </th>
                          <th> Email </th>
                          <th> Password </th>
                    </thead>

                    <tbody><tr>
                        <td>{name}</td>
                        <td>{state?.email}</td>
                        <td>{pass}</td>
                    </tr></tbody>
            </table>
            <br />
            <button onClick={handleChange} className='button'> Change Data </button> <br /><br />
            <button onClick={handleLogout} className="button" style={{ background: "#f44336"}} > Logout </button>
            {
              change === true 
              && (
                  <div> <br /> <br />
                     <input type="text" placeholder="Enter Name" onChange={e => setName_change(e.target.value)} /><br />
                     <input type="text" placeholder="Enter Password" onChange={e => setPass_change(e.target.value)} /><br/>
                     
                     <button onClick={handleCancle} className="button" style={{ background: "#f44336", width: 100, marginRight: 40}} > Cancle </button>
                     <button onClick={handleSubmit} className="button" style={{ background: "#4CAF50", width: 100}} > Change </button>
                  </div>
              )
            }
          </center>
    </div>

  )
}

export default HomePage
