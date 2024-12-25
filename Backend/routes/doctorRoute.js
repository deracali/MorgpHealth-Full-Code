import express from 'express'
import { appointmentCancel,updateStatus,getReviews,addReview,unlikeDoctor,likeDoctor,updateDoctorAvailability,appointmentComplete, appointmentsDoctor, decrementDoctorBalance, doctorDashboard, doctorFilter, doctorFilterController, doctorList,doctorProfile,loginDoctor, updateAppointment, updateDoctorProfile } from '../controllers/doctorController.js'
import {forgetPassword, verifyOtp,resetPassword} from '../controllers/docForgetpassword.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.get('/docfilter/:speciality',doctorFilter)
doctorRouter.get('/filter-doctors',doctorFilterController)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments/:docId',appointmentsDoctor)
doctorRouter.post('/cancel-appointment',appointmentCancel)
doctorRouter.post('/complete-appointment',appointmentComplete)
doctorRouter.get('/dashboard/:docId', doctorDashboard)
doctorRouter.get('/profile/:docId', doctorProfile)
doctorRouter.post('/update-profile/:docId', updateDoctorProfile)
doctorRouter.put('/update-appointment/:appointmentId',updateAppointment)
doctorRouter.put('/balance/decrement/:docId', decrementDoctorBalance);
doctorRouter.post('/like', likeDoctor);  
doctorRouter.post('/unlike', unlikeDoctor);
doctorRouter.put('/doctors/:doctorId/availability', updateDoctorAvailability);
doctorRouter.put('/update-status/:appointmentId', updateStatus);
doctorRouter.get('/doctor/:doctorId/reviews', getReviews);
doctorRouter.post('/doctor/:doctorId/review', addReview);
doctorRouter.post('/forget-password', forgetPassword);
doctorRouter.post('/reset-password', resetPassword);
doctorRouter.post('/verify-otp',  verifyOtp);

export default doctorRouter
