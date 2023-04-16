import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Daily_sales from './Components/Sales_components/Daily_sales';
import Monthly_sales from './Components/Sales_components/Monthly_sales';
import Quaterly_sales from './Components/Sales_components/Quaterly_sales';
import Weeklysales from './Components/Sales_components/Weeklysales';
// import Sidebar from "./Components/Sidebar";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Add from './Components/Expenses_components/Add';
import Show from './Components/Expenses_components/Show';
import Update from './Components/Expenses_components/Update';
import Delete from './Components/Expenses_components/Delete';
import AddUser from './Components/Auth_components/Employee_Componenets/AddUser';
import ShowUser from './Components/Auth_components/Employee_Componenets/ShowUser';
import Edit from './Components/Auth_components/Employee_Componenets/Edit';
import DeleteUser from './Components/Auth_components/Employee_Componenets/DeleteUser';
import NavBar from './Components/Auth_components/Layout/NavBar';
import LogIn from './Components/LogIn';
import axios from './Components/Auth_components/interceptor/axios';
import UpdatePassword from './Components/UpdatePassword';
import Email from './Components/Email';

function App() {
  return (
    <>
    < BrowserRouter>
    <NavBar/>
      <Routes>
      <Route path='/add' element={<Add/>}/>
      <Route path='/show' element={<Show/>}/>
      <Route path='/update/:pk/' element={<Update/>}/>
      <Route path='/delete/:pk/' element={<Delete/>}/>
      <Route path='/auth_component/add' element={<AddUser/>}/>
      <Route path='/auth_component/show' element={<ShowUser/>}/>
      <Route path='/auth_component/edit/:userId/' element={<Edit/>}/>
      <Route path='/auth_component/delete/:userId/' element={<DeleteUser/>}/>
      <Route path='/login' element={<LogIn/>} />
      <Route path='/updatepassword/:UserId' element={<UpdatePassword/>} />
      <Route path='/email' element={<Email/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
