import express from 'express';
import {
  createNotice,
  getAllNotices,
  deleteNotice,
} from '../controllers/noticeController.js';

const noticeRouter = express.Router();

noticeRouter.post('/notices', createNotice);
noticeRouter.get('/notices', getAllNotices);
noticeRouter.delete('/notices/:id', deleteNotice);

export default noticeRouter;
