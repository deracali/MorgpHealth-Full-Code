import express from 'express';
import { addWithdrawal, getWithdrawal,deleteWithdrawal, getWithdrawalByEmail } from '../controllers/withdrawalController.js';

const WithdrawalRouter = express.Router();

// Route to add a new withdrawal
WithdrawalRouter.post('/add', addWithdrawal);

// Route to get all withdrawals
WithdrawalRouter.get('/all', getWithdrawal);

// Route to get a withdrawal by ID
WithdrawalRouter.get('withdrawal/:email', getWithdrawalByEmail);


// Route to delete a withdrawal by ID
WithdrawalRouter.delete('/delete/:id', deleteWithdrawal);

export default WithdrawalRouter;
