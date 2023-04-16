import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function Show() {
    const [user ,setUsers ] = useState([]);
    async function fetchAllUser() {
        const result = await axios.get('http://localhost:8000/apii/exp/',{headers: 
    {'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
     {withCredentials:true});
    setUsers(result.data);
    console.log(result.data)
    }
    useEffect(()=>{
        fetchAllUser();
    }, [])

  return (
    <>
        <table className='table' >
            <thead>
                <tr>
                    <th>Expense ID</th>
                    <th>Amount</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                {
                    user?.map(obj=>{
                        return(
                            <tr>
                                <td>{obj.expenseID}</td>
                                <td>{obj.amount}</td>
                                <td>{obj.created_at}</td>
                                <td>
                                    <NavLink to={`/update/${obj.id}`}><button className='btn btn-warning'>Update</button></NavLink>&nbsp;&nbsp;
                                    <NavLink to={`/delete/${obj.id}`}><button className='btn btn-danger'>Delete</button></NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
  );
}

export default Show;