import express from 'express';
import {
  createReassignRequest,
  getAllReassignRequests,
  deleteReassignRequest,
} from '../controllers/reassignController.js';

const reassignRouter = express.Router();

reassignRouter.post('/create', createReassignRequest);
reassignRouter.get('/', getAllReassignRequests);
reassignRouter.delete('/delete/:id', deleteReassignRequest);

export default reassignRouter;
