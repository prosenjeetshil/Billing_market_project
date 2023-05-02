import React from 'react';

import {
    FaBars,
    FaRegChartBar,
   
    FaTh,
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

function Sidebar({children}) {
    const menuItem = [
        {
            path:"/Daily_Sales",
            name:"Daily sales",
            icon:<FaRegChartBar/>
        },
        {
            path:"/Weekly_Sales",
            name:"Weekly sales",
            icon:<FaTh/>
        },
        {
            path:"/Quaterly_Sales",
            name:"Quaterly sales",
            icon:<FaRegChartBar/>
         },
         {
            path:"/Monthly_Sales",
            name:"Monthly sales",
            icon:<FaTh/>
         },
]
  return (
    <>
    <div className='container mr-50'>
        <div className='sidebar'>
        <div className='top_section'>
            <h1 className='logo'>Logo</h1>
            <div className='bars'>
                <FaBars/>
            </div>
            </div> 
            {
                menuItem.map((item,index)=>(
                    <NavLink to={item.path} key={index} className="link" activeclassName="active">
                        <div className='icon'>{item.icon}</div>
                        <div className='link_text'>{item.name}</div>
                    </NavLink>
                ))
            } 
           
        </div>
       
        <main>{children}</main>
   
        </div>
    </>
  )
}

export default Sidebar;