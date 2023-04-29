import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

function Delete() {
    const {pk} = useParams();
    const[ user, setUser ] = useState({});
    const navigate = useNavigate();

    async function fetchUser(){
        const result = await axios.get(`http://localhost:8000/apii/exp/${pk}`)
        setUser(result.data)
    }
    function DeleteUser(){
        axios.delete(`http://localhost:8000/apii/exp/${pk}/`,{headers: 
        {'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
         {withCredentials:true});
        navigate('/show');

    }
    useEffect(()=>{
        fetchUser();
    }, [])
  return (
    <>
    <div className='container'>
        <form onSubmit={()=>DeleteUser()} className='mt-5'>
        <h1>Do you really want to delete  <span>{user.expenseID}</span> record?</h1>
        <input type='submit' value='Yes' className='btn btn-danger'/>
        <NavLink to='/show'><input type='button' value='No' className='btn btn-warning' /></NavLink>
        </form>
    </div>
    </>
  )
}

export default Delete