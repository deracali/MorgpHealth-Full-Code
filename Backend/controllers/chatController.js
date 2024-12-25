import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';
import Doctor from '../models/doctorsModel.js';
import { io } from '../server.js'; 

// Start a new chat between a user and a doctor
const startChat = async (req, res) => {
  const { userId, doctorId } = req.body;

  try {
    console.log(`Received request to start chat between user ${userId} and doctor ${doctorId}`);

    // Check if a chat between the user and doctor already exists
    let chat = await Chat.findOne({ user: userId, doctor: doctorId });
    
    if (!chat) {
      console.log(`No existing chat found. Creating a new chat between user ${userId} and doctor ${doctorId}`);
      chat = new Chat({ user: userId, doctor: doctorId });
      await chat.save();
      console.log(`New chat created with chatId: ${chat._id}`);
    }

    res.status(200).json({ success: true, chatId: chat._id });
  } catch (error) {
    console.error('Error starting chat:', error);
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error.message); // Log validation specific errors
    }
    res.status(500).json({ success: false, error: 'Failed to start chat' });
  }
};



const getChatHistory = async (req, res) => {
    const { chatId } = req.params;
    
    try {
        const messages = await Message.find({ chat: chatId })
            .sort('createdAt')
            .populate('sender', 'name'); // Populate sender details for context

        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error('Error retrieving chat history:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve chat history' });
    }
};



// Send a message in a specific chat
const sendMessage = async (req, res) => {
  const { chat, senderId, senderModel, content } = req.body;

  console.log('Received message data:', req.body);

  // Validate the required fields in the request body
  if (!senderId || !senderModel || !content || !chat) {
    return res.status(400).json({ error: 'Missing required fields: senderId, senderModel, content, chat' });
  }

  try {
    let sender;

    // Check if sender is a User or a Doctor
    if (senderModel === 'User') {
      sender = await User.findById(senderId);
      if (!sender) {
        return res.status(404).json({ error: 'User not found' });
      }
    } else if (senderModel === 'Doctor') {
      sender = await Doctor.findById(senderId);  // Assuming 'Doctor' model exists
      if (!sender) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid sender model' });
    }

    // Validate the chat exists
    const chatExists = await Chat.findById(chat);
    if (!chatExists) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Create new message
    const newMessage = await Message.create({
      chat, // chatId from the request body
      sender: senderId, // sender reference (User or Doctor)
      senderModel, // sender model ('User' or 'Doctor')
      content, // message content
    });

    console.log('Message saved to database:', newMessage);

    // Emit message to socket
    io.to(chat).emit('receiveMessage', newMessage);

    res.status(200).json({ message: 'Message sent', newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: `Failed to send message: ${error.message}` });
  }
};



// Get all chats for a specific doctor
const getDoctorChats = async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Corrected: Use { doctor: doctorId } to match the field name in the schema
        const doctorChats = await Chat.find({ doctor: doctorId })           .exec();

        res.json({ success: true, chats: doctorChats });
    } catch (error) {
        console.error('Error fetching doctor chats:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch doctor chats' });
    }
};




// Delete a chat and its associated messages
const deleteChat = async (req, res) => {
    const { chatId } = req.params;

    try {
        // Delete messages associated with the chat
        await Message.deleteMany({ chat: chatId });

        // Delete the chat
        await Chat.findByIdAndDelete(chatId);

        res.status(200).json({ success: true, message: 'Chat deleted successfully' });
    } catch (error) {
        console.error('Error deleting chat:', error);
        res.status(500).json({ success: false, error: 'Failed to delete chat' });
    }
};

export { startChat, getChatHistory, sendMessage, getDoctorChats, deleteChat };
