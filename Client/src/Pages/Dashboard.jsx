import React from 'react'
import { useLocation,} from 'react-router-dom'
import { useState, useEffect } from 'react';
import DashSidebar from '../Components/DashSidebar';
import DashProfile from '../Components/DashProfile';

const Dashboard = () => {
  const location= useLocation();
  const [tab, setTab] = useState('');
  useEffect(()=>{
    const urlParams= new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get('tab');
    console.log(tabFormUrl);
    if(tabFormUrl){
      setTab(tabFormUrl);
    }

  },[location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Side Bar */}
      <div className='md:w-56'>
        <DashSidebar/>

      </div>

      {/* Dash profile */}
      {tab ==='profile'&&<DashProfile/>}
      
    </div>
  )
}


export default Dashboard
