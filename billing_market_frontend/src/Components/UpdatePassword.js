import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

function UpdatePassword() {
    const {username}=useParams()
    const {handleSubmit, setValue,formState:{errors},reset}=useForm()
     async function FetchDetail(){
        const result=  await  axios.post(`http://127.0.0.1:8000/api/login/${username}/`)
        setValue('password',result.data.password1)
        
     }
     const savaData=data=>{
        axios.put(`http://127.0.0.1:8000/api/login/${username}/`)
     }

    
       

     useEffect(()=>{FetchDetail()},[])
       
  return (
   <>
   <form  className='container' onSubmit={handleSubmit(savaData)}>
   <label htmlFor='pass1'>New Password</label>
   <input type='password' id='pass1' className='form-control'/>
   <br>
   </br>
   <label htmlFor='pass2'>Confrim Password</label>
   <input type='password' id='pass2' className='form-control'></input>
   <br></br>
   <center><input type='submit'></input></center>
   
   </form>
   </>
  )
}

export default UpdatePassword