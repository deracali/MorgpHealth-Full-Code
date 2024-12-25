import mongoose from 'mongoose';
const { Schema } = mongoose;

// Schema for individual messages in the chat
const messageSchema = new Schema({
  id: {
    type: Number,
    required: true, // Unique identifier for each message
  },
  text: {
    type: String,
    trim: true, // Trim whitespace
    required: true, // Message content is required
  },
  sender: {
    type: String,
    enum: ['user', 'bot'], // Sender must be either 'user' or 'bot'
    required: true,
  },
});

// Main schema for storing requests
const requestSchema = new Schema({
  username: {
    type: String,
    trim: true, // Trim whitespace
    required: true, // Username is required
  },
  userEmail: {
    type: String,
    trim: true, // Trim whitespace
    lowercase: true, // Convert email to lowercase
    match: [/.+@.+\..+/, 'Please provide a valid email address'], // Email validation regex
    required: true, // User email is required
  },
  chatMessages: {
    type: [messageSchema], // Array of message objects
    required: true, // Chat messages are required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current timestamp
  },
});

// Creating a model based on the schema
const Request = mongoose.model('Request', requestSchema);

export default Request;
