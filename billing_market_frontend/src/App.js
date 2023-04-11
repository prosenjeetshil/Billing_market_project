import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Daily_sales from './Components/Sales_components/Daily_sales';
import Monthly_sales from './Components/Sales_components/Monthly_sales';
import Quaterly_sales from './Components/Sales_components/Quaterly_sales';
import Weeklysales from './Components/Sales_components/Weeklysales';
import Sidebar from "./Components/Sidebar";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
<<<<<<< HEAD
import Invoice from './Components/Sales_components/Invoice';
import Sales_by_category from './Components/Sales_components/Sales_by_categeory';
import Productlist from './Components/Sales_components/Productlist';
=======
import BillingComponent from './Components/Sales_components/BillingComponent/BillingComponent';
>>>>>>> 3c636532e766dc3e6f9722f563c7ed4c262129f6

function App() {
  return (
    
    <>
    <BrowserRouter>
<<<<<<< HEAD

=======
    {/* sidebar commented because of some issue with rendering */}
    {/* <Sidebar> */}
>>>>>>> 3c636532e766dc3e6f9722f563c7ed4c262129f6
    <Routes>
      <Route path='/Daily_Sales' element={<Daily_sales/>}/>
      <Route path='/Monthly_Sales' element={<Monthly_sales/>}/>
      <Route path='/Quaterly_Sales' element={<Quaterly_sales/>}/>
      <Route path='/Weekly_Sales' element={<Weeklysales/>}/>
<<<<<<< HEAD
      <Route path='/Invoice' element={<Invoice/>}/>

      <Route path='/Product_list' element={<Productlist/>}/>
    </Routes>
  
=======
      <Route path='/billing' element={<BillingComponent/>}/>
    </Routes>
    {/* </Sidebar> */}
>>>>>>> 3c636532e766dc3e6f9722f563c7ed4c262129f6
    </BrowserRouter>
  
    </>
  );
}

export default App;
