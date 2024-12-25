import express from 'express';
import multer from 'multer';
import { createBlog, getBlogs, deleteBlog } from '../controllers/blogController.js';

const blogRouter = express.Router();

// Multer configuration to accept only image files
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    // Add timestamp to avoid file name collisions
    callback(null, Date.now() + '-' + file.originalname);
  },
});

// Filter to accept only image files (PNG, JPEG, etc.)
const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image/')) {
    callback(null, true);
  } else {
    callback(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Blog routes
blogRouter.post('/create', upload.single('image'), createBlog);
blogRouter.get('/', getBlogs);
blogRouter.delete('/delete/:id', deleteBlog);

export default blogRouter;
