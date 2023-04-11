import React from 'react';
import {useForm} from 'react-hook-form';

function Invoice() {
    const {register,handleSubmit} = useForm();
  return (
    <>
    <div >
        <center><h1><i>Invoice creation form</i></h1></center>
        <form onSubmit={handleSubmit}> 
    <label htmlFor='invid'>Invoice-ID</label>
    <input type='number' id='invid' className='form-control'
    {...register('invoice_id')}/>
    <br/>
    <br/>
    <label htmlFor='invnum'>Invoice-Number</label>
    <input type='number' id='invnum' className='form-control'
    {...register('invoice_number')}/>
    <br/>
    <br/>
    <label htmlFor='cust'>Customer-Name</label>
    <input type='text' id='cust' className='form-control mb-2'
    {...register('customer')}/>
    <br/>
    <br/>
    <label htmlFor='tcwotg'>Total-Cost-Without_Gst</label>
    <input type='number' id='tcwg' className='form-control'
    {...register('total_cost_without_gst')}/>
    <br/>
    <br/>
    <label htmlFor='tcwg'>Total-Cost-With-Gst</label>
    <input type='number' id='tcwg' className='form-control'
    {...register('total_cost_with_gst')}/>
    <br/>
    <br/>
    <label htmlFor='invcrt'>Invoice-Created-By</label>
    <input type='number' id='invcrt' className='form-control'
    {...register('invoice_created_by')}/>
    <br/>
    <br/>
    <center><input type='submit' value='GENERATE-INVOICE' className='btn btn-primary me-3'/>
    <input type='reset' value='CLEAR-INVOICE' className='btn btn-warning'/>
    </center>
    </form>
    </div>
    </>
  )
}

export default Invoice;