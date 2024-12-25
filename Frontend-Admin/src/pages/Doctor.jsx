import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

// Debounce utility to optimize scroll event handling
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export default function Doctor() {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state to show the loader
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [error, setError] = useState(null); // Error state

  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // console.log("Speciality from URL:", speciality); // Log speciality to check if it's correct
  // console.log("Doctors from context:", doctors); // Log doctors to ensure it's populated

  const applyFilter = useCallback(() => {
    // console.log("Applying filter with speciality:", speciality);
    if (speciality) {
      const trimmedSpeciality = speciality.trim().toLowerCase();
      setFilterDoc(doctors.filter(doc => {
        // console.log("Comparing:", doc.speciality, "with", trimmedSpeciality); // Log each comparison
        return doc.speciality.trim().toLowerCase() === trimmedSpeciality;
      }));
    } else {
      setFilterDoc(doctors);
    }
  }, [speciality, doctors]);

  useEffect(() => {
    // console.log("useEffect triggered with speciality:", speciality, "and doctors:", doctors);
    applyFilter();
  }, [speciality, doctors, applyFilter]);

  const handleNavigate = (specialityName) => {
    // console.log("Navigating to speciality:", specialityName);
    if (speciality !== specialityName) {
      navigate(`/doctors/${specialityName}`);
    } else {
      navigate('/doctors');
    }
  };

  // Function to load more doctors when reaching the bottom
  const loadMoreDoctors = () => {
    if (loading || filterDoc.length === doctors.length) return; // Prevent loading if already loading or no more data
    setLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  // Simulate loading more data on scroll (in a real scenario, you would fetch more doctors from an API)
  useEffect(() => {
    if (!loading) return;

    // Simulate a delay for loading more doctors (replace with real API call)
    setTimeout(() => {
      try {
        const additionalDoctors = doctors.slice(page * 10, (page + 1) * 10); // Assuming 10 doctors per page
        if (additionalDoctors.length) {
          setFilterDoc(prevDocs => [...prevDocs, ...additionalDoctors]);
        } else {
          // No more data, handle gracefully
          console.log("No more doctors available.");
        }
      } catch (error) {
        setError("Failed to load more doctors");
        // console.error(error);
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulated delay
  }, [loading, page, doctors]);

  const handleScroll = debounce((e) => {
    const threshold = 100; // Load more when user is within 100px of bottom
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + threshold;
    if (bottom) loadMoreDoctors();
  }, 200); // Debounced scroll event

  // Display error message if any
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  console.log("Filtered Doctors:", filterDoc);

  return (
    <div onScroll={handleScroll} className="overflow-auto" aria-live="polite">
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
          onClick={() => setShowFilter(prev => !prev)}>
          Filters
        </button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((specialityName) => (
            <p
              key={specialityName}
              onClick={() => handleNavigate(specialityName)}
              className={`w-[94vw sm:w-auto pl-3 py-1.5 pr-72 border border-gray rounded transition-all cursor-pointer ${speciality === specialityName ? "bg-indigo-100 text-black" : ""}`}
            >
              {specialityName}
            </p>
          ))}
        </div>
        <div className='w-full mb-[100px] grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc?.length ? filterDoc.map((item, index) => (
            <div key={index} onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img className='bg-blue-50' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center text-green-500`}>
                  <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          )) : <p>No doctors found for this speciality.</p>}
        </div>
        {loading && <div className="spinner">Loading...</div>} {/* Example spinner */}
        {!loading && filterDoc.length === 0 && <p>No more doctors to show.</p>} {/* When no more doctors available */}
      </div>
    </div>
  );
}
