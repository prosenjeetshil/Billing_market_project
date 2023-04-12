import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Daily_sales from './Components/Sales_components/Daily_sales';
import Monthly_sales from './Components/Sales_components/Monthly_sales';
import Quaterly_sales from './Components/Sales_components/Quaterly_sales';
import Weeklysales from './Components/Sales_components/Weeklysales';
import Sidebar from "./Components/Sidebar";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Invoice from './Components/Sales_components/Invoice';
import Sales_by_category from './Components/Sales_components/Sales_by_categeory';
import Productlist from './Components/Sales_components/Productlist';
import BillingComponent from './Components/Sales_components/BillingComponent/BillingComponent';
import ShowInvoice from './Components/Sales_components/BillingComponent/ShowInvoice';

function App() {
  return (
    <>
    <BrowserRouter>
    {/* sidebar commented because of some issue with rendering */}
    {/* <Sidebar> */}
    <Routes>
      <Route path='/Daily_Sales' element={<Daily_sales/>}/>
      <Route path='/Monthly_Sales' element={<Monthly_sales/>}/>
      <Route path='/Quaterly_Sales' element={<Quaterly_sales/>}/>
      <Route path='/Weekly_Sales' element={<Weeklysales/>}/>
      <Route path='/Invoice' element={<Invoice/>}/>
      <Route path='/Product_list' element={<Productlist/>}/>
      <Route path='/billing' element={<BillingComponent/>}/>
      <Route path='/invoice/:id' element={<ShowInvoice/>}/>
    </Routes>
    {/* </Sidebar> */}
    </BrowserRouter>
    </>
  );
}

export default App;
