import fs from 'fs';
import cloudinary from 'cloudinary'; 
import bcrypt from 'bcrypt';
import ReviewdocModel from "../models/ReviewSchema.js";

const { v2: cloudinaryV2 } = cloudinary; // Ensure you're using the correct v2 instance

const ReviewController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      phone,
      address,
      docaddress,
      age,
      gender,
      region,
      universityName,
      universityCountry,
      medicalCouncilName,
      medicalCouncilCountry,
      graduationYear,
      balance,
      image: imageBody,
      medicalLicense: licenseBody,
      diplomaCertificates: diplomaBody,
      proofOfID: proofIDBody
    } = req.body;

    // Destructure files from req.files if available
    const { image, medicalLicense, diplomaCertificates, proofOfID } = req.files || {};

    // Check if email already exists
    const existingDoctor = await ReviewdocModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Placeholder image URL
    const placeholderImageUrl = 'https://example.com/placeholder-image.jpg';

    const uploadToCloudinary = async (file) => {
      if (!file) return null;

      try {
        if (file.startsWith('data:image')) {
          const uploadResult = await cloudinaryV2.uploader.upload(file, { resource_type: 'image' });
          return uploadResult.secure_url;
        } else if (file.startsWith('http')) {
          const uploadResult = await cloudinaryV2.uploader.upload(file, { resource_type: 'image' });
          return uploadResult.secure_url;
        } else if (file.path) {
          const uploadResult = await cloudinaryV2.uploader.upload(file.path, { resource_type: 'image' });
          return uploadResult.secure_url;
        }
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return null;
      }
    };

    // Upload images based on availability (files or body data)
    const imageUrl = await uploadToCloudinary(image && image[0] ? image[0] : imageBody) || placeholderImageUrl;
    const medicalLicenseUrl = await uploadToCloudinary(medicalLicense && medicalLicense[0] ? medicalLicense[0] : licenseBody);
    const diplomaCertificatesUrl = await uploadToCloudinary(diplomaCertificates && diplomaCertificates[0] ? diplomaCertificates[0] : diplomaBody);
    const proofOfIDUrl = await uploadToCloudinary(proofOfID && proofOfID[0] ? proofOfID[0] : proofIDBody);

    // Create doctor data object
    const doctorData = {
      name: name || null,
      email: email || null,
      password: hashedPassword,
      speciality: speciality || null,
      degree: degree || null,
      experience: experience || null,
      about: about || null,
      fees: fees || null,
      phone: phone || null,
      address: address || null,
      docaddress: docaddress || null,
      age: age || null,
      gender: gender || null,
      region: region || null,
      universityName: universityName || null,
      universityCountry: universityCountry || null,
      medicalCouncilName: medicalCouncilName || null,
      medicalCouncilCountry: medicalCouncilCountry || null,
      graduationYear: graduationYear || null,
      image: imageUrl,
      medicalLicense: medicalLicenseUrl,
      diplomaCertificates: diplomaCertificatesUrl,
      proofOfID: proofOfIDUrl,
      balance: balance || 0
    };

    // Save new doctor to the database
    const newDoctor = new ReviewdocModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: 'Doctor Added Successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


  


const getAllReviewDocs = async (req, res) => {
    try {
        const reviewDocs = await ReviewdocModel.find();
        res.json({ success: true, reviewDocs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getSingleReviewDoc = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the review document by ID
      const reviewDoc = await ReviewdocModel.findById(id);
  
      // Check if the document was found
      if (!reviewDoc) {
        return res.status(404).json({ success: false, message: 'Doctor not found' });
      }
  
      res.json({ success: true, reviewDoc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching doctor', error: error.message });
    }
  };
  



const deleteReviewDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params; // Assuming doctorId is provided in the request URL

        // Find the doctor document by ID
        const doctor = await ReviewdocModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Delete images from Cloudinary if URLs exist
        const deleteImageFromCloudinary = async (url) => {
            if (!url) return;
            const publicId = url.split('/').pop().split('.')[0]; // Extract Cloudinary public ID from URL
            await cloudinaryV2.uploader.destroy(publicId, { resource_type: 'image' });
        };

        // Delete each uploaded image
        await deleteImageFromCloudinary(doctor.image);
        await deleteImageFromCloudinary(doctor.medicalLicense);
        await deleteImageFromCloudinary(doctor.diplomaCertificates);
        await deleteImageFromCloudinary(doctor.proofOfID);

        // Remove the doctor document from the database
        await ReviewdocModel.findByIdAndDelete(doctorId);

        res.json({ success: true, message: "Doctor deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { ReviewController, deleteReviewDoctor,getAllReviewDocs, getSingleReviewDoc };
