import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const InvoiceProductComponent = ({ invoiceId }) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/invpro/', {
        invoice: invoiceId,
        product_invoice: productId,
        invoice_product_quantity: quantity,
      });
      alert('Invoice product added successfully!');
      setProductId('');
      setQuantity('');
    } catch (err) {
      console.error(err);
      alert('Error creating invoice product!');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h1>this is invoice_id : {invoiceId}</h1>
      <label htmlFor='product_id'>Product:</label>
      <input id='product_id' type="text" value={productId} onChange={(e) => setProductId(e.target.value)}/>
      <label htmlFor='invoice_product_quantity'>Quantity:</label>
      <input id='invoice_product_quantity'type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
      <br/>
      <button type="submit">Add Invoice Product</button>
    </form>
    <NavLink to={`/invoice/${invoiceId}`}><button className='btn btn-success'>Generate Invoice</button></NavLink>
    </>
  );
};

export default InvoiceProductComponent;
