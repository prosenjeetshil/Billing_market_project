import axios from 'axios';
import React, { useEffect, useState } from 'react'


function Productlist() {
    const [products,setproducts] = useState([]);
    async function Fetchallproduct(){
        const result = await axios.get('http://127.0.0.1:8000/api/product/')
        setproducts(result.data)
    }
    useEffect(()=>{
        Fetchallproduct();
    },[]);
    const getcategeoryid = (data,property) =>{
        let newval = data.map((curElem) => {
            return curElem[property];
        });
        newval = ["All",...new Set(newval)];
        console.log(newval)
    };
    const categeoryonlyid = getcategeoryid(products,"product_category");
  return (
   <>
   
   <center><h1><i>Product List</i></h1></center>
   
    <input type='search' name='search' placeholder='SEARCH' className='btn btn-primary mt-5' />

   <table className='table table-dark mt-5' style={{border:'2px'}}>
        <thead>
           <tr>
                <th>PRODUCT_ID</th>
                <th>PRODUCT_NAME</th>
                <th>PRODUCT_COST_PER_QUANTITY</th>
                <th>PRODUCT_COST_WITH_GST</th>
                <th>PRODUCT_CATEGEORY</th>
                <th>PRODUCT_OFFERS</th>
                <th>PRODUCT_QUANTITY</th>
                <th>PRODUCT_TOTAL_COST</th>
                <th>PRODUCT_GST</th>
                
            </tr>
        </thead>
        <tbody>
            {
                products.map(obj=>{
                    return(
                        <tr>
                            <td>{obj.product_id}</td>
                            <td>{obj.product_name}</td>
                            <td>{obj.product_cost_per_quantity}</td>
                            <td>{obj.product_cost_with_gst}</td>
                            <td>{obj.product_category}</td>
                            <td>{obj.product_offers}</td>
                            <td>{obj.product_quantity}</td>
                            <td>{obj.product_total_cost}</td>
                            <td>{obj.product_gst}</td>
                            
                        </tr>
                    )
                })

            }
        </tbody>
    </table>
   
   </>
  )
}
export default Productlist;
