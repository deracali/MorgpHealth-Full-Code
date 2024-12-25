import mongoose from 'mongoose';

const ReviewdoctorSchema = new mongoose.Schema({
    name: { type: String }, // Optional field
    email: { type: String, unique: true, required: true }, // Required
    password: { type: String, required: true }, // Required
    image: { 
        type: String,
        default: 'https://example.com/placeholder-image.jpg' // Placeholder image
    }, // Optional field
    speciality: { type: String }, // Optional field
    degree: { type: String }, // Optional field
    experience: { type: String }, // Optional field
    gender: { type: String }, // Optional field
    about: { type: String }, // Optional field
    available: { type: Boolean, default: true },
    fees: { type: Number }, // Optional field
    phone: { type: Number }, // Optional field
    balance: { type: Number, default: 0 }, // Optional field
    address: { type: Object }, // Optional field
    docaddress: {type: String},
    slots_booked: { type: Object }, // Optional field
    region: { type: String }, // Optional field
    age: { type: Number }, // Optional field
    universityName: { type: String }, // Optional field
    universityCountry: { type: String }, // Optional field
    medicalCouncilName: { type: String }, // Optional field
    medicalCouncilCountry: { type: String }, // Optional field
    graduationYear: { type: Number }, // Optional field
    medicalLicense: { type: String,   default: 'https://example.com/placeholder-image.jpg' }, // Optional field
    diplomaCertificates: { type: String,   default: 'https://example.com/placeholder-image.jpg' },
    proofOfID: { type: String,   default: 'https://example.com/placeholder-image.jpg' }, 
}, { timestamps: true });

const ReviewdocModel = mongoose.model('Reviewdoctor', ReviewdoctorSchema);

export default ReviewdocModel;
