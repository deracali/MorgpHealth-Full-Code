import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';

export default function DoctorsProfile() {
  const { dToken } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [profileData, setProfileData] = useState({
    address: { line1: '', line2: '' },
    fees: 0,
    available: true,
    gender: '',
    region: '',
    name: '',
    email: '',
    phone: '',
    dob: '',
    image: '',
  });

  const [isEdit, setIsEdit] = useState(false);
  const [activeTab, setActiveTab] = useState('personal'); // State to control tabs
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile/${id}`, {
        headers: { dToken },
      });
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
console.log(profileData.available)
const updateProfile = async () => {
  try {
    const updateData = {
      address: profileData.address,
      fees: profileData.fees,
      available: profileData.available, // Include the "available" field
      gender: profileData.gender,
      region: profileData.region,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      dob: profileData.dob,
    };

    const { data } = await axios.post(
      `${backendUrl}/api/doctor/update-profile/${id}`,
      updateData,
      { headers: { dToken } }
    );

    if (data.success) {
      toast.success(data.message);
      setIsEdit(false);
      getProfileData(); // Refresh the data after update
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};


  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    <div className="p-6">
      {/* Breadcrumb and Edit Button */}
      <div className="flex items-center justify-between border-b pb-3 mb-5">
        <div className="text-gray-700 text-sm">
          <span className="text-gray-500">Personal Info </span> /{' '}
          <span className="text-primary">Specialization</span>
        </div>
        {!isEdit ? (
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={updateProfile}
            className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-5">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'personal'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'specialization'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-blue-500'
          }`}
          onClick={() => setActiveTab('specialization')}
        >
          Specialization
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'personal' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Demographics */}
          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Info</h2>
            <p className="mb-2">
              <strong>Name:</strong>{' '}
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              ) : (
                profileData.name || 'N/A'
              )}
            </p>
            <p className="mb-2">
              <strong>Gender:</strong>{' '}
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  value={profileData.gender}
                  onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                />
              ) : (
                profileData.gender || 'N/A'
              )}
            </p>
            <p className="mb-2">
              <strong>Fees:</strong>{' '}
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  value={profileData.fees}
                  onChange={(e) => setProfileData({ ...profileData, fees: e.target.value })}
                />
              ) : (
                profileData.fees || 'N/A'
              )}
            </p>
            <p className="mb-2">
              <strong>Available: {profileData.available? "true" : "false"}</strong>{' '}
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  value={profileData.available}
                  onChange={(e) => setProfileData({ ...profileData, available: e.target.value })}
                />
              ) : (
                profileData.available
              )}
            </p>
            <div className='flex gap-1 pt-2'>
  <input 
    onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
    checked={profileData.available || false} 
    type="checkbox" 
    name='availability' 
    id='availability' 
  />
  <label htmlFor='availability'>Available</label>
</div>

{isEdit ? (
  <button 
    onClick={updateProfile} 
    className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>
    Save
  </button>
) : (
  <button 
    onClick={() => setIsEdit(true)} 
    className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>
    Edit
  </button>
)}

            {/* <p className="mb-2">
              <strong>Date of Birth:</strong>{' '}
              {isEdit ? (
                <input
                  type="date"
                  className="border border-gray-300 rounded w-full p-2"
                  value={profileData.dob}
                  onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                />
              ) : (
                profileData.dob || 'N/A'
              )}
            </p>
            <p className="mb-2">
              <strong>Age:</strong> {new Date().getFullYear() - new Date(profileData.dob).getFullYear() || 'N/A'}
            </p> */}
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h2>
            <p className="mb-2">
              <strong>Email:</strong>{' '}
              {isEdit ? (
                <input
                  type="email"
                  className="border border-gray-300 rounded w-full p-2"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              ) : (
                profileData.email || 'N/A'
              )}
            </p>
            {/* <p className="mb-2">
              <strong>Phone:</strong>{' '}
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
              ) : (
                profileData.phone || 'N/A'
              )}
            </p> */}
            <p className="mb-2">
              <strong>Address:</strong>{' '}
              {isEdit ? (
                <>
                  <input
                    type="text"
                    className="border border-gray-300 rounded w-full p-2 mb-2"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData({ ...profileData, address: { ...profileData.address, line1: e.target.value } })
                    }
                  />
                  <input
                    type="text"
                    className="border border-gray-300 rounded w-full p-2"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData({ ...profileData, address: { ...profileData.address, line2: e.target.value } })
                    }
                  />
                </>
              ) : (
                `${profileData.address.line1}, ${profileData.address.line2}` || 'N/A'
              )}
            </p>
          </div>
         

          {/* Profile Photo */}
          <div className="bg-white shadow-md rounded-lg p-5 col-span-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Photo</h2>
            <div className="flex items-center">
              <img
                src={profileData.image || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-20 h-20 rounded-full border"
              />
              {isEdit && (
                <input
                  type="file"
                  className="ml-4"
                  onChange={(e) => console.log('Upload logic here:', e.target.files[0])}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'specialization' && (
        <div className="bg-white shadow-md rounded-lg p-5">
          {/* Contact Information */}
         
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Speciality</h2>
            <p className="mb-2">
              <strong>Speciality:</strong>{' '}
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  value={profileData.speciality}
                  onChange={(e) => setProfileData({ ...profileData, speciality: e.target.value })}
                />
              ) : (
                profileData.speciality || 'N/A'
              )}
            </p>
            <p className="mb-2">
              <strong>Degree:</strong>{' '}
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  value={profileData.degree}
                  onChange={(e) => setProfileData({ ...profileData, degree: e.target.value })}
                />
              ) : (
                profileData.degree || 'N/A'
              )}
            </p>
            <p className="mb-2">
              <strong>Experience:</strong>{' '}
              {isEdit ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  value={profileData.experience}
                  onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                />
              ) : (
                profileData.experience || 'N/A'
              )}
            </p>
           
        
        </div>

        
      )}
    </div>
  );
}
