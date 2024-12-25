import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('utoken') || false);
    const [userData, setUserData] = useState(null); // Changed to null

    // Fetch doctors data
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + 'api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fetch user profile data
    const loadUserProfileData = async () => {
        try {
            if (token) { // Only fetch if token is available
                // console.log("Fetching user profile with token:", token); // Debugging line
                const { data } = await axios.get(backendUrl + 'api/user/get-profile', {
                    headers: { token },
                });

                // console.log('User profile data:', data); // Debugging line

                if (data.success) {
                    setUserData(data.userData);
                } else {
                    toast.error(data.message);
                    setUserData(null); // Set userData to null if there's an error
                }
            }
        } catch (error) {
            console.error('Error fetching user profile data:', error);
            toast.error(error.message);
            setUserData(null); // Set userData to null on error
        }
    };

    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null); // Reset userData when no token
        }
    }, [token]);

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
