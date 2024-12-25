import React from 'react'
import SideBar from '../../components/SideBar'
import Dashboard from './UserPanel'


export default function User() {
  return (

       <div className="flex items-start">
        <SideBar/>
        <Dashboard/>
       </div>
  
  )
}
