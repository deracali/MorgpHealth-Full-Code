import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


// Staff Schema
const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin:{
    type:Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  onlineDuration: {
    type: Number, // Duration in seconds
    default: 0,
  },
  // Add any other staff details here (e.g., position, role)
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});


// Create Staff Model
const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
