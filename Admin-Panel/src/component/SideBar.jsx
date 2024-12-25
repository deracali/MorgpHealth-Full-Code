import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets_admin/assets';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

export default function SideBar() {
  const { aToken } = useContext(AdminContext);
  const { dToken, doctorId } = useContext(DoctorContext);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <div
      className={`min-h-screen bg-[#FCFCFC] border-r ${
        isMenuCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300`}
    >
      {/* Logo and Menu Toggle Button */}
      <div className="flex items-center justify-between px-3 py-4">
        {!isMenuCollapsed && (
         <div></div>
        )}
        <button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          {isMenuCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Sidebar Links */}
      <ul>
        {aToken && (
          <>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                    : 'hover:bg-gray-100'
                }`
              }
              to={'/'}
            >
              <img src={assets.home_icon} alt="" />
              {!isMenuCollapsed && <p>Dashboard</p>}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                    : 'hover:bg-gray-100'
                }`
              }
              to={'/all-appointment'}
            >
              <img src={assets.appointment_icon} alt="" />
              {!isMenuCollapsed && <p>Appointment</p>}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                    : 'hover:bg-gray-100'
                }`
              }
              to={'/add-doctor'}
            >
              <img src={assets.add_icon} alt="" />
              {!isMenuCollapsed && <p>Add Doctor</p>}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                    : 'hover:bg-gray-100'
                }`
              }
              to={'/doctor-review'}
            >
              <img src={assets.people_icon} alt="" />
              {!isMenuCollapsed && <p>Doctor Review</p>}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                    : 'hover:bg-gray-100'
                }`
              }
              to={'/doctor-list'}
            >
              <img src={assets.people_icon} alt="" />
              {!isMenuCollapsed && <p>Doctor List</p>}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                    : 'hover:bg-gray-100'
                }`
              }
              to={'/insurance'}
            >
              <img src={assets.people_icon} alt="" />
              {!isMenuCollapsed && <p>Insurance</p>}
            </NavLink>
          </>
        )}

        {dToken && (
          <>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                    : 'hover:bg-gray-100'
                }`
              }
              to={`/doctor-dashboard/${doctorId}`}
            >
              <img src={assets.home_icon} alt="" />
              {!isMenuCollapsed && <p>Dashboard</p>}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                    : 'hover:bg-gray-100'
                }`
              }
              to={`/doctor-appointment/${doctorId}`}
            >
              <img src={assets.appointment_icon} alt="" />
              {!isMenuCollapsed && <p>Appointment</p>}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                    : 'hover:bg-gray-100'
                }`
              }
              to={`/doctors-profile/${doctorId}`}
            >
              <img src={assets.add_icon} alt="" />
              {!isMenuCollapsed && <p>Profile</p>}
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary'
                    : 'hover:bg-gray-100'
                }`
              }
              to={`/doctor-wallet/${doctorId}`}
            >
              <img src={assets.add_icon} alt="" />
              {!isMenuCollapsed && <p>Wallet</p>}
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
}
