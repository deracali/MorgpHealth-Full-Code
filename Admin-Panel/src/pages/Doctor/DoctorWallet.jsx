import React, { useEffect, useState } from 'react';
import '../../styles/doctorWallet.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'; // Import format from date-fns
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Wallet = () => {
    const [profileData, setProfileData] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [balanceHistory, setBalanceHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [currentDateTime, setCurrentDateTime] = useState('');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const getCurrentDateTime = () => {
            const currentDate = new Date();
            const dayOfWeek = currentDate.toLocaleString('en-us', { weekday: 'long' });
            const day = currentDate.getDate();
            const month = currentDate.toLocaleString('en-us', { month: 'long' });
            const year = currentDate.getFullYear();

            const timeOfDay = getTimeOfDay(currentDate.getHours());

            // Set the current date and greeting message
            setCurrentDateTime(`${dayOfWeek}, ${day}${getOrdinalSuffix(day)} ${month}, ${year}`);
            setGreeting(`Good ${timeOfDay}, ${profileData.name}`);
        };

        getCurrentDateTime();
    }, [profileData.name]);

    const getTimeOfDay = (hour) => {
        if (hour < 12) {
            return 'morning';
        } else if (hour < 18) {
            return 'afternoon';
        } else {
            return 'evening';
        }
    };

    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };


     const getProfileData = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/profile/${id}`);
            if (data.success) {
                const { profileData } = data;
                setProfileData(profileData);
                setBalanceHistory(profileData.balanceHistory || []);
            } else {
                console.error("Error fetching profile: No data found.");
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
         
        }finally {
            setIsLoading(false); // Set loading to false after the fetch is complete
        }
    };

    

    const fetchBalanceHistory = async () => {
        setIsLoading(true);
        try {
            // Example: Assuming your backend supports pagination
            const { data } = await axios.get(
                `${backendUrl}/api/doctor/profile/${id}/balanceHistory?page=${page}`
            );
            if (data.success) {
                setBalanceHistory((prevHistory) => [...prevHistory, ...profileData.balanceHistory]);
                setPage(prevPage => prevPage + 1);  // Increment page for next fetch
            } else {
                console.error("Error fetching more balance history");
            }
        } catch (error) {
            console.error('Error fetching balance history:', error);
        } finally {
            setIsLoading(false);
        }
    };


       // Function to handle infinite scrolling
       const handleScroll = (e) => {
        const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
        if (bottom && !isLoading) {
            fetchBalanceHistory(); // Fetch more data when user reaches bottom
        }
    };
// console.log(balanceHistory)
console.log(profileData)

     const getStatusClasses = (type) => {
        switch (type) {
            case "added":
                return "bg-green-100 text-green-700";
            case "withdrawn":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

   

    useEffect(() => {
        getProfileData();
    }, []);

   


    const processBalanceHistory = () => {
        if (!balanceHistory.length) return [];
        const monthlyIncome = new Array(12).fill(0);
        balanceHistory.forEach(entry => {
            if (entry.type === "added") {
                const month = new Date(entry.date).getMonth();
                monthlyIncome[month] += entry.amount;
            }
        });
        return monthlyIncome;
    };

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Income",
                data: processBalanceHistory(),
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.1)",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    const navigate = useNavigate();
    return (
        <div className="container-box w-[70%]">
          <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-blue-500  text-white p-6 rounded-lg">
        <div className="mb-6">
          <p className="text-sm">{currentDateTime}</p>
          <h1 className="text-xl font-bold">{greeting}</h1>
          <p className="mt-4 text-lg">Available Balance</p>
          <h2 className="text-4xl font-bold">${profileData.balance}</h2>
        </div>

        {/* Income Chart */}
        <div className="bg-white p-4 rounded-lg text-black">
          <h3 className="text-lg font-semibold mb-4">Income</h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-700">Payment Method</h2>
        <div className="flex flex-col gap-4">
          <div className="bg-blue-700 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Bank Account</h3>
            <p className="text-sm">Withdraw</p>
          </div>
          <div className="bg-blue-400 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Paypal</h3>
            <p className="text-sm">Withdraw</p>
          </div>
          <div className="bg-purple-600 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Bank Transfer</h3>
            <p className="text-sm">Withdraw</p>
          </div>
          <div className="footer">
                <button onClick={() => navigate(`/withdrawal/${id}`)} className="button">Withdraw</button>
            </div>
        </div>
      </div>
    </div>


    <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-lg onScroll={handleScroll} shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Transaction
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        className="bg-white divide-y divide-gray-200 overflow-y-auto"
                        style={{ maxHeight: '400px' }} // Adjust the maxHeight to your desired height
                        onScroll={handleScroll} // Adding infinite scrolling event
                    >
                        {balanceHistory.length > 0 ? (
                            balanceHistory.map((entry, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {entry.type === 'added' ? 'Balance Added' : 'Balance Withdrawn'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(entry.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        {entry.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(entry.type)}`}
                                        >
                                            {entry.type}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-sm text-center text-gray-500">
                                    No balance history available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {isLoading && (
                    <div className="text-center py-4 text-gray-500">Loading...</div> // Loader for infinite scroll
                )}
            </div>
        </div>
        </div>
    );
};

export default Wallet;
