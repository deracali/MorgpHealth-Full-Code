import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export default function DoctorAppointment() {
    const { dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext);
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for appointments
    const [page, setPage] = useState(1); // Page number for infinite scroll
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAppointments = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments/${id}?page=${page}`, {
                headers: { dToken }
            });
            if (data.success) {
                if (page === 1) {
                    setAppointments(data.appointments); // First page, overwrite
                } else {
                    setAppointments((prev) => [...prev, ...data.appointments]); // Append subsequent pages
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError(error.response?.data?.message || 'An error occurred while fetching appointments.');
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = debounce((e) => {
        const threshold = 100; // Trigger load more when near bottom
        const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + threshold;
        if (bottom && !loading) {
            setPage((prev) => prev + 1); // Load next page
        }
    }, 200); // Debounced scroll event

    const startVideoCall = (appointmentId) => {
        navigate(`/video-call/${appointmentId}`);
    };

    useEffect(() => {
        if (dToken) {
            getAppointments(); // Fetch appointments when token is available
        }
    }, [dToken, page]); // Re-fetch when page number changes

    if (error) {
        return (
            <div className="w-full max-w-6xl m-5">
                <p className="text-red-600">{error}</p>
                <button onClick={() => { setError(null); setPage(1); }} className="text-blue-500">Retry</button>
            </div>
        );
    }



    return (
        <div onScroll={handleScroll} className="w-full max-w-6xl m-5">
            <p className="mb-5 text-lg font-medium text-gray-800">Appointments</p>
    
            <div className="bg-[#FCFCFC] border rounded-lg shadow-sm text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll overscroll-auto">
                <div className="hidden sm:grid grid-cols-[2fr_2fr_1fr_2fr_1fr_1fr_1fr] gap-4 py-3 px-6 bg-gray-100 border-b">
                    <p className="font-medium text-gray-700">Name</p>
                    <p className="font-medium text-gray-700">Date & Time</p>
                    <p className="font-medium text-gray-700">Payment</p>
                    <p className="font-medium text-gray-700 text-center">Status</p>
                    <p className="font-medium text-gray-700">Meeting</p>
                    <p className="font-medium text-gray-700">Lab</p>
                    <p className="font-medium text-gray-700">Prescription</p>
                </div>
    
                {[...appointments].map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-wrap sm:grid sm:grid-cols-[2fr_2fr_1fr_2fr_1fr_1fr_1fr] gap-4 items-center text-gray-600 py-4 px-6 border-b hover:bg-gray-50"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                className="w-10 h-10 rounded-full"
                                src={item.userData.image}
                                alt={item.userData.name}
                            />
                            <p className="font-medium">{item.userData.name}</p>
                        </div>
                        <p className="text-gray-500">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                        <p className="text-gray-500">{item.condition || "N/A"}</p>
                        {item.cancelled ? (
                            <p className="text-red-500 font-medium text-center">Cancelled</p>
                        ) : item.isCompleted ? (
                            <p className="text-green-500 font-medium text-center">Completed</p>
                        ) : (
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() => cancelAppointment(item._id)}
                                    className="text-xs text-red-500 hover:underline"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => completeAppointment(item._id)}
                                    className="text-xs text-green-500 hover:underline"
                                >
                                    Complete
                                </button>
                            </div>
                        )}
                        <div>
                            <button
                                className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded text-xs"
                                onClick={() => startVideoCall(item._id)}
                            >
                                Join
                            </button>
                        </div>
                        <div>
                            <button
                                className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded text-xs"
                                onClick={() => startVideoCall(item._id)}
                            >
                                Lab Result
                            </button>
                        </div>
                        <div>
                            <button
                                className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded text-xs"
                                onClick={() => startVideoCall(item._id)}
                            >
                                Prescription
                            </button>
                        </div>
                    </div>
                ))}
    
                {loading && <div className="text-center py-4 text-gray-500">Loading...</div>}
    
                {!loading && appointments.length === 0 && (
                    <p className="text-center py-4 text-gray-500">No appointments found.</p>
                )}
            </div>
        </div>
    );
}    