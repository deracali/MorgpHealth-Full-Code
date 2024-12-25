import Blog from '../models/blogModel.js';
import { v2 as cloudinaryV2 } from 'cloudinary';


// Function to upload image from file path
const uploadToCloudinary = async (file) => {
  try {
    console.log('Uploading image from file path:', file.path); // Debug log
    const result = await cloudinaryV2.uploader.upload(file.path, {
      resource_type: 'image', // Specify the file type as image
    });
    console.log('Cloudinary Upload Response:', result); // Log Cloudinary response
    return result.secure_url; // Return the Cloudinary URL
  } catch (error) {
    console.error('Cloudinary upload error:', error); // Log error
    throw new Error('Failed to upload image from file path');
  }
};

// Function to upload image from URL
const uploadFromUrlToCloudinary = async (imageUrl) => {
  try {
    console.log('Uploading image from URL:', imageUrl); // Debug log
    const result = await cloudinaryV2.uploader.upload(imageUrl, {
      resource_type: 'image', // Specify the file type as image
    });
    console.log('Cloudinary Upload Response:', result); // Log Cloudinary response
    return result.secure_url; // Return the Cloudinary URL
  } catch (error) {
    console.error('Cloudinary URL upload error:', error); // Log error
    throw new Error('Failed to upload image from URL');
  }
};

// Create Blog Controller
const createBlog = async (req, res) => {
  try {
    const { title, content, author, imageUrl } = req.body;

    // Ensure required fields are provided
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    let image = '';

    // If an image file is uploaded via Multer
    if (req.file) {
      image = await uploadToCloudinary(req.file); // Upload the file to Cloudinary
    } else if (imageUrl) {
      // If image URL is provided in the request body, upload from the URL
      image = await uploadFromUrlToCloudinary(imageUrl);
    }

    // Create and save a new blog entry
    const newBlog = new Blog({ title, content, author, imageUrl: image });
    await newBlog.save();

    return res.status(201).json({ message: 'Blog created successfully', newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({ error: 'Failed to create blog' });
  }
};



// Get All Blogs Controller
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    return res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

// Delete Blog Controller
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return res.status(500).json({ error: 'Failed to delete blog' });
  }
};

// Export all controllers at once
export {
  createBlog,
  getBlogs,
  deleteBlog,
};
