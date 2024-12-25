import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import cloudinary from 'cloudinary';
import doctorModel from "../models/doctorsModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Notification from "../models/notificationModel.js";


// Access the 'vs' property if it exists on the cloudinary object
const { vs } = cloudinary;

const registerUser = async (req, res) => {
    try {
        const { name, email, password, region, phoneNumber, gender } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Enter a strong password (at least 6 characters)" });
        }

        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prepare user data
        const userData = {
            name,
            email,
            password: hashedPassword,
            region,
            phoneNumber,
            gender
        };

        // Save user to the database
        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Send response
        res.status(201).json({
            success: true,
            token,
            userId: user._id,
            insured: user.insured,
            timer:user.timer
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
         
            const insured = user.insured; 
            const userId = user._id; 
            const timer = user.timer
            res.json({ success: true, token, insured, userId, timer });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password');
        
        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getProfileId = async (req, res) => {
    try {
        // Extract userId from the request parameters
        const { userId } = req.params; 
        const userData = await userModel.findById(userId).select('-password');
        
        // Check if userData exists
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Change the key to 'user' to match your frontend access
        res.json({ success: true, user: userData }); // Change 'userData' to 'user'
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender, age, region } = req.body; // Added age and region
        const imageFile = req.file;

        // if (!name || !phoneNumber || !gender || !age || !region) { // Check for age and region
        //     return res.json({ success: false, message: "Data Missing" });
        // }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender, age, region }); // Update age and region
        
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.json({ success: true, message: "Profile Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



const updateProfileMobile = async (req, res) => {
  try {
    // Extract fields from request body (image is handled via file or Base64)
    const { userId, name, phoneNumber, email, gender, region, timer, insured } = req.body; 

    // Find and update the user's profile data
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, phoneNumber, email, gender, region,timer,insured },
      { new: true } // Return the updated user
    );

    // Handle image upload if file or Base64 data is provided
    if (req.body.image) { // If a Base64 image is provided in the body
      let imageUrl = updatedUser.image; // Preserve current image URL if no new image is provided

      // Check if the image is a Base64 string (starts with 'data:image')
      if (req.body.image.startsWith('data:image')) {
        // Upload Base64 image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(req.body.image, { resource_type: "image" });
        imageUrl = imageUpload.secure_url;
      }

      // Update user's image field with the Cloudinary image URL
      updatedUser.image = imageUrl;
      await updatedUser.save(); // Save the updated image URL
    } else if (req.file) { // If a file image is uploaded
      const imageFile = req.file;
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      updatedUser.image = imageUpload.secure_url;
      await updatedUser.save(); // Save the updated image URL
    }

    // Return the updated user in the response
    res.json({ success: true, message: "Profile Updated", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


 const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime, concern,description } = req.body;

        // Fetch doctor data, excluding password field
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }

        // Ensure slots_booked exists in doctor data
        let slots_booked = docData.slots_booked || {};

        // Check if the specific date is already booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime); // Add slot to the existing array
            }
        } else {
            slots_booked[slotDate] = [slotTime]; // Initialize the array with the new slot
        }

        // Fetch user data, excluding password field
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Remove slots_booked from docData as it's not needed in the appointment
        delete docData.slots_booked;

        // Prepare appointment data
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            concern,
            description,
            data: Date.now() // Use Date.now() for timestamp
        };

        // Create a new appointment
        const newAppointment = new appointmentModel(appointmentData);

        // Save new appointment to the database
        await newAppointment.save();

        // Update the doctor's available slots in the database
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        // Respond with success
        res.json({ success: true, message: "Appointment Booked", appointment: appointmentData });

    } catch (error) {
        console.error("Error occurred while booking appointment:", error);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
    }
};




const listAppointment = async (req, res) => {
    try {
        const { userId } = req.params; // Accessing `userId` from the query string

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Find appointments for the user
        const appointments = await appointmentModel.find({ userId });

        if (appointments.length === 0) {
            return res.json({ success: false, message: "No appointments found" });
        }

        res.json({ success: true, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching appointments" });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' });
        }

        // Update the appointment status to an empty string
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true, status: "" });

        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: 'Appointment Cancelled' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



 const getAppointmentById = async (req, res) => { 
  try {
    const { appointmentId } = req.params;

    // Find a specific appointment by its appointmentId
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Return the found appointment
    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export { registerUser,getProfileId,getAppointmentById, updateProfileMobile, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };
