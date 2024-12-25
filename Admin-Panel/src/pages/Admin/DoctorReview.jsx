import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorReview() {
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Make sure to set this in your environment variables
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/addDoc/review-docs`);
        const data = await response.json();
        if (data.success) {
          setDoctors(data.reviewDocs);
        } else {
          console.error('Failed to fetch doctors');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, [backendUrl]);
  console.log(doctors)

  const changeAvailability = (doctorId) => {
    setDoctors((prevDoctors) =>
      prevDoctors.map((doc) =>
        doc._id === doctorId ? { ...doc, available: !doc.available } : doc
      )
    );
  };

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div
            onClick={() => navigate(`/doctor-details/${item?._id}`)}
            className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'
            key={index}
          >
            <img
              className='bg-indigo-50 group-hover:bg-primary transition-all duration-500'
              src={item?.image}
              alt=''
            />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item?.name}</p>
              <p className='text-zinc-600 text-sm'>{item?.speciality.join(', ')}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input
                  onChange={() => changeAvailability(item._id)}
                  type='checkbox'
                  checked={item.available || false}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
