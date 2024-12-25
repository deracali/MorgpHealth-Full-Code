import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export default function DoctorList() {
  const { doctors = [], getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [loading, setLoading] = useState(false); // To track loading state
  const [hasMore, setHasMore] = useState(true); // To track if there are more doctors to load
  const navigate = useNavigate();

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const newDoctors = await getAllDoctors();
      
      // If fewer than 30 doctors are returned, it indicates no more data
      if (newDoctors.length < 30) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false); // Stop loading after the fetch is done
    }
  };

  useEffect(() => {
    fetchDoctors(); // Fetch doctors once when the component mounts
  }, []); // Empty dependency array to run only once on mount

  // Handle availability change
  const handleAvailabilityChange = (doctorId) => {
    changeAvailability(doctorId); // Update doctor availability
  };

  // Load more doctors when the button is clicked
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchDoctors(); // Load more doctors
    }
  };

  return (
    <div className='m-5'>
      <h1 className='text-lg font-medium'>All Doctors</h1>

      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/doctor-profile/${item?._id}`)}
              className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'
            >
              <img
                className='bg-indigo-50 group-hover:bg-primary transition-all duration-500'
                src={item?.image}
                alt=''
              />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item?.name}</p>
                <p className='text-zinc-600 text-sm'>{item?.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input
                    onChange={() => handleAvailabilityChange(item._id)}
                    type='checkbox'
                    checked={item.available}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}

        {/* Loading spinner while fetching data */}
        {loading && (
          <div className="loading-spinner">
            <p>Loading...</p>
          </div>
        )}

        {/* Display this message when no more data is available */}
        {!loading && !hasMore && (
          <div className="no-more-doctors">
            <p>No more doctors to show.</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <button
          onClick={handleLoadMore}
          className="mt-4 p-2 bg-indigo-500 text-white rounded-md"
        >
          Load More
        </button>
      )}
    </div>
  );
}
