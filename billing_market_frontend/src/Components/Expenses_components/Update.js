import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'

function Update() {
    const {pk} = useParams();
    const{ register, handleSubmit, setValue} = useForm();
    const navigate = useNavigate();

    async function fetchUser(){
        const result = await axios.get(`http://localhost:8000/apii/exp/${pk}/`,{headers: 
        {'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
         {withCredentials:true});
        console.log(result.data);
        setValue('expensseID',result.data.expenseID);
        setValue('amount',result.data.amount);
        setValue('created_at',result.data.created_at);

    }

    useEffect(()=>{
        fetchUser();
    },[])

    function saveData(data){
        console.log(data)
        axios.put(`http://localhost:8000/api/exp/${pk}/`, data)
        navigate('/show')
    }

  return (
    <>
    <div className='container'>
            <h1><b>User Registration Form</b></h1>
            <form onSubmit={handleSubmit(saveData)} className='mt-5'>
            <label htmlFor='r'>ExpenseID : </label>
                <input type='text' id='r' className='form-control' 
                {...register('expenseID')}/>
                <br />
                <br />
                <label htmlFor='n'>Amount : </label>
                <input type='text' id='n' className='form-control' 
                {...register('amount')} />
                <br />
                <br />
                <label htmlFor='m'>Created At : </label>
                <input type='text' id='m' className='form-control' 
                {...register('created_at')}/>
                <br />
                <br />
                <button type='submit' className='btn btn-success btn-lg col-6'>Update Expense</button>
                <button type='reset' className='btn btn-warning btn-lg col-6'>Reset</button>
            </form>
        </div>
    </>
  )
}
export default Update