import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import InvoiceProductComponent from './InvoiceProductComponent';

export default function InvoiceComponent(props) {
  const { register, handleSubmit } = useForm();
  const [invoiceId, setInvoiceId] = useState();

  const onSubmit = (data) => {
    const invoiceData = {
      invoice_number: data.invoice_number,
      customer: props.customerId,
    };
    axios.post('http://127.0.0.1:8000/api/invoice/', invoiceData)
      .then((response) => {
        console.log(response.data);
        alert('invoice added successfully!');
        setInvoiceId(response.data.invoice_id)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>this is customer_id : {props.customerId}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="number" placeholder="Invoice Number" {...register('invoice_number')} /> &nbsp;
      <input type="submit" value="Add" />
      </form>
      <div>
         {/* passing data using props */}
        <InvoiceProductComponent invoiceId={invoiceId} />
      </div>
    </div>
  )
}
