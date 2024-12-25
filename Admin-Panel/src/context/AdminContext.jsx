import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // Initialize token state from localStorage
  const [aToken, setAToken] = useState(() => localStorage.getItem('aToken') || '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure correct environment variable for your backend
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData,setDashData] = useState(false)


  // Fetch all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`, // Fixed missing slash before api
        {},

      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while fetching doctors');
    }
  };

  // Change availability status of a doctor
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`, // Fixed missing slash before api
        { docId },
        { headers: { Authorization: `Bearer ${aToken}` } } // Correct token header format
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors(); // Fetch updated doctors list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while changing availability');
    }
  };

  // Effect to update localStorage whenever aToken changes
  useEffect(() => {
    if (aToken) {
      localStorage.setItem('aToken', aToken);
    } else {
      localStorage.removeItem('aToken'); // Clean up if token is removed
    }
  }, [aToken]);

  const getAllAppointments = async () => {
    try{
      const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})
    
      if(data.success){
        setAppointments(data.appointments)
      } else{
        toast.error(data.message)
      }

    } catch(error){
      toast.error(error.message);
    }
  }

  

  const cancelAppointment = async (appointmentId) => {
  try{
    const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers:{aToken}})
  
    
    if(data.success){
      toast.success(data.message)
      getAllAppointments()
    }else{
      toast.error(data.message)
    }
  }
  catch(error){
    toast.error(error.message)
  }
  }


  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken }
      });
  
      if (data.success) {
        setDashData(data.dashData);
      
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData, getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
