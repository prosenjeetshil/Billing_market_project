import { NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
function NavBar() {
  const[isAuth,setIsAuth]=useState(false);
  useEffect(()=>{
    if (localStorage.getItem('access_token') !== null){
      setIsAuth(true);
    }
  },[isAuth]);
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="#">SUPER-MARKET</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <div className="navbar-nav">
       
          <NavLink className="nav-link active" aria-current="page" to="/auth_component/add">Add Employee</NavLink>
          <NavLink className="nav-link" to="/auth_component/show">Show Employee</NavLink>
          <NavLink className="nav-link" to="/add">Add Expense</NavLink>
          <NavLink className="nav-link" to="/show">Show Expense </NavLink>
          <NavLink className="nav-link active" aria-current="page" to="/axios">axios</NavLink>
          <NavLink className="nav-link " to="/login" tabindex="-1" aria-disabled="true">Login</NavLink>
          <NavLink className="nav-link" to="">Logout </NavLink>
      </div>
    </div>
  </div>
</nav>
    </>
  )
}

export default NavBar