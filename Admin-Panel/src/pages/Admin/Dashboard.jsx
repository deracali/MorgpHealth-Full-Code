import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';
import TotalSalesChart from '../../component/TotalSalesChart';
import UsersDoctorsPieChart from '../../component/UsersDoctorsPie';
import TotalEarningsChart from '../../component/TotalEarningsCharts';
import { useNavigate } from 'react-router-dom';
import GenderRegionPieChart from '../../component/GenderRegionPie';
import { FaUserMd, FaCalendarAlt, FaUsers, FaDollarSign, FaShoppingCart } from 'react-icons/fa';


export default function Dashboard() {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
const navigate = useNavigate()
  useEffect(() => {
    getDashData();
  
  }, []);
  console.log(dashData.latestAppointments)

  return (
    <div className='m-5'>
    <div className='flex flex-wrap gap-3'>
  
  {/* Doctors */}
  <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
    <FaUserMd className='w-14 text-gray-600' />
    <div>
      <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
      <p className='text-gray-400'>Doctors</p>
    </div>
  </div>

  {/* Appointments */}
  <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
    <FaCalendarAlt className='w-14 text-gray-600' />
    <div>
      <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
      <p className='text-gray-400'>Appointments</p>
    </div>
  </div>

  {/* Users */}
  <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
    <FaUsers className='w-14 text-gray-600' />
    <div>
      <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
      <p className='text-gray-400'>Users</p>
    </div>
  </div>

  {/* Total Earnings */}
  <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
    <FaDollarSign className='w-14 text-gray-600' />
    <div>
      <p className='text-xl font-semibold text-gray-600'>${dashData.totalEarnings}</p>
      <p className='text-gray-400'>Net Profit</p>
    </div>
  </div>

  {/* Total Sales */}
  <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
    <FaShoppingCart className='w-14 text-gray-600' />
    <div>
      <p className='text-xl font-semibold text-gray-600'>${dashData.totalSales}</p>
      <p className='text-gray-400'>Total Sales</p>
    </div>
  </div>

</div>

  <div className="chart grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {/* Total Sales Chart */}
    <div className="w-full bg-white shadow-md rounded-lg p-4">
        <TotalSalesChart totalSales={dashData.totalSales} />
    </div>
    <div className="w-full bg-white shadow-md rounded-lg p-4">
        <TotalEarningsChart />
    </div>
    <div className="w-full bg-white shadow-md rounded-lg p-4">
        <UsersDoctorsPieChart />
    </div>
    <div className="w-full bg-white shadow-md rounded-lg p-4">
        <GenderRegionPieChart
            title="Users Gender and Region Distribution"
            genderRegionData={dashData.usersGenderRegion}
        />
    </div>
    <div className="w-full bg-white shadow-md rounded-lg p-4">
        <GenderRegionPieChart
            title="Doctors Gender and Region Distribution"
            genderRegionData={dashData.doctorsGenderRegion}
        />
    </div>
</div>


      {/* Latest Bookings Section */}
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt='' />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
  {
    dashData.latestAppointments?.map((item, index) => (
      <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
        <img className='rounded-full w-10' src={item.docData.image} alt='' />
        <div className='flex-1 text-sm'>
          <p className='text-gray-800 font-medium'>{item.docData.name}</p>
          <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
        </div>
        {
          item.cancelled 
            ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> 
            : item.isCompleted
              ? <p className='text-green-400 text-xs font-medium'>Completed</p>
              : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt='' />
        }
        {/* Button to view doctor's profile */}
        <button 
          onClick={() => navigate(`/doctor-profile/${item.docData._id}`)} 
          className='ml-4 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition-all'
        >
          View Doc
        </button>
      </div>
    ))
  }
</div>

      </div>
    </div>
  );
}
