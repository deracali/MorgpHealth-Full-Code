import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export default function SideBar() {

    const {userData} = useContext(AppContext)

  return (
    <div className='min-h-screen bg-white border-r'>
          <ul>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `} to={`/doctor-dashboard/`}>
                    <img className="w-[23px]" src={assets.home_icon} alt=''/>
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `}  to={userData?._id ? `/my-appointments/${userData._id}` : '#'}>
                    <img className="w-[23px]" src={assets.appointment_icon} alt=''/>
                    <p className='hidden md:block'>Appointment</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `}  to={'/my-profile'}>
                    <img className="w-[23px]" src={assets.add_icon} alt=''/>
                    <p className='hidden md:block'>Profile</p>
                </NavLink>

               </ul>
    
    </div>
  )
}
