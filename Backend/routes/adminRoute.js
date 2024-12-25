// adminRouter.js
import express from 'express';
import multer from 'multer'; // Ensure multer is imported
import { 
    addDoctor, 
    adminDashboard, 
    allDoctors, 
    appointmentCancel, 
    appointmentsAdmin, 
    deleteUser, 
    getAllUsers, 
    loginAdmin, 
    logoutAdmin
} from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import upload from '../middlewares/multer.js'; // This remains as 'upload'

const adminRouter = express.Router();

// Configure multer for multiple file uploads, using the imported upload
const adminUpload = upload.fields([
    { name: 'image', maxCount: 1 }, // Doctor's profile image
    { name: 'medicalLicense', maxCount: 1 }, // Medical license image
    { name: 'diplomaCertificates', maxCount: 1 }, // Diploma certificates image
    { name: 'proofOfID', maxCount: 1 } // Proof of ID image
]);

adminRouter.post('/add-doctor', adminUpload, addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/logout/:id', logoutAdmin);
adminRouter.post('/all-doctors', allDoctors);
adminRouter.get('/all-users', getAllUsers);
adminRouter.post('/delete-user', deleteUser);
adminRouter.post('/change-availability', changeAvailablity);
adminRouter.get('/appointments', appointmentsAdmin);
adminRouter.post('/cancel-appointment', appointmentCancel);
adminRouter.get('/dashboard', adminDashboard);

export default adminRouter;
