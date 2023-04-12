import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';

function SalesAsPerProduct() {
  
  const {product_id} = useParams();
  const [products ,setproducts] = useState([]);
  const getSingleproduct = async ()=>{
    const result = await axios.get(`http://127.0.0.1:8000/api/product/${product_id}`)
    console.log(result.data)
    setproducts([result.data])

  }
  useEffect(()=>{
    getSingleproduct();
  },[])


 
    
  return (
    <>
    <div className='container' style={{marginRight:'200px'}}>
    <center><h1>Sales As Per Product</h1>

    <h2 className='mt-5'>Product ID <input type='search'/></h2>
    
    <table className="table table-bordered mt-5">
      <thead>
        <tr >
          <th>Product_Name</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {

          products.map(obj=>{
          return(
        <tr>
        <td>{obj.product_name}</td>
          <td>{obj.product_quantity}</td>
          <td>{obj.product_total_cost}</td>
          <td>{obj.product_gst}</td>
        </tr>
 )
})

}
</tbody>
</table>
    
    </center>
    </div>
    </>
  )
}

export default SalesAsPerProduct;




