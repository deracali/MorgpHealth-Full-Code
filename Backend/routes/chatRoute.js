import express from 'express';
import { sendMessage, getChatHistory, startChat, getDoctorChats, deleteChat } from '../controllers/chatController.js';

const chatRoute = express.Router();

// Route to start a new chat
chatRoute.post('/start', startChat);

// Route to get chat history for a specific chat
chatRoute.get('/:chatId/history', getChatHistory);

// Route to send a message in a specific chat
chatRoute.post('/:chatId/message', sendMessage);

// Route to get all chats for a specific doctor
chatRoute.get('/doctor-chats/:doctorId', getDoctorChats); // Removed the optional parameter


chatRoute.delete('/delete-chat/:chatId', deleteChat);  // Removed the optional parameter


export default chatRoute;
