import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';
import { useNavigate } from 'react-router-dom';

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export default function AllAppointment() {
  const { appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // To track if data is loading
  const [page, setPage] = useState(1); // Track current page for pagination
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    getAllAppointments(page);
  }, [page]);

  // Function to load more appointments
  const loadMoreAppointments = () => {
    if (loading) return; // Prevent loading if already fetching
    setLoading(true);
    setPage(prevPage => prevPage + 1); // Load next page
  };

  // Simulate loading more data on scroll (in a real scenario, replace this with an API call)
  useEffect(() => {
    if (!loading) return;

    // Simulate loading with a delay
    setTimeout(() => {
      try {
        const moreAppointments = appointments.slice(page * 10, (page + 1) * 10); // Load 10 more appointments per page
        if (moreAppointments.length) {
          // Do something with the new appointments (like appending to the existing list)
        } else {
          console.log("No more appointments available.");
        }
      } catch (error) {
        setError("Failed to load more appointments");
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulated delay
  }, [loading, page, appointments]);

  const handleScroll = debounce((e) => {
    const threshold = 100; // Trigger load more when near bottom
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + threshold;
    if (bottom) loadMoreAppointments();
  }, 200); // Debounced scroll event

  // Display error message if any
  if (error) {
    return (
      <div className="w-full max-w-6xl m-5">
        <p className="text-red-600">{error}</p>
        <button onClick={() => { setError(null); loadMoreAppointments(); }} className="text-blue-500">Retry</button>
      </div>
    );
  }

  return (
    <div onScroll={handleScroll} className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div onClick={() => navigate(`/doctor-profile/${item.docData._id}`)} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-500' key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt='' />
                <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt='' />
                <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled 
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> 
                  : item.isCompleted
                    ? <p className='text-green-400 text-xs font-medium'>Completed</p>
                    : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt='' />
              }
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}

        {loading && <div className="spinner">Loading...</div>}
        {!loading && appointments.length === 0 && <p>No more appointments to show.</p>}
      </div>
    </div>
  );
}
