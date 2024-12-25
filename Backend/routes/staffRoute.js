import express from 'express';
import { createStaff, deleteStaff, getStaff, updateStaffRole } from '../controllers/staffController.js';

const staffRouter = express.Router();

// Route to create new staff
staffRouter.post('/create', createStaff);


// Route to get all staff
staffRouter.get('/', getStaff);


// Route to get all staff
staffRouter.put('/update/:id', updateStaffRole);


// Route to get all staff
staffRouter.delete('/delete/:id', deleteStaff);

export default staffRouter;
