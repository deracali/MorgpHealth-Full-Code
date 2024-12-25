import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Bar } from "react-chartjs-2";
import { FaCalendarAlt, FaDollarSign, FaUserMd, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import io from 'socket.io-client'; // Import Socket.IO client

export default function DoctorDashboard() {
    const { dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext);
    const { currency, slotDateFormat } = useContext(AppContext);
    const [dashData, setDashData] = useState([]);
    const [chats, setChats] = useState([]);
    const [userProfiles, setUserProfiles] = useState({}); // To store user profiles
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    
    const [appointmentsData, setAppointmentsData] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [nextAppointment, setNextAppointment] = useState(null);

    const { id: doctorId } = useParams(); // Extract doctorId from URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const socket = io(backendUrl); // Initialize Socket.IO client

    // Fetch dashboard data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard/${doctorId}`, {
                headers: { dToken }
            });
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error(error.response?.data?.message || 'An error occurred while fetching dashboard data.');
        }
    };

    // Fetch chats
    const fetchChats = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/chat/doctor-chats/${doctorId}`, {
                headers: { dToken }
            });
            if (data.success) {
                setChats(data.chats);
                await fetchUserProfiles(data.chats); // Fetch user profiles after getting chats
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch chats');
        }
    };

    // Fetch user profiles based on chat user IDs
    const fetchUserProfiles = async (chats) => {
        try {
            const profiles = await Promise.all(
                chats.map(async (chat) => {
                    const userId = chat.user; // Use the user field to get the user ID

                    if (!userId) {
                        console.warn('User ID is missing for chat:', chat);
                        return null; // Skip this chat if userId is undefined
                    }

                    try {
                        const { data } = await axios.get(`${backendUrl}/api/user/get-profileId/${userId}`, {
                            headers: { dToken }
                        });

                        // Check if user data is available in the response
                        if (data.success && data.user) { // This checks the 'user' key
                            return { [userId]: data.user }; // Store user details with userId as the key
                        } else {
                            console.error(`Failed to fetch profile for userId ${userId}:`, data.message);
                            return { [userId]: undefined }; // Return undefined if the fetch fails
                        }
                    } catch (error) {
                        console.error(`Error fetching profile for userId ${userId}:`, error);
                        return { [userId]: undefined }; // Return undefined if the fetch fails
                    }
                })
            );

            // Filter out null profiles (those with missing userId or fetch errors)
            const validProfiles = profiles.filter(profile => profile !== null);
            const profilesObj = Object.assign({}, ...validProfiles);
            setUserProfiles(profilesObj); // Set user profiles in state
            console.log('User Profiles:', profilesObj); // Debugging line
        } catch (error) {
            console.error('Error fetching user profiles:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch user profiles');
        }
    };

    // Select chat and fetch history
    const selectChat = async (chatId) => {
        setSelectedChatId(chatId);
        await fetchChatHistory(chatId);
    };

    // Fetch chat history for a selected chat
    const fetchChatHistory = async (chatId) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/chat/${chatId}/history`, {
                headers: { dToken }
            });
            if (data.success) {
                setChatMessages(data.messages);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
            toast.error(error.response?.data?.message || 'Failed to load chat history');
        }
    };

    // Send message in chat
    const sendMessage = async () => {
        // Check if message content is provided
        if (!messageContent.trim()) return;
    
        // Check if the chat ID is available
        if (!selectedChatId) {
            toast.error('Chat ID is missing. Please start a chat first.');
            return;
        }
    
        // Set senderModel to 'Doctor' since this is for doctors
        const senderModel = 'Doctor'; // Hardcoded to 'Doctor' for this context
    
        // Emit message through WebSocket
        socket.emit('sendMessage', { selectedChatId, senderId: doctorId, content: messageContent });
    
        // Save message to the database
        try {
            const response = await fetch(`${backendUrl}/api/chat/${selectedChatId}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: doctorId, // Assuming doctorId is defined and valid
                    senderModel, // Use 'Doctor'
                    content: messageContent,
                }),
            });
    
            // Check for errors in the response
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }
    
            // Optionally handle the response if needed
            const data = await response.json();
           
    
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    
        // Clear the input field after sending the message
        setMessageContent('');
    };
    

    // Listen for incoming messages from the server
    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setChatMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('receiveMessage'); // Cleanup listener on component unmount
        };
    }, []);

    useEffect(() => {
        if (dToken && doctorId) {
            getDashData();
            fetchChats();
        }
    }, [dToken, doctorId]);

    const handleUsernameClick = () => {
        setSelectedChatId(null); // Close the chat
        setChatMessages([]); // Clear chat messages
    };



      // Function to delete a chat
      const deleteChat = async (chatId) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/chat/delete-chat/${chatId}`, {
                headers: { dToken }
            });
            if (data.success) {
                // Remove the chat from state
                setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
                toast.success('Chat deleted successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting chat:', error);
            toast.error(error.response?.data?.message || 'Failed to delete chat');
        }
    };



     // Function to convert AM/PM time to 24-hour format
  const convertTo24HourTime = (time) => {
    const [hourMinute, period] = time.split(" ");
    let [hour, minute] = hourMinute.split(":");
    hour = parseInt(hour, 10);
    minute = parseInt(minute, 10);

    if (period === "PM" && hour !== 12) {
      hour += 12; // Convert PM to 24-hour format
    } else if (period === "AM" && hour === 12) {
      hour = 0; // Convert 12 AM to 00 hours
    }

    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  // Function to calculate appointments per day (Mon-Sun)
  const getAppointmentsPerWeek = (appointments) => {
    const appointmentsPerDay = [0, 0, 0, 0, 0, 0, 0]; // Initialize counters for each day (Mon-Sun)

    appointments.forEach((appointment) => {
      const { slotDate, slotTime } = appointment;

      if (slotDate && slotTime) {
        let appointmentDateTime;
        try {
          // Handle non-standard date format ("4__2024") - MM__YYYY format
          if (slotDate.includes("__")) {
            const [day, year] = slotDate.split("__");
            const currentMonth = new Date().getMonth() + 1; // Get current month (1-based)
            const formattedDate = `${year}-${currentMonth.toString().padStart(2, "0")}-${day.padStart(2, "0")}`;
            appointmentDateTime = new Date(`${formattedDate} ${convertTo24HourTime(slotTime)}`);
          }
          // Handle standard date format ("2024-11-13") - YYYY-MM-DD format
          else if (slotDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            appointmentDateTime = new Date(`${slotDate} ${convertTo24HourTime(slotTime)}`);
          }

          if (!isNaN(appointmentDateTime)) {
            const dayOfWeek = (appointmentDateTime.getUTCDay() + 6) % 7; // Adjust so Monday = 0, Sunday = 6
            appointmentsPerDay[dayOfWeek] += 1;
          }
        } catch (error) {
          console.error("Error parsing date/time:", error);
        }
      }
    });

    return appointmentsPerDay;
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorId) return;

      setLoadingAppointments(true);
      try {
        const response = await axios.get(
          `https://morgphealth.onrender.com/api/doctor/appointments/${doctorId}`
        );

        if (response.data.appointments && Array.isArray(response.data.appointments)) {
          setAppointmentsData(response.data.appointments);

            // Sort appointments by slot date and time, and find the closest one
            const sortedAppointments = response.data.appointments.sort((a, b) => {
                const dateA = new Date(`${a.slotDate}T${a.slotTime}`);
                const dateB = new Date(`${b.slotDate}T${b.slotTime}`);
                return dateA - dateB;
              });
    
              // Get the closest upcoming appointment
              const closestAppointment = sortedAppointments.find(appointment => {
                const appointmentDate = new Date(`${appointment.slotDate}T${appointment.slotTime}`);
                return appointmentDate > new Date();
              });
    
              setNextAppointment(closestAppointment || null);

        } else {
          console.error("No appointments found or unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  // Calculate appointments per day
  const appointmentsPerDay = !loadingAppointments && Array.isArray(appointmentsData)
    ? getAppointmentsPerWeek(appointmentsData)
    : [0, 0, 0, 0, 0, 0, 0];

  // Data for the Bar chart
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Appointments",
        data: appointmentsPerDay,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };


  return (
    <div className='m-5 bg-[#FCFCFC]'>
        {/* Dashboard data display */}
        <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-4 bg-white p-6 min-w-60 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all'>
                <FaDollarSign className='w-16 text-gray-700' />
                <div>
                    <p className='text-2xl font-semibold text-gray-700'>{currency}{dashData.earnings}</p>
                    <p className='text-gray-500'>Earnings</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white p-6 min-w-60 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all'>
                <FaCalendarAlt className='w-16 text-gray-700' />
                <div>
                    <p className='text-2xl font-semibold text-gray-700'>{dashData.appointments}</p>
                    <p className='text-gray-500'>Appointments</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white p-6 min-w-60 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all'>
                <FaUserMd className='w-16 text-gray-700' />
                <div>
                    <p className='text-2xl font-semibold text-gray-700'>{dashData.patients}</p>
                    <p className='text-gray-500'>Patients</p>
                </div>
            </div>

            {/* <div className='flex items-center gap-4 bg-white p-6 min-w-60 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all'>
                <FaEnvelope className='w-16 text-gray-700' />
                <div>
                    <p className='text-2xl font-semibold text-gray-700'>{dashData.messages}</p>
                    <p className='text-gray-500'>New Message</p>
                </div>
            </div> */}
        </div>

        <div className="flex gap-8 p-6 mt-10 bg-white shadow-xl rounded-lg">
            {/* Weekly Appointments */}
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Weekly Appointments</h2>
                {loadingAppointments ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    <Bar data={data} options={options} />
                )}
            </div>

            {/* Upcoming Appointment Section */}
           <div className="bg-white shadow-md rounded-lg p-6 w-1/3">
      <h2 className="text-xl font-bold mb-4">Upcoming Appointment</h2>

      {nextAppointment ? (
        <div className="flex items-center gap-4">
          <img src={nextAppointment.userData.image || "https://via.placeholder.com/50"} alt="Profile" className="w-16 h-16 rounded-full" />
          <div>
            <h3 className="text-lg font-bold">{nextAppointment.userData.name}</h3>
            {/* <p className="text-sm text-gray-500">{nextAppointment.diagnosis || 'No Diagnosis'}</p> */}
          </div>
        </div>
      ) : (
        <p>No upcoming appointments</p>
      )}

      {nextAppointment && (
        <div className="mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="material-icons text-gray-500">calendar_today</span>
            <p>{nextAppointment.slotDate}</p>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="material-icons text-gray-500">time</span>
            <p>{nextAppointment.slotTime}</p>
          </div>
          <button className="mt-4 text-blue-500 hover:text-blue-600 text-sm font-medium">Join</button>
        </div>
      )}

    </div>
        </div>

        {/* Latest Bookings Section */}
        <div className='bg-white mt-10 shadow-lg rounded-lg'>
            <div className='flex items-center gap-4 px-6 py-4 rounded-t bg-gray-50'>
                <img src={assets.list_icon} alt='' />
                <p className='font-semibold text-lg'>Latest Bookings</p>
            </div>
            <div className='pt-4'>
                {dashData.latestAppointments?.map((item, index) => (
                    <div className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50 cursor-pointer' key={index}>
                        <img className='rounded-full w-12' src={item.userData.image} alt='' />
                        <div className='flex-1 text-sm'>
                            <Link to={`/session/${item._id}`} className='text-gray-800 font-semibold'>{item.userData.name}</Link>
                            <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                        </div>
                        {item.cancelled ? (
                            <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                        ) : item.isCompleted ? (
                            <p className='text-green-500 text-xs font-medium'>Completed</p>
                        ) : (
                            <div className='flex'>
                                <img className="cursor-pointer w-12" onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt='Cancel' />
                                <img className="cursor-pointer w-12" onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt='Confirm' />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Messages Section */}
        <div className='bg-white mt-10 p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>Messages</h2>
            <div className='chat-list mt-4'>
                {chats.map((chat) => (
                    <div key={chat._id} className='chat-item cursor-pointer p-4 border-b hover:bg-gray-50'>
                        <p className='font-medium flex items-center justify-between'>
                            <span className='flex items-center' onClick={() => selectChat(chat._id)}>
                                {userProfiles[chat.user]?.name || 'User'}
                                <span className='ml-2 w-3 h-3 bg-green-500 rounded-full'></span>
                            </span>
                            <div>
                                <button
                                    className='ml-4 bg-red-500 text-white rounded p-2 hover:bg-red-600'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteChat(chat._id);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    className='ml-2 bg-gray-500 text-white rounded p-2 hover:bg-gray-600'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUsernameClick();
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </p>
                        <p className='text-sm text-gray-500'>
                            {chat.lastMessage ? chat.lastMessage : 'No messages yet'}
                        </p>
                    </div>
                ))}
            </div>

            {selectedChatId && (
                <div className='chat-window mt-4'>
                    {userProfiles[chats.find(chat => chat._id === selectedChatId)?.user] ? (
                        <>
                            <h3 className='text-xl font-semibold cursor-pointer'>
                                Chat with {userProfiles[chats.find(chat => chat._id === selectedChatId)?.user]?.name}
                            </h3>
                            <div className="chat-messages border-t mt-4">
                                {chatMessages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.senderModel === 'Doctor' ? 'justify-start' : 'justify-end'} p-4`}
                                    >
                                        <div
                                            className={`max-w-xs rounded-lg p-4 ${
                                                msg.senderModel === 'Doctor' ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'
                                            }`}
                                        >
                                            <p>{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='chat-input flex mt-4'>
                                <input
                                    type='text'
                                    value={messageContent}
                                    onChange={(e) => setMessageContent(e.target.value)}
                                    placeholder='Type your reply...'
                                    className='flex-1 border rounded p-4'
                                />
                                <button onClick={sendMessage} className='ml-4 bg-blue-500 text-white rounded p-4'>Send</button>
                            </div>
                        </>
                    ) : (
                        <p className='text-red-500'>No user</p>
                    )}
                </div>
            )}
        </div>
    </div>
);

}
