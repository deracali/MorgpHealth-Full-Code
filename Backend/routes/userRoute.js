import express from 'express'
import { bookAppointment,getAppointmentById,cancelAppointment, getProfile,updateProfileMobile, getProfileId, listAppointment, loginUser, registerUser, updateProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
import {forgetPassword, verifyOtp,resetPassword} from '../controllers/forgetPassword.js'
import {
  createNotification,
  fetchNotifications,
  updateReadStatus
} from "../controllers/notificationController.js";

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile', authUser, getProfile)
userRouter.get('/get-profileId/:userId', getProfileId);
userRouter.post('/update-profile',upload.single("image"),updateProfile)
userRouter.post('/update-profilemobile',upload.single("image"),updateProfileMobile)
userRouter.post('/book-appointment',bookAppointment)
userRouter.get('/appointments/:userId',listAppointment)
userRouter.post('/cancel-appointment',cancelAppointment)
userRouter.get('/api/appointments/:appointmentId', getAppointmentById);
userRouter.post('/forget-password', forgetPassword);
userRouter.post('/reset-password', resetPassword);
userRouter.post('/verify-otp',  verifyOtp);
userRouter.post("/create", createNotification);
userRouter.get("/:recipientId/:recipientType", fetchNotifications);
userRouter.put('/notifications/:notificationId/read',updateReadStatus);


export default userRouter
