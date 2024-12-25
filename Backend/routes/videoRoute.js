import express from 'express';
import { updateVideoDuration } from '../controllers/videoController.js';

const videoRouter = express.Router();

// Route to update meeting duration
videoRouter.put('/update-video/:videoId', updateVideoDuration);

export default videoRouter;
