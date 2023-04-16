import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Add() {
    const {register, handleSubmit,formState:{errors}} = useForm();
    const navigate = useNavigate();

    const saveData = data =>{
        console.log(data)
        axios.post('http://localhost:8000/apii/exp/',data,{headers: 
        {'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`}},
         {withCredentials:true});
        navigate('/show')
    }
  return (
    <>
        <div className='container'>
            <h1><b>Add Expenses Form</b></h1>
            <form onSubmit={handleSubmit(saveData)} className='mt-5'>
                <label htmlFor='id'>ExpenseID : </label>
                <input type='number' id='id' className='form-control' 
                {...register('expenseID',{required:"expenseID is required",
                min:{
                    value:1,
                    message:"expenseID should be positive",
                },})}/>
                { errors.expenseID && (<small className='text-danger'>expenseID should be positive</small>)}
                <br />
                <br />
                <label htmlFor='a'>Amount : </label>
                <input type='number' id='a' className='form-control' 
                {...register('amount',{

                    required:"amount is required",
                    min:{
                        value:1,
                        message:"minimun required amount is 1",
                    },
                })} />
                { errors.amount && (<small className='text-danger'>minimun required amount is 1</small>)}
                <br />
                <br />
        
                <label htmlFor='ca'>Created At : </label>
                <input type='datetime-local' id='ca' className='form-control' 
                {...register('created_at')}/>
                <br />
                <br />
                
                <button type='submit' className='btn btn-success btn-lg col-6'>Add</button>
                <button type='reset' className='btn btn-warning btn-lg col-6'>Reset</button>
            </form>
        </div>
    </>
  );
}

export default Add;