import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

function DeleteUser() {
    const {userId} = useParams();
    const [users,setUsers] = useState({});
    const navigate = useNavigate();

    async function FetchUser(){
        const result = await axios.get(`http://localhost:8000/api/user/${userId}/`);
        setUsers(result.data);
    }

    function DeleteUser(){
        axios.delete(`http://127.0.0.1:8000/api/user/${userId}/`,{headers: 
        {'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
         {withCredentials:true});
        navigate('/auth_component/show');
    }
    useEffect(()=>{
        FetchUser();
    },[]);

  return (
    <>
    <div className='container'>
        <center><h2>Delete Confirmation</h2></center>
        <form onSubmit={()=>DeleteUser()}>
            <h3>Do you want to delete record ??</h3>
            <input type='submit' value='YES' className='btn btn-danger btn-lg col-3 me-3'/>
            <NavLink to='/auth_component/show'><button className='btn btn-warning btn-lg col-3'>NO</button></NavLink>
        </form>
    </div>
    </>
  )
}

export default DeleteUser