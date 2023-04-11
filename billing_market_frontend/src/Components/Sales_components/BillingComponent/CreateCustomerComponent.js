import React, { useState } from 'react';
import axios from 'axios';
import InvoiceComponent from './InvoiceComponent';

export default function CreateCustomerComponent() {
  const [customer, setCustomer] = useState({
    customer_name: '',
    customer_contact: '',
    customer_address: '',
  });

  const [customerId, setCustomerId] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/customer/', customer)
      .then((response) => {
        console.log(response.data);
        alert('Customer added successfully!');
        setCustomerId(response.data.customer_id)
        setCustomer({
          customer_name: '',
          customer_contact: '',
          customer_address: '',
        });
      })
      .catch((error) => {
        console.error(error);
        alert('Error adding customer. Please try again later.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customer_name">Name:</label>
          <input type="text" id="customer_name" name="customer_name" value={customer.customer_name} onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor="customer_contact">Contact:</label>
          <input type="tel" id="customer_contact" name="customer_contact" value={customer.customer_contact} onChange={handleInputChange} required/>
        </div>
        <div>
          <label htmlFor="customer_address">Address:</label>
          <textarea id="customer_address" name="customer_address" value={customer.customer_address} onChange={handleInputChange} />
        </div>
        <button type="submit">Add Customer</button>
      </form>
      <div>
        {/* passing data using props */}
        <InvoiceComponent customerId={customerId}/> 
      </div>
    </div>
  );
}
