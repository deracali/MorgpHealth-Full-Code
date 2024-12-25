import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client'; // Import Socket.IO client

export default function Appointment() {
  const { docId } = useParams(); // Capture docId from route params
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData, userData } = useContext(AppContext);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [chatId, setChatId] = useState(null); // Added to store chatId
  const socket = io(backendUrl); // Initialize socket connection

  // Fetch doctor info based on docId
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    if (!docInfo) {
      toast.error("Doctor not found!");
      return;
    }
    setDocInfo(docInfo);
  };

  // Get available slots for the doctor
  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable = !(docInfo?.slots_booked?.[slotDate]?.includes(slotTime));

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => ([...prev, timeSlots]));
    }
  };

  // Book an appointment with the selected doctor
  const bookAppointment = async () => {
    if (!token) {
      return navigate('/login');
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + "_" + year;

      const { data } = await axios.post(backendUrl + 'api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });

      if (data.success) {
        getDoctorsData();
        navigate(`/my-appointments/${userData._id}`);
        toast.success("Session Booked");
      } else {
        toast.error(data.message || "Failed to book appointment");
      }

    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("An error occurred while booking the appointment.");
    }
  };

  // Start chat with the doctor
  const startChat = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/chat/start`,
        { userId: userData._id, doctorId: docId },
        { headers: { token } }
      );

      // Check if chatId is returned
      if (data.chatId) {
        setChatId(data.chatId); // Set chatId here
        setShowChatPopup(true);
        fetchChatHistory(data.chatId);
      } else {
        toast.error('Failed to retrieve chat ID');
      }
    } catch (error) {
      toast.error('Failed to start chat');
      console.error("Error starting chat:", error);
    }
  };

  // Fetch chat history for the current chat
  const fetchChatHistory = async (chatId) => {
    if (!chatId) {
      console.error('chatId is undefined or null');
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}api/chat/${chatId}/history`, {
        headers: { token }
      });
      
      if (data.messages) {
        setChatMessages(data.messages);
      } else {
        toast.error('No messages found for this chat');
      }
    } catch (error) {
      toast.error('Failed to load chat history');
      console.error("Error fetching chat history:", error);
    }
  };

  // Send message in chat
  const sendMessage = async () => {
    if (!messageContent.trim()) return;

    if (!chatId) {
        toast.error('Chat ID is missing. Please start a chat first.');
        return;
    }

    // Set senderModel to match the schema's enum values
    const senderModel = 'User'; // Adjust logic based on your application

    // Emit message through WebSocket
    socket.emit('sendMessage', { chatId, senderId: userData._id, content: messageContent });

    // Save message to the database
    try {
        const response = await fetch(`${backendUrl}api/chat/${chatId}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderId: userData._id,
                senderModel, // Use 'User' or 'Doctor' based on role
                content: messageContent,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send message');
        }

        const data = await response.json();
        setMessageContent('');
      

    } catch (error) {
        toast.error(`Error: ${error.message}`);
    }
};

  
  // Listen for incoming messages
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });
  
    // Cleanup on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]); // Ensure that docId is part of the dependency array

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt='' />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt='Verified Icon' />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.specialty}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          <p className='text-gray-600 mt-3'>
            Appointment fee: <span>{currencySymbol}{docInfo.fees}</span>
          </p>
         
          <div>
            <p className='flex pt-1 items-center gap-1 text-sm font-medium text-gray-900'>
              About <img className='w-4 h-4' src={assets.info_icon} alt='' />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>

          {/* Chat with Doctor Button */}
          <button onClick={startChat} className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-full'>
            Chat with Doctor
          </button>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots.map((item, index) => (
            <div 
              className={`text-center py-2 px-3 border rounded-lg cursor-pointer ${index === slotIndex ? 'bg-blue-500 text-white' : 'text-gray-600'}`} 
              onClick={() => { setSlotIndex(index); setSlotTime(item[0].time); }}
              key={index}
            >
              <span>{daysOfWeek[index]}</span>
              <span className='block text-xs'>{item[0].time}</span>
            </div>
          ))}
        </div>
        
        <button onClick={bookAppointment} className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-full'>
          Book Appointment
        </button>
      </div>

      {/* Chat Popup */}
      {showChatPopup && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg shadow-lg p-4 w-80 max-w-sm">
    <div className="h-60 overflow-y-scroll flex flex-col gap-4">
    {chatMessages.map((msg, index) => (
  <div
    key={index}
    className={`flex ${
      msg.senderModel === 'User' ? 'justify-end' : 'justify-start'
    } mb-4`}
  >
    <div
      className={`p-3 rounded-lg max-w-xs ${
        msg.senderModel === 'User'
          ? 'bg-[#03A9F4] text-white text-right' // User message styling (right)
          : 'bg-[#000] text-white text-left'    // Doctor message styling (left)
      }`}
    >
      <p>{msg.content}</p>
    </div>
  </div>
))}
</div>


      <input
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        placeholder="Type your message..."
        className="border border-gray-300 rounded-lg w-full p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between mt-2">
        <button
          onClick={sendMessage}
          className="bg-[#03A9F4] text-white py-2 px-4 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
        <button
          onClick={() => setShowChatPopup(false)}
          className="bg-[#000] text-white py-2 px-4 rounded-full hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      
      <RelatedDoctors />
    </div>
  );
}
