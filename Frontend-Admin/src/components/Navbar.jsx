import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('utoken');
    localStorage.removeItem('insured');
    localStorage.removeItem('userId');
  };

  return (
    <div className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-gray-200">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-36 cursor-pointer"
        src={assets.MorgpLogo}
        alt="Logo"
      />

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
        <NavLink to="/" className="hover:text-blue-600 transition">
          HOME
        </NavLink>
        {userData? 
            <NavLink to="/doctors" className="hover:text-blue-600 transition">
            FIND A DOCTOR
          </NavLink> : ""}
    
        <NavLink to="/insurance" className="hover:text-blue-600 transition">
          INSURANCE
        </NavLink>
        <NavLink to="/add-doc">
          Register As A Doctor
        </NavLink>
        <NavLink to="/about" className="hover:text-blue-600 transition">
          ABOUT US
        </NavLink>
        <NavLink to="/contact" className="hover:text-blue-600 transition">
          CONTACT US
        </NavLink>
        <NavLink  onClick={() => window.location.href = "https://updateddoctor-dashboard.netlify.app/index"} className="hover:text-blue-600 transition">
          Doctor Dashboard
        </NavLink>
      </ul>

      {/* Right Side - Buttons and User Menu */}
      <div className="flex items-center gap-4">
      {
                token && userData
                ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={userData?.image} alt=''/>
                    <img className='w-2.5' src={assets.dropdown_icon} alt=''/>
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100  rounded flex flex-col gap-4 p-4'>
                        <p
  onClick={() => window.location.href = 'https://updatedpatient-dashboard.netlify.app/html/dashboard.html'}
  className="hover:text-black cursor-pointer"
>
  Dashboard
</p>

                            <p onClick={()=>navigate(`/my-appointments/${userData._id}`)} className='hover:text-black cursor-pointer'>My Appointment</p>
                            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div> 
                : <button onClick={()=>navigate('/login')} className='bg-primary text-[color:white] px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
            }
          <img onClick={()=> setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt=''/>
            {/* mobile menu */}
            <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0 '} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-6'>
                <img className='w-36' src={assets.MorgpLogo} alt=''/>
                <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt=''/>
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                <NavLink className='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
            </ul>
            </div>
        </div>
    </div>
  );
}
