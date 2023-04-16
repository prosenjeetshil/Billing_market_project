import axios from 'axios';
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function ShowUser() {
  
  const [users,setUsers]= useState([]);

  async function FetchAllUser(){
    const result = await axios.get('http://127.0.0.1:8000/api/user/',{headers: 
    {'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
     {withCredentials:true});
    setUsers(result.data);
    //const result = await axios.get('http://localhost:8000/api/user/');
    //setUsers(result.data);
  }

  useEffect(()=>{
    
FetchAllUser();
  },[]);
  return (
    <>
    <div>
      <table className='table table-dark '>
        <thead>
          <tr>
            <th>Username</th>
            
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>Address</th>
            <th>Contact</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Role</th>
            <th>Action</th>
    </tr>
        </thead>
        <tbody>
          {
            users?.map(obj=>{
              return(
                <>
                <tr>
                  <td>{obj.username}</td>
                  <td>{obj.first_name}</td>
                  <td>{obj.last_name}</td>
                  <td>{obj.email}</td>
                  <td>{obj.address}</td>
                  <td>{obj.contact}</td>
                  <td>{obj.city}</td>
                  <td>{obj.pincode}</td>
                  <td>{obj.role}</td>
                  <td>
                    <NavLink to={`/auth_component/edit/${obj.id}/`}><button className='btn btn-warning '>Edit</button></NavLink>
                    <NavLink  to={`/auth_component/delete/${obj.id}/`}><button className='btn btn-danger '>Delete</button></NavLink>
                  </td>
                </tr>
                </>
              );
            })
          }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default ShowUser