import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Daily_sales from './Components/Sales_components/Daily_sales';
import Monthly_sales from './Components/Sales_components/Monthly_sales';
import Quaterly_sales from './Components/Sales_components/Quaterly_sales';
import Weeklysales from './Components/Sales_components/Weeklysales';

import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Invoice from './Components/Sales_components/Invoice';


import BillingComponent from './Components/Sales_components/BillingComponent/BillingComponent';
import SalesAsPerProduct from './Components/Sales_components/SalesAsPerProduct';
import Saleslist from './Components/Sales_components/SalesReport';


function App() {
  return (
    
    <>
    <BrowserRouter>

    
    <Routes>
      <Route path='/Daily_Sales' element={<Daily_sales/>}/>
      <Route path='/Monthly_Sales' element={<Monthly_sales/>}/>
      <Route path='/Quaterly_Sales' element={<Quaterly_sales/>}/>
      <Route path='/Weekly_Sales' element={<Weeklysales/>}/>
      <Route path='/SalesAsPerProduct/:product_id' element={<SalesAsPerProduct/>}/>

      <Route path='/Invoice' element={<Invoice/>}/>

      <Route path='/Sales_list' element={<Saleslist/>}/>

      <Route path='/billing' element={<BillingComponent/>}/>
    </Routes>
   
      </BrowserRouter>
  
    </>
  );
}

export default App;
