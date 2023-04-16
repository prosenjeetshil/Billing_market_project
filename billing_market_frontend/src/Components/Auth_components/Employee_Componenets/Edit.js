import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'

function Edit() {
    const {userId} = useParams();
    const {register,handleSubmit,setValue} = useForm();
    const navigate = useNavigate();
    async function FetchUser(){
        const result = await axios.get(`http://localhost:8000/api/user/${userId}/`,{headers: 
        {'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
         {withCredentials:true});
         
        setValue('username',result.data.username);
        setValue('first_name',result.data.first_name);
        setValue('last_name',result.data.last_name);
        setValue('email',result.data.email);
        setValue('address',result.data.address);
        setValue('contact',result.data.contact);
        setValue('city',result.data.city);
        setValue('pincode',result.data.pincode);
        setValue('role',result.data.role);
    }
    const saveData = data=>{
      axios.put(`http://127.0.0.1:8000/api/user/${userId}/`,data,{headers: 
      {'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
       {withCredentials:true});
      navigate('/auth_component/show');
    }
    useEffect(()=>{
        FetchUser();
    },[])
  return (
    <>
      <div className='container'>
        <h2 style={{color:'green'}}>User Edit Form Form</h2>
        <form onSubmit={handleSubmit(saveData)}>

            <label htmlFor='unm' >Username</label>
            <input type='text' id='unm' className='form-control' {...register('username')}/><br/><br/>
            
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
                <option value='cashier'>Manager</option>
                <option value='manager'>Cashier</option>
                <option value='staff'>Staff</option>
            </select ><br/><br/>

            <input type='submit'  value = 'Edit' className='btn btn-outline-success btn-lg col-3 me-3'/>
            
            
        </form>
    </div>
    </>
  )
}

export default Edit