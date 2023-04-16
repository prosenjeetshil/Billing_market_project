import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function AddUser() {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const navigate = useNavigate();
    const saveData = data=>{
        axios.post('http://localhost:8000/api/user/',data,{headers: 
        {'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
         {withCredentials:true});
        //axios.post('http://localhost:8000/api/user/',data);
        navigate('/auth_component/show')
    }
  return (
    <>
    <div className='container'>
        <h2 style={{color:'green'}}>User Form</h2>
        <form onSubmit={handleSubmit(saveData)}>

            <label htmlFor='unm' >Username</label>
            <input type='text' id='unm' className='form-control' {...register('username')} /><br/><br/>
            
            <label htmlFor='pwd' >Password</label>
            <input type='password' id='pwd' className='form-control' {...register('password')}/><br/><br/>

            <label htmlFor='fnm' >First Name</label>
            <input type='text' id='fnm' className='form-control' {...register('first_name')}/><br/><br/>

            <label htmlFor='lnm' >Last Name</label>
            <input type='text' id='lnm' className='form-control' {...register('last_name')}/><br/><br/>

            <label htmlFor='mail' >Email Id</label>
            <input type='email' id='mail' className='form-control' {...register('email')}/><br/><br/>

            <label htmlFor='addr' >Address</label>
            <textarea type='text' id='addr' className='form-control' {...register('address')}/><br/><br/>

            <label htmlFor='con' >Contact</label>
            <textarea type='number' id='con' className='form-control' {...register('contact')}/><br/><br/>

            <label htmlFor='ct' >City</label>
            <textarea type='text' id='ct' className='form-control' {...register('city')}/><br/><br/>



            <label htmlFor='pin' >Pincode</label>
            <input type='number' id='pin' className='form-control' {...register('pincode')}/><br/><br/>

            <label htmlFor='rl'>Role</label>
            <select id='rl' {...register('role')}>
                <option value='admin'>Admin</option>
                <option value='cashier'>Cashier</option>
                <option value='manager'>Manager</option>
                <option value='staff'>Staff</option>
            </select ><br/><br/>

            <input type='submit' className='btn btn-outline-success btn-lg col-3 me-3'/>

            
        </form>
    </div>
    </>
  )
}

export default AddUser