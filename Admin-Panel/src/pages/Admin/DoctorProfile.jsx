import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

export default function DoctorProf() {
  const { currency } = useContext(AppContext);
  const [profileData, setProfileData] = useState({
      address: { line1: '', line2: '' },
      fees: 0,
      balance: 0,
      available: false,
      gender: '',
      region: '', // Add region to profile data
  });
  
  const [balanceIncrement, setBalanceIncrement] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getProfileData = async () => {
      try {
          const { data } = await axios.get(`${backendUrl}/api/doctor/profile/${id}`);
          if (data.success) {
              setProfileData(data.profileData);
          } else {
              toast.error(data.message);
          }
      } catch (error) {
          console.error('Error fetching profile:', error);
          toast.error(error.response?.data?.message || 'An error occurred while fetching profile.');
      }
  };

  const updateProfile = async () => {
    try {
        const updatedBalance = balanceIncrement; // This is the value from the input

        const updateData = {
            address: profileData.address,
            fees: profileData.fees,
            balance: updatedBalance, // Set the new balance directly from the input
            available: profileData.available,
            gender: profileData.gender,
            region: profileData.region, // Include region in the update data
        };
      
        const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile/${id}`, updateData);
        if (data.success) {
            toast.success(data.message);
            setIsEdit(false);
            setBalanceIncrement(0);
            getProfileData(); // Fetch the updated profile data
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error('An error occurred while updating the profile.');
    }
  };

  useEffect(() => {
      getProfileData();
  }, []);
  
  const handleBalanceChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
        setBalanceIncrement(value);
    } else {
        toast.error('Please enter a valid non-negative number for the balance.');
    }
  };

  return (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt='' />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
          </div>

          {/* Display gender */}
          <p className='flex gap-2 py-2'>
            Gender: 
            <span>
              {isEdit ? (
                <input 
                  type='text' 
                  onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))} 
                  value={profileData.gender || ''}
                />
              ) : (
                profileData.gender || 'N/A'
              )}
            </span>
          </p>

          {/* Display region */}
          <p className='flex gap-2 py-2'>
            Region: 
            <span>
              {isEdit ? (
                <input 
                  type='text' 
                  onChange={(e) => setProfileData(prev => ({ ...prev, region: e.target.value }))} 
                  value={profileData.region || ''}
                />
              ) : (
                profileData.region || 'N/A'
              )}
            </span>
          </p>

          <p className='flex gap-2 py-2'>
            Appointment fee: 
            <span>
              {currency} 
              {isEdit ? (
                <input 
                  type='number' 
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                  value={profileData.fees !== undefined ? profileData.fees : ''}
                />
              ) : (
                profileData.fees || 'N/A'
              )}
            </span>
          </p>

          <p className='flex gap-2 py-2'>
            Appointment balance: 
            <span>
                {currency} 
                {isEdit ? (
                    <>
                        <input 
                            type='number' 
                            onChange={handleBalanceChange} // Update balance using the handler
                            value={balanceIncrement} // Control the input with balanceIncrement
                        />
                        <span className="text-xs text-gray-600 ml-2">(Enter the new balance)</span>
                    </>
                ) : (
                    profileData.balance || 0
                )}
            </span>
          </p>

          <div>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? (
                <>
                  <input 
                    type='text' 
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                    value={profileData.address?.line1 || ''}
                  />
                  <br />
                  <input 
                    type='text' 
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                    value={profileData.address?.line2 || ''}
                  />
                </>
              ) : (
                <>
                  {profileData.address?.line1 || "Address line 1 not available"}
                  <br />
                  {profileData.address?.line2 || "Address line 2 not available"}
                </>
              )}
            </p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input 
              onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
              checked={profileData.available || false} 
              type="checkbox" 
              name='' 
              id='' 
            />
            <label htmlFor=''>Available</label>
          </div>
          {isEdit ? (
            <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
          ) : (
            <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}
