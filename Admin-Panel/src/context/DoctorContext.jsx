import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(() => localStorage.getItem('dToken') || '');
    const [doctorId,setDoctorId] =useState(() => localStorage.getItem('doctorId') || '');
    const [dashData,setDashData] = useState([])
    const { id } = useParams()

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/complete-appointment`, 
                { appointmentId }, 
                { headers: { dToken } }
            );
    
            if (data.success) {
                toast.success(data.message);
                
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error completing appointment:', error); // Log the error for debugging
            toast.error(error.response?.data?.message || 'An error occurred while completing the appointment.');
        }
    };
    

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/cancel-appointment`, 
                { appointmentId }, 
                { headers: { dToken } }
            );
    
            if (data.success) {
                toast.success(data.message);
              
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error); // Log the error for debugging
            toast.error(error.response?.data?.message || 'An error occurred while cancelling the appointment.');
        }
    };
    

    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard/${id}`, {
                headers: {
                    Authorization: `Bearer ${dToken}` // Use Bearer token format
                }
            });
    
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error fetching dashboard data:", error); // Add context
            toast.error(error.response?.data?.message || error.message); // More informative error message
        }
    };
    

    const value = {
        dToken,
        setDToken,
        doctorId, setDoctorId,
        backendUrl,
        cancelAppointment,
        completeAppointment,
        dashData,setDashData,getDashData 
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
