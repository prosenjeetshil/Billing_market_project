import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Email() {
  const {register,handleSubmit} =useForm();

   async function savaData(data){
    const result= await axios.post('http://127.0.0.1:8000/api/request-reset/',data)
    console.log(result.data)
    alert("email send successfully!!")
  } 
  return (
   <>
    <form className='container' onSubmit={handleSubmit(savaData)}>
      <h1><b>Enter your email
         address and we will send you a password 
         reset link.....</b></h1>
         <br></br>
   <label htmlFor='email'>Enter your mail Id:</label>
   <input type='emai' name='email_from' id='email' className='form-control' placeholder='enter your email'
   {...register('email')}/>
   <center><input type='submit'></input></center>
   </form>

   </>
  )
}

export default Email
   