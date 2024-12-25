// reviewDocRouter.js
import express from 'express';
import multer from 'multer'; // Ensure multer is imported
import upload from '../middlewares/multer.js'; // This remains as 'upload'
import { deleteReviewDoctor, getAllReviewDocs, getSingleReviewDoc, ReviewController } from '../controllers/reviewController.js';

const reviewDocRouter = express.Router();

// Configure multer for multiple file uploads, using the imported upload
const doctorUpload = upload.fields([
    { name: 'image', maxCount: 1 }, // Doctor's profile image
    { name: 'medicalLicense', maxCount: 1 }, // Medical license image
    { name: 'diplomaCertificates', maxCount: 1 }, // Diploma certificates image
    { name: 'proofOfID', maxCount: 1 } // Proof of ID image
]);

reviewDocRouter.post('/reviewDoc', doctorUpload, ReviewController);
reviewDocRouter.get('/review-docs', getAllReviewDocs);
reviewDocRouter.get('/review-docs/:id', getSingleReviewDoc)
reviewDocRouter.delete('/review-doctor/:doctorId', deleteReviewDoctor)

export default reviewDocRouter;
