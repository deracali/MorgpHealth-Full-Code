import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Insurance() {
  const [insuranceData, setInsuranceData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/insurance/get');
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Log the response to check its structure
          if (data.success) {
            // Ensure that the data is an array
            setInsuranceData(Array.isArray(data.insuranceData) ? data.insuranceData : []);
          } else {
            console.error('Error fetching insurance data:', data.message);
            setInsuranceData([]); // Reset to an empty array if there’s an error
          }
        } else {
          console.error('Error fetching insurance data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching insurance data:', error);
      }
    };

    fetchInsurance();
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Insurance Records</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
      <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b font-semibold text-gray-700'>
  <p>#</p>
  <p>Name</p>
  <p>Spouse</p>
  <p>Mother</p>
  <p>Father</p>
  <p>Child</p>
  <p>Location</p>
  <p>Age</p>
  <p>Plan</p>
  <p>Plan Price</p>
  <p>Total</p>
  <p>Country</p>
  <p>Date</p>
  <p>Actions</p>
</div>


         {insuranceData.map((item, index) => (
            <div 
              onClick={() => navigate(`/insurance-details/${item._id}`)} 
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-200' 
              key={index}
            >
              <p className='max-sm:hidden'>{index + 1}</p>
              <p>{item.name}</p>
              <p>{item.spouseName}</p>
              <p>{item.motherName}</p>
              <p>{item.fatherName}</p>
              <p>{item.childName}</p>
              <p>{item.location}</p>
              <p>{item.age}</p>
              <p>{item.plan}</p>
              <p>{item.planPrice}</p>
              <p>{item.totalPrice}</p>
              <p>{item.country}</p>
              <p>{formatDate(item.createdAt)}</p>
              <p>
                <button onClick={() => console.log('Edit', item._id)} className='text-blue-500'>Edit</button>
                <button onClick={() => console.log('Delete', item._id)} className='text-red-500'>Delete</button>
              </p>
            </div>
          ))}
      
      </div>
    </div>
  );
}
