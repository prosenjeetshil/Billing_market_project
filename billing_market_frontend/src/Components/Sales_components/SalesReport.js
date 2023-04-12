import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Saleslist() {
    const [startDate,setStartDate] = useState('');
    const [endDate,setEndDate] = useState('');
    const [salesData,setsalesData] = useState();

    const handleStartDateChange = (e) =>{
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) =>{
        setEndDate(e.target.value);
    };

    const FetchallSalesData = async ()=>{
        const result = await axios.get(`http://127.0.0.1:8000/sales/invoice_products/${startDate}/${endDate}/`);
        console.log(result.data)
        setsalesData([result.data]);
        console.log(salesData)
    };


    const exportTable = () => {
        // Create a new Blob object with the table data
        const blob = new Blob(
          [document.getElementById("table-to-export").outerHTML],
          {
            type: "application/vnd.ms-excel",
          }
        );
    
        // Use the URL.createObjectURL() method to generate a URL for the Blob object
        const url = URL.createObjectURL(blob);
    
        // Create a new anchor element to use as the download link
        const link = document.createElement("a");
        link.href = url;
        link.download = "table.xls";
        link.click();
      };
    
      const exportToPdf = () => {
        // Use html2canvas to capture the HTML element and convert it to a canvas
        html2canvas(document.querySelector("#table-to-export")).then((canvas) => {
          // Use jsPDF to create a new PDF document
          const pdf = new jsPDF("p", "mm", "a4");
          // Use the addImage method to add the canvas as an image in the PDF document
          pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 0);
          // Use the save method to download the PDF document
          pdf.save("table.pdf");
        });
      };
  return (
   <>

   <center><h1><i>Sales Report List</i></h1></center>
   <label htmlFor='stdt'>Satrt Date:</label>
   <input type='date' id="stdt" value={startDate} onChange={handleStartDateChange}/>&nbsp;&nbsp;
   <label htmlFor='enddt'>End Date:</label>
   <input type='date' id='enddt' value={endDate} onChange={handleEndDateChange} className='me-3'/>
   
    <button type='submit' name='search' className='btn btn-primary' onClick={FetchallSalesData} >Fetch Sales Data</button>

   {/* <table className='table table-dark mt-5' style={{border:'2px'}}>
        <tbody>
            <tr>
       <th>PRODUCT_ID</th>
       <th>PRODUCT_NAME</th>
       <th>PRODUCT_QUANTITY</th>
       <th>DATE</th>
   </tr>
            {products.product_name.map((product) =>(
                <>
                <tr key={product.product_id}>
                      <td>{product.product_name}</td>
                      <td>{product.product_quantity}</td>
                      <td>{product.invoice_product_cost_per_quantity}</td>
                     </tr> 
                     </>
                ))}
        </tbody>
        </table>
        </>
        );
        } */}

        </>
  );
}
        
            
export default Saleslist;
