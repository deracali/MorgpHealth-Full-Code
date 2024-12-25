import Staff from '../models/staffModel.js';
import bcrypt from 'bcrypt';


const createStaff = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Check if staff already exists
    let staff = await Staff.findOne({ email });
    if (staff) {
      return res.status(400).json({ message: 'Staff with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new staff with hashed password and address
    staff = new Staff({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      address, // Save the address
    });

    await staff.save();
    res.status(201).json({ message: 'Staff created successfully', staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
  


// Get staff information
const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



// Update staff role to admin
const updateStaffRole = async (req, res) => {
  try {
    const { id } = req.params; // Extract the staff ID from the route parameters
    const { admin } = req.body; // Extract the new admin status from the request body

    // Check if the admin value is boolean
    if (typeof admin !== 'boolean') {
      return res.status(400).json({ message: 'Invalid admin value, it must be a boolean' });
    }

    // Find the staff member by ID and update their admin status
    const staff = await Staff.findByIdAndUpdate(
      id,
      { admin },
      { new: true } // Return the updated staff document
    );

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({ message: 'Staff role updated successfully', staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};





const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the route parameters

    // Find the staff member by ID and delete them
    const staff = await Staff.findByIdAndDelete(id);

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({ message: 'Staff deleted successfully', staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


export {getStaff,deleteStaff,createStaff,updateStaffRole}