import axios from 'axios';
import React, { useState } from 'react';

function SalesReport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState();

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFetchSalesData = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/sales/invoice-products/${startDate}/${endDate}/`);
    console.log(response.data)
    setSalesData(response.data);
    console.log(salesData)
  };

  return (
    <div>
      <label htmlFor="start-date">Start Date:</label>
      <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />

      <label htmlFor="end-date">End Date:</label>
      <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />

      <button onClick={handleFetchSalesData}>Fetch Sales Data</button>

      {/* {salesData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity Sold</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((InvoiceProduct) => (
              <tr key={InvoiceProduct.product_invoice.id}>
                <td>{InvoiceProduct.product_invoice.name}</td>
                <td>{InvoiceProduct.total_quantity_sold}</td>
                <td>{InvoiceProduct.total_sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
}

export default SalesReport;
