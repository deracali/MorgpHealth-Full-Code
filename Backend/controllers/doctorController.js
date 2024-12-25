import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorsModel.js'
import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from 'cloudinary';
import Notification from "../models/notificationModel.js";  

// Access the 'vs' property if it exists on the cloudinary object
const { vs } = cloudinary;

const changeAvailablity = async (req,res) => {
    try {
        const {docId} = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available});
        res.json({success:true,message:"Availability Changed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

const doctorList = async (req,res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email']);
        res.json({success:true,doctors});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

const doctorFilter = async (req, res) => {
    try {
      // Extract speciality from URL params
      const { speciality } = req.params;  // URL parameter can be a string or comma-separated list
     
      const doctors = speciality
      ? await doctorModel.where('speciality').equals(speciality).select('-password')
      : await doctorModel.find().select('-password');

      res.json({ success: true, doctors });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  
  const doctorFilterController = async (req, res) => {
    try {
      const { speciality, gender, fees, available } = req.query; // Extract filter criteria from the query string
  
      // Build the query based on the filters provided
      const query = {};
  
      // Filter by speciality
      if (speciality) {
        query.speciality = { $regex: new RegExp(speciality, 'i') };  // Case-insensitive filter for specialty
      }
  
      // Filter by gender
      if (gender) {
        query.gender = gender.toLowerCase();  // Case-insensitive filter for gender
      }
  
      // Handle fees filter
      if (fees) {
        if (fees === 'Below $200') {
          query.fees = { $lt: 200 };  // Find doctors with fees less than 200
        } else if (fees === 'Above $500') {
          query.fees = { $gt: 500 };  // Find doctors with fees greater than 500
        } else {
          // For ranges like '100 - 200'
          const feeRange = fees.split(' - ');
          if (feeRange.length === 2) {
            query.fees = { 
              $gte: parseFloat(feeRange[0].replace('$', '')), 
              $lte: parseFloat(feeRange[1].replace('$', ''))
            };
          }
        }
      }
  
      // Handle availability
    //   if (available !== undefined) {
    //     query.available = available === 'true';  // Convert 'true'/'false' string to a boolean
    //   }
  
      // Log the query for debugging
      console.log('Query:', query);
  
      // Fetch the doctors from the database using the constructed query
      const doctors = await doctorModel.find(query);  // Assuming you're using Mongoose for MongoDB
  
      // Return a response
      if (doctors.length === 0) {
        return res.status(404).json({ success: false, message: 'No doctors found matching the criteria.' });
      }
  
      res.status(200).json({ success: true, doctors });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  
  

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, email, id: doctor._id, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const appointmentsDoctor = async (req, res) => {
  try {
      const { docId } = req.params;

      // Find appointments for the doctor and sort by createdAt descending
      const appointments = await appointmentModel
          .find({ docId })
          .populate('userId', 'age gender region') // Populate userId to get additional details
          .sort({ createdAt: -1 }); // -1 for descending, 1 for ascending

      res.json({ success: true, appointments });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};



const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    // Find the appointment data by ID
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Update the appointment as completed and clear the status field
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
      status: '',  // Clear the status field
    });

    return res.json({ success: true, message: 'Appointment completed and status cleared' });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};


 const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Update the appointment status to empty and set cancelled to true
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
      status: '',  // Clear the status field
    });

    return res.json({ success: true, message: 'Appointment cancelled and status cleared' });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};


const doctorDashboard = async (req,res) => {
    try {
        const {docId} = req.params;
        
        const appointments = await appointmentModel.find({docId}).populate('userId', 'age gender region'); // Populate userId to get patient info

        let earnings = 0;

        appointments.forEach((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });
        
        let patients = [];

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        };

        res.json({success: true, dashData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.params;
        const profileData = await doctorModel.findById(docId).select('-password');

        if (!profileData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const updateDoctorProfile = async (req, res) => {
  try {
    const { 
      fees, address, available, phone, docAddress, balance, name, email, gender, region, speciality, services 
    } = req.body;
    const { docId } = req.params;

    const updateFields = {};

    // Check and update fields if they are provided in the request body
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (gender !== undefined) updateFields.gender = gender;
    if (phone !== undefined) updateFields.phone = phone; // Fixed the typo here
    if (region !== undefined) updateFields.region = region;
    if (fees !== undefined) updateFields.fees = fees;
    if (address !== undefined) updateFields.address = address;
    if (speciality !== undefined) updateFields.speciality = speciality;
    if (available !== undefined) updateFields.available = available;
    if (docAddress !== undefined) updateFields.docAddress = docAddress;

    // Handle balance update if provided
    if (balance !== undefined) {
      // Determine if the balance is being added or withdrawn
      const balanceChangeType = balance > 0 ? 'added' : 'withdrawn'; // Positive balance is added, negative is withdrawn

      // Create balance history entry
      const balanceHistoryEntry = {
        amount: Math.abs(balance),  // Ensure the amount is positive for historical records
        type: balanceChangeType,    // 'added' or 'withdrawn'
        date: new Date()            // Record the current date
      };

      // Update balance using $inc and push the history entry
      updateFields.$inc = { balance: balance };  // Update the balance
      updateFields.$push = { balanceHistory: balanceHistoryEntry };  // Push to balanceHistory
    }

    // Handle services update if provided
    if (services !== undefined && Array.isArray(services)) {
      // Update services by adding to the existing array without duplicates
      updateFields.$addToSet = {
        services: { $each: services }, // Adds multiple services uniquely
      };
    }

    // Perform the update using the docId
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      updateFields,
      { new: true } // Return the updated document
    );

    // Check if the doctor was found and updated
    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Return the updated profile data along with balance history
    res.json({
      success: true,
      message: "Profile updated",
      profileData: updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};





// Update Doctor Availability
const updateDoctorAvailability = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { availability } = req.body;

        const doctor = await doctorModel.findByIdAndUpdate(
            doctorId,
            { availability },
            { new: true }
        );

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        return res.json({ message: 'Availability updated', doctor });
    } catch (error) {
        console.error('Error updating availability:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};


const decrementDoctorBalance = async (req, res) => {
  try {
    const { amount } = req.body;  // Now we expect "amount" in the request body
    const { docId } = req.params;

    // Check if the amount value is valid
    if (amount === undefined || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    // Find the doctor by ID
    const doctor = await doctorModel.findById(docId);

    // If doctor is not found
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check if the doctor has sufficient balance for the withdrawal
    if (doctor.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    // Record the withdrawal transaction (balanceHistory entry)
    const balanceHistoryEntry = {
      amount,  // Use the withdrawal amount
      type: 'withdrawn',  // This is a withdrawal
      date: new Date()    // Record the current date
    };

    // Decrease the balance by the specified withdrawal amount
    doctor.balance -= amount;  
    doctor.balanceHistory.push(balanceHistoryEntry);  // Push to balanceHistory

    // Save the updated doctor data
    const updatedDoctor = await doctor.save();

    // Return the updated profile data along with the balance history
    res.json({
      success: true,
      message: 'Balance updated successfully',
      profileData: updatedDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



const updateAppointment = async (req, res) => {
  try {
      const { appointmentId } = req.params; // Extract appointmentId from request params
      const {
          userId,
          docId,
          slotDate,
          slotTime,
          amount,
          cancelled,
          paymentSuccessful,
          hospitalName2,
          investigations,
          notes,
          diagnosis,
          age,
          sex,
          meetingStart,
          meetingEnd,
          meetingDuration,
          callDuration,
          isCompleted,
          timer,
          status,
          medicines,
          updatedmedicine, // Updated to match the field name in the schema
          hospitalName1,
          discontinue,
          discontinue2
      } = req.body;

      const currentAppointment = await appointmentModel.findById(appointmentId);
      if (!currentAppointment) {
          return res.json({ success: false, message: "Appointment not found" });
      }

      const updateData = {};

      // Add conditional checks and update fields if present in the request body
      if (userId !== undefined) updateData.userId = userId;
      if (docId !== undefined) updateData.docId = docId;
      if (slotDate !== undefined) updateData.slotDate = slotDate;
      if (slotTime !== undefined) updateData.slotTime = slotTime;
      if (amount !== undefined) updateData.amount = amount;
      if (cancelled !== undefined) updateData.cancelled = cancelled;
      if (paymentSuccessful !== undefined) updateData.paymentSuccessful = paymentSuccessful;
      if (hospitalName2 !== undefined) updateData.hospitalName2 = hospitalName2;
      if (investigations !== undefined) updateData.investigations = investigations;
      if (notes !== undefined) updateData.notes = notes;
      if (diagnosis !== undefined) updateData.diagnosis = diagnosis;
      if (age !== undefined) updateData.age = age;
      if (sex !== undefined) updateData.sex = sex;
      if (meetingStart !== undefined) updateData.meetingStart = meetingStart;
      if (meetingEnd !== undefined) updateData.meetingEnd = meetingEnd;
      if (meetingDuration !== undefined) updateData.meetingDuration = meetingDuration;
      if (callDuration !== undefined) updateData.callDuration = callDuration;
      if (isCompleted !== undefined) updateData.isCompleted = isCompleted;
      if (timer !== undefined) updateData.timer = timer;
      if (status !== undefined) updateData.status = status;
      if (medicines !== undefined) updateData.medicines = medicines;
      if (updatedmedicine !== undefined) updateData.updatedmedicine = updatedmedicine; // Updated field
      if (hospitalName1 !== undefined) updateData.hospitalName1 = hospitalName1;
      if (discontinue !== undefined) updateData.discontinue = discontinue;
      if (discontinue2 !== undefined) updateData.discontinue2 = discontinue2;

      const updatedAppointment = await appointmentModel.findByIdAndUpdate(appointmentId, updateData, { new: true });

      res.json({ success: true, message: "Appointment Updated", data: updatedAppointment });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};





// Add a review for a doctor
const addReview = async (req, res) => {
  const { doctorId } = req.params; // Doctor ID from the URL
  const { userId, rating, reviewText } = req.body; // Review data from request body

  // Destructure and validate the rating to ensure it is between 1 and 5
  const userRating = Number(rating);

  if (userRating < 1 || userRating > 5 || isNaN(userRating)) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    // Fetch the doctor by ID
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Fetch the user details from the User model using the userId
    let userDetails = {};
    if (userId) {
      const user = await userModel.findById(userId);
      if (user) {
        userDetails = {
          name: user.name,
          email: user.email,
          image: user.image || 'https://example.com/default-avatar.jpg', // Default image if user doesn't have one
        };
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    // Create the review object
    const review = {
      userId: userId || null, // Optional if you want to store the user reference
      userName: userDetails.name,
      userEmail: userDetails.email,
      rating: userRating, // Use the validated userRating here
      reviewText,
      userImage: userDetails.image,
      reviewDate: new Date(),
    };

    // Add the review to the doctor's reviews array
    doctor.reviews.push(review);

    // Save the updated doctor document
    await doctor.save();

    // Return the updated reviews list
    res.status(201).json({ message: 'Review added successfully', reviews: doctor.reviews });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};




// Get reviews for a specific doctor
const getReviews = async (req, res) => {
  const { doctorId } = req.params;  // Doctor ID from URL params

  try {
    // Fetch the doctor by ID
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Manually fetch user details for each review
    const reviewsWithUserDetails = await Promise.all(
      doctor.reviews.map(async (review) => {
        let userDetails = { name: review.userName, email: review.userEmail, image: review.userImage };

        // If a userId is present, fetch the user details manually
        if (review.userId) {
          const user = await userModel.findById(review.userId);
          if (user) {
            userDetails = {
              name: user.name,
              email: user.email,
              image: user.image || 'https://example.com/default-avatar.jpg',  // Default image if no user image
            };
          }
        }

        return {
          userId: review.userId ? review.userId : null,
          userName: userDetails.name,
          userEmail: userDetails.email,
          userImage: userDetails.image,
          rating: review.rating,
          reviewText: review.reviewText,
          reviewDate: review.reviewDate,
        };
      })
    );

    // Return the reviews along with user details
    res.status(200).json({ reviews: reviewsWithUserDetails });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};




const likeDoctor = async (req, res) => {
  try {
    const { doctorId, userId } = req.body;

    // Ensure userId is an ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId); // Corrected line
    
    // Find the doctor by ID
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      console.log("Doctor not found:", doctorId);
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check if the user already liked the doctor
    if (doctor.likes.some(id => id.equals(userObjectId))) {
      return res.status(400).json({ success: false, message: 'Already liked' });
    }

    // Log likes and likeCount before updating
    console.log("Likes before update:", doctor.likes);
    console.log("Like count before update:", doctor.likeCount);

    // Add the user to the likes array and update likeCount
    doctor.likes.push(userObjectId);
    doctor.likeCount = doctor.likes.length;

    // Save the doctor document
    try {
      await doctor.save();
      console.log("Doctor saved successfully");
    } catch (saveError) {
      console.error("Error saving doctor:", saveError.message);
      return res.status(500).json({ success: false, message: 'Error saving doctor' });
    }

    // Log likes and likeCount after updating
    console.log("Likes after update:", doctor.likes);
    console.log("Like count after update:", doctor.likeCount);

    // Respond with success and updated likeCount
    res.json({ success: true, likeCount: doctor.likeCount, doctor });
  } catch (error) {
    console.error('Error liking doctor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};





const unlikeDoctor = async (req, res) => {
  try {
    const { doctorId, userId } = req.body;

    // Ensure userId is an ObjectId
    const userObjectId = mongoose.Types.ObjectId(userId);
    
    // Find the doctor by ID
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check if the user has already unliked the doctor
    if (!doctor.likes.some(id => id.equals(userObjectId))) {
      return res.status(400).json({ success: false, message: 'Not liked yet' });
    }

    // Remove userId from the likes array
    doctor.likes = doctor.likes.filter(id => !id.equals(userObjectId));
    doctor.likeCount = doctor.likes.length;

    // Save the updated doctor document
    await doctor.save();

    // Broadcast unlike update with the correct count
    broadcastDoctorUpdate({
      type: 'unlike',
      doctorId,
      likeCount: doctor.likeCount,
    });

    // Respond with success and updated likeCount
    res.json({ success: true, likeCount: doctor.likeCount, doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Controller function to update the status
const updateStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params; // Assuming appointmentId is passed in the URL
    const { status } = req.body; // Get status from the request body

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if the current status is 'pending' and update it to 'upcoming'
    if (appointment.status === 'pending' && status === 'upcoming') {
      appointment.status = 'upcoming';
      await appointment.save();
      return res.status(200).json({ message: 'Status updated to upcoming' });
    } else if (appointment.status === 'upcoming') {
      return res.status(400).json({ message: 'Appointment is already scheduled as upcoming' });
    } else {
      return res.status(400).json({ message: 'Status cannot be updated' });
    }
  } catch (error) {
    console.error('Error updating status:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export {changeAvailablity,updateStatus,addReview,getReviews,unlikeDoctor,likeDoctor,updateDoctorAvailability,decrementDoctorBalance,doctorList,doctorFilterController,updateAppointment,doctorFilter, loginDoctor,appointmentsDoctor,appointmentCancel,appointmentComplete,doctorDashboard, doctorProfile, updateDoctorProfile}
