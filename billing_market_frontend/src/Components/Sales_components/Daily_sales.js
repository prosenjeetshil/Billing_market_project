import React, { useState } from 'react'

function DailysalesReports() {
  const [date,setdate] = useState('');
  const [totalSales,setTotalSales] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the state variables with the data entered by the user
  }
  return (
    <>

    
    <h2>Daily Sales Report</h2>
      <form onSubmit={handleSubmit}>
        <label className='me-3 mt-5'>
          Date: </label>
          <input type="date" value={date} onChange={(e) => setdate(e.target.value)} className='me-3' />
       
        <label className='me-3'>
          Total Sales:</label>
          <input type="number" value={totalSales} onChange={(e) => setTotalSales(e.target.value)} className='me-3' />
        <br/> <br/>
        {"     "}

       <button type="submit" className='btn btn-outline-primary'>Submit</button>
      </form>
      <div>
        <p>Date: {date}</p>
        <p>Total Sales: {totalSales}</p>
        {/* Display other relevant information */}
      </div>
     
    </>
    
  );
};

export default DailysalesReports;