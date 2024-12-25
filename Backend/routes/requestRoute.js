import express from 'express';
import { createRequest, deleteRequest, getAllRequests, getRequestById } from '../controllers/requestController.js';

const RequestRouter = express.Router();

// Create a new request
RequestRouter.post('/requests', createRequest);

// Delete a request by ID
RequestRouter.delete('/requests/:id', deleteRequest);

// Get all requests
RequestRouter.get('/requests', getAllRequests);

// Get a specific request by ID
RequestRouter.get('/requests/:id', getRequestById);

export default RequestRouter;
